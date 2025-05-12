// Mengimpor router utama
import router from '@/router/index'

// Konstanta untuk URL halaman login
import { LOGIN_URL } from '@/config'

// Tipe untuk definisi route dari vue-router
import type { RouteRecordRaw } from 'vue-router'

// Komponen notifikasi dari Element Plus
import { ElNotification } from 'element-plus'

// Store untuk informasi user dan autentikasi
import { useUserStore } from '@/stores/modules/user/user.store'
import { useAuthStore } from '@/stores/modules/auth/auth.store'

// Impor dinamis semua file .vue di dalam folder views
const modules = import.meta.glob('@/views/**/*.vue')

// Inisialisasi routing dinamis berdasarkan menu dan hak akses user
export const initDynamicRouter = async () => {
  // Inisialisasi store
  const userStore = useUserStore()
  const authStore = useAuthStore()

  try {
    // 1. Ambil daftar menu dan tombol berdasarkan permission user
    await authStore.getAuthMenuList() // Ambil daftar menu yang diizinkan

    // 2. Cek apakah user memiliki hak akses menu
    if (!authStore.authMenuListGet.length) {
      // Tampilkan notifikasi peringatan
      ElNotification({
        title: 'No Permission', // "Tidak Ada Akses"
        message:
          'The current account does not have any menu permissions, please contact the system administrator!', // "Akun ini tidak memiliki hak akses menu. Hubungi administrator."
        type: 'warning',
        duration: 3000
      })

      // Hapus token (logout) dan arahkan ke halaman login
      userStore.setToken('')
      router.replace(LOGIN_URL)

      // Tolak Promise dan hentikan eksekusi
      return Promise.reject('No permission')
    }

    // 3. Iterasi dan tambahkan routing dinamis berdasarkan data dari backend
    authStore.flatMenuListGet.forEach(item => {
      // Hapus properti children jika ada (untuk menghindari nested routing)
      item.children && delete item.children

      // Ubah string path component menjadi fungsi import menggunakan hasil dari import.meta.glob
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }

      // Tambahkan route ke router, apakah ke root atau ke dalam layout tergantung meta
      if (item.meta.isFull) {
        // Jika halaman penuh (misalnya login, error page)
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        // Jika bagian dari layout utama
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (error) {
    // Tangani error saat mengambil data permission
    userStore.setToken('') // Reset token
    router.replace(LOGIN_URL) // Redirect ke login
    return Promise.reject(error) // Kembalikan error
  }
}
