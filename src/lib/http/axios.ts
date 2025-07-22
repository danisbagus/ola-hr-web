// Import axios dan tipe-tipe yang diperlukan dari axios
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

// Import fungsi untuk menampilkan dan menyembunyikan loading full screen
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/loading/fullScreen'

// Import URL login dari konfigurasi
import { LOGIN_URL } from '@/config'

// Import komponen untuk menampilkan notifikasi
import { ElNotification } from 'element-plus'

// Import tipe dan enum yang berkaitan dengan response API
import type { ResultData, CustomAxiosRequestConfig } from '@/shared/types/api'
import { ResultEnum } from '@/shared/enums/http'

// Import fungsi utilitas untuk menangani status error
import { checkStatus } from '@/lib/http/utils/checkStatus'

// Import class untuk membatalkan request yang sama
import { AxiosCanceler } from '@/lib/http/utils/axiosCancel'

// Import router untuk redirect
import router from '@/router'

import { useUser } from '@/modules/user/user.hook'

// Konfigurasi default untuk axios
const config = {
  baseURL: import.meta.env.VITE_API_URL as string, // URL dasar diambil dari .env
  timeout: ResultEnum.TIMEOUT as number, // Timeout dari enum konfigurasi
  withCredentials: true // Izinkan membawa cookie dalam cross-origin
}

// Buat instance dari AxiosCanceler
const axiosCanceler = new AxiosCanceler()

// Class utama untuk menangani request HTTP
class RequestHttp {
  service: AxiosInstance

  // Constructor: inisialisasi axios dengan konfigurasi
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // Interceptor untuk request (sebelum request dikirim ke server)
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const { token } = useUser()

        // Set default untuk cancel jika belum ditentukan
        config.cancel ??= true
        // Jika cancel = true, tambahkan ke daftar pending untuk bisa dibatalkan nanti
        config.cancel && axiosCanceler.addPending(config)

        // Set default untuk loading jika belum ditentukan
        config.loading ??= true
        // Tampilkan loading jika loading = true
        config.loading && showFullScreenLoading()

        // Tambahkan token dari user store ke header
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('Authorization', 'Bearer ' + token)
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Interceptor untuk response (setelah response diterima dari server)
    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
        const { data, config } = response
        const { setToken } = useUser()

        // Hapus request dari daftar pending
        axiosCanceler.removePending(config)

        // Sembunyikan loading jika sebelumnya diaktifkan
        // config.loading && tryHideFullScreenLoading()
        // delay 300 ms
        config.loading &&
          setTimeout(() => {
            tryHideFullScreenLoading()
          }, 300)

        // Jika token expired, redirect ke login
        if (data.code == ResultEnum.UNAUTHORIZED) {
          setToken('')
          router.replace(LOGIN_URL)
          ElNotification({ title: 'Token expired', type: 'error', message: data.message })
          return Promise.reject(data)
        }

        // Jika ada error dari backend
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElNotification({ title: 'Something went wrong', type: 'error', message: data.message })
          return Promise.reject(data)
        }

        // Jika sukses, kembalikan data seperti biasa
        return data
      },
      async (error: AxiosError) => {
        const { response } = error

        // Sembunyikan loading walaupun terjadi error
        tryHideFullScreenLoading()

        // Tampilkan pesan error khusus jika timeout atau network error
        if (error.message.indexOf('timeout') !== -1)
          ElNotification({ title: 'Request timeout! Please try again later', type: 'error' }) // "Request timeout! Silakan coba lagi nanti"

        if (error.message.indexOf('Network Error') !== -1)
          ElNotification({ title: 'Network error! Please try again later', type: 'error' }) // "Kesalahan jaringan! Silakan coba lagi nanti"

        // Jika ada response, cek status dan tampilkan pesan yang sesuai
        if (response) checkStatus(response.status)

        // Jika tidak ada koneksi internet, redirect ke halaman error
        if (!window.navigator.onLine) router.replace('/500')

        return Promise.reject(error)
      }
    )
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  // Khusus untuk download file, respon diubah ke bentuk blob
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

// Export instance class sebagai default
export default new RequestHttp(config)
