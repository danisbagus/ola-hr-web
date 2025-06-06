// Mengimpor fungsi `createPinia` dari pustaka Pinia,
// yang digunakan untuk membuat instance baru dari store Pinia.
import { createPinia } from 'pinia'

// Mengimpor plugin `pinia-plugin-persistedstate`,
// yang memungkinkan state di Pinia untuk disimpan secara persisten (misalnya di localStorage).
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Membuat instance baru dari Pinia.
// Ini akan digunakan sebagai root store yang mengelola semua store lain di aplikasi.
const pinia = createPinia()

// Menggunakan plugin `piniaPluginPersistedstate` di instance Pinia.
// Plugin ini memungkinkan setiap store yang mengaktifkan opsi `persist` untuk menyimpan state-nya secara otomatis.
pinia.use(piniaPluginPersistedstate)

// Mengekspor instance Pinia sebagai default export.
// Ini akan digunakan di file utama aplikasi (biasanya `main.ts` atau `main.js`)
// untuk diintegrasikan dengan Vue menggunakan `app.use(pinia)`.
export default pinia
