// Import tipe konfigurasi custom untuk Axios dari path internal
import type { CustomAxiosRequestConfig } from '@/shared/types/api'

// Import modul 'qs' untuk melakukan serialisasi objek menjadi query string
import qs from 'qs'

// Membuat Map (struktur data mirip objek) untuk menyimpan daftar permintaan (request) yang sedang berlangsung
// Key: URL unik dari request, Value: AbortController untuk membatalkan request
let pendingMap = new Map<string, AbortController>()

// Fungsi untuk serialisasi objek menjadi string query secara berurutan
// Gunanya untuk menjamin URL yang dihasilkan konsisten walau urutan properti berbeda
const sortedStringify = (obj: any) => {
  return qs.stringify(obj, {
    arrayFormat: 'repeat', // Menyusun array sebagai ?a=1&a=2&a=3
    sort: (a, b) => a.localeCompare(b) // Urutkan properti secara alfabet
  })
}

// Fungsi untuk menghasilkan string unik dari konfigurasi permintaan
// String ini dipakai sebagai penanda unik di Map
export const getPendingUrl = (config: CustomAxiosRequestConfig) => {
  return [
    config.method, // Metode request: GET, POST, dst.
    config.url, // URL endpoint
    sortedStringify(config.data), // Data yang dikirim
    sortedStringify(config.params) // Parameter query
  ].join('&') // Gabungkan semuanya sebagai satu string
}

// Kelas untuk mengelola permintaan Axios yang bisa dibatalkan
export class AxiosCanceler {
  // Fungsi untuk menambahkan request ke daftar pending (sedang berjalan)
  addPending(config: CustomAxiosRequestConfig) {
    // Sebelum menambahkan, pastikan request sebelumnya dengan konfigurasi sama sudah dibatalkan
    this.removePending(config)

    // Buat penanda unik dari request
    const url = getPendingUrl(config)

    // Buat AbortController untuk mengontrol pembatalan request
    const controller = new AbortController()

    // Hubungkan sinyal pembatalan ke konfigurasi request Axios
    config.signal = controller.signal

    // Simpan ke dalam Map
    pendingMap.set(url, controller)
  }

  // Fungsi untuk menghapus dan membatalkan request yang sedang berjalan (jika ada)
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config)

    // Ambil controller dari Map menggunakan key unik URL
    const controller = pendingMap.get(url)

    // Jika ditemukan, batalkan request dan hapus dari Map
    if (controller) {
      controller.abort()
      pendingMap.delete(url)
    }
  }

  // Fungsi untuk menghapus dan membatalkan semua request yang sedang berjalan
  removeAllPending() {
    // Iterasi semua controller dalam Map dan batalkan semuanya
    pendingMap.forEach(controller => {
      controller && controller.abort()
    })

    // Kosongkan Map setelah semua request dibatalkan
    pendingMap.clear()
  }
}
