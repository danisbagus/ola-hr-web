// Mengimpor router utama
import router from '@/router/index'

// Konstanta untuk URL halaman login
import { LOGIN_URL } from '@/config'

// Tipe untuk definisi route dari vue-router
import type { RouteRecordRaw } from 'vue-router'

// Komponen notifikasi dari Element Plus
import { ElNotification } from 'element-plus'

import { useUser } from '@/modules/user/user.hook'
import { useMenu } from '@/modules/menu/menu.hook'

// Impor dinamis semua file .vue di dalam folder views
const modules = import.meta.glob('@/views/**/*.vue')

// Inisialisasi routing dinamis berdasarkan menu dan hak akses user
export const initDynamicRouter = async () => {
  // Inisialisasi store
  const { setToken } = useUser()
  const { getMenuList, menuList, flatMenuList } = useMenu()

  try {
    // 1. Ambil daftar menu dan tombol berdasarkan permission user
    await getMenuList()

    // 2. Cek apakah user memiliki hak akses menu
    if (!menuList.value.length) {
      // Tampilkan notifikasi peringatan
      ElNotification({
        title: 'No Permission', // "Tidak Ada Akses"
        message:
          'The current account does not have any menu permissions, please contact the system administrator!', // "Akun ini tidak memiliki hak akses menu. Hubungi administrator."
        type: 'warning',
        duration: 3000
      })

      // Hapus token (logout) dan arahkan ke halaman login
      setToken('')
      router.replace(LOGIN_URL)

      // Tolak Promise dan hentikan eksekusi
      return Promise.reject('No permission')
    }

    // 3. Iterasi dan tambahkan routing dinamis berdasarkan data dari backend
    flatMenuList.value.forEach(item => {
      // Hapus children agar tidak nested (router.addRoute tidak butuh children)
      item.children && delete item.children

      // Tambahkan component jika tidak ada redirect
      if (!item.redirect) {
        const comp = resolveComponent(item.path)
        if (comp) {
          item.component = comp
        } else {
          console.warn(`Component not found for path: ${item.component}`)
          return // skip jika component tidak ditemukan
        }
      } else {
        return // skip jika tidak punya komponen
      }

      // Tambahkan route, tergantung apakah layout penuh atau tidak
      if (item.meta?.is_full) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (error) {
    setToken('') // Reset token
    router.replace(LOGIN_URL) // Redirect ke login
    return Promise.reject(error) // Kembalikan error
  }
}

// Mengubah path ke fungsi import component secara otomatis.
function resolveComponent(path: string) {
  const viewPath1 = `/src/views${path}/index.vue`
  const viewPath2 = `/src/views${path}.vue`
  return modules[viewPath1] || modules[viewPath2] || null
}
