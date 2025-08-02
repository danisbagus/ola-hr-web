// Import Modul & Dependency
import { createRouter, createWebHashHistory } from 'vue-router' // Vue Router untuk routing berbasis hash
import { staticRouter, errorRouter } from '@/router/modules/static-router' // Import route statis & route error
import { useMenu } from '@/modules/menu/menu.hook'
import { useUser } from '@/modules/user/user.hook'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config' // Konstanta konfigurasi URL login dan whitelist route
import { initDynamicRouter } from '@/router/modules/dynamic-router' // Fungsi inisialisasi dynamic route

// Fungsi untuk menentukan mode router (hash atau history)
const routerMode = () => createWebHashHistory() // Menggunakan hash mode untuk histori browser

// Penjelasan Struktur Meta Routing (Komentar Dokumen)
/**
 * @description 📚 Struktur konfigurasi routing
 * @param path - path URL yang diakses
 * @param name - nama route (untuk KeepAlive dan filtering permission)
 * @param redirect - alamat tujuan redirect otomatis
 * @param component - path ke file .vue yang ditampilkan
 * @param meta - metadata tambahan untuk UI dan logika aplikasi
 * @param meta.icon - ikon untuk sidebar/menu
 * @param meta.title - judul halaman (juga digunakan di <title>)
 * @param meta.activeMenu - untuk highlight menu aktif dari halaman detail
 * @param meta.isLink - apakah route merupakan link eksternal
 * @param meta.isHide - apakah disembunyikan dari menu
 * @param meta.isFull - apakah tampil dalam mode full screen
 * @param meta.isAffix - apakah route fixed di tab (seperti Home)
 * @param meta.isKeepAlive - apakah halaman perlu disimpan (cache)
 */

// Membuat Instance Router
const router = createRouter({
  history: routerMode(), // Gunakan hash mode (URL dengan #)
  routes: [...staticRouter, ...errorRouter], // Gabungkan route statis dan error
  strict: false, // Tidak strict dalam trailing slash (misal: /about = /about/)
  scrollBehavior: () => ({ left: 0, top: 0 }) // Set posisi scroll ke atas setiap kali navigasi
})

// Middleware Routing: beforeEach
// beforeEach: Guard untuk mencegah akses tanpa otorisasi.
router.beforeEach(async (to, from, next) => {
  const { menuList, setRouteName } = useMenu()
  const { token } = useUser()

  // todo: add NProgress

  // 1. Dynamic page title (set <title>)
  const title = import.meta.env.VITE_GLOB_APP_TITLE // Ambil judul global dari environment variable
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title // Gabungkan dengan judul halaman

  // 2️. Jika user mengakses halaman login
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (token) return next(from.fullPath) // Jika sudah login, kembalikan ke halaman sebelumnya
    resetRouter() // Jika belum login, reset semua route dynamic
    return next() // Izinkan akses ke halaman login
  }

  // 3️. Jika halaman yang diakses ada di daftar whitelist, langsung izinkan
  if (ROUTER_WHITE_LIST.includes(to.path)) return next()

  // 4️. Jika tidak ada token (belum login), redirect ke login
  if (!token) return next({ path: LOGIN_URL, replace: true })

  // 5️. Jika menu belum dimuat, inisialisasi dynamic route
  if (!menuList.value.length) {
    await initDynamicRouter() // Ambil daftar menu dan generate route dinamis
    return next({ ...to, replace: true }) // Replace agar tidak membuat riwayat baru
  }

  // 6️. Simpan nama route untuk validasi hak akses tombol
  setRouteName(to.name as string)

  // 7️. Lanjutkan ke halaman tujuan
  next()
})

// Fungsi Reset Router (hapus semua dynamic route)
export const resetRouter = () => {
  const { flatMenuList } = useMenu()

  flatMenuList.value.forEach(route => {
    // Iterasi semua route yang sudah ditambahkan
    const { name } = route
    if (name && router.hasRoute(name))
      // Jika route masih terdaftar
      router.removeRoute(name) // Hapus dari router
  })
}

// Ekspor Router untuk digunakan di main.ts
export default router
