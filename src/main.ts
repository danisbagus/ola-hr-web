// Core & Vue Framework
import { createApp } from 'vue' // Fungsi utama untuk membuat instance aplikasi Vue
import App from './App.vue' // Komponen root aplikasi

// Plugin & Library Pihak Ketiga
import ElementPlus from 'element-plus' // UI framework Element Plus
import 'element-plus/dist/index.css' // Gaya bawaan Element Plus
import * as Icons from '@element-plus/icons-vue' // Semua ikon dari Element Plus sebagai komponen Vue

// Routing & State Management
import router from '@/router/index.ts' // Router untuk navigasi antar halaman
import pinia from '@/stores' // Pinia store (state management Vue)

// Gaya & Aset Kustom
import './style.css' // Gaya umum proyek
import '@/styles/common.scss' // SCSS umum untuk konsistensi UI
import '@/styles/element.scss' // Kustomisasi gaya untuk komponen Element Plus
import '@/assets/iconfont/iconfont.scss' // SCSS untuk font ikon khusus

// Inisialisasi Aplikasi
// =========================
const app = createApp(App) // Membuat instance aplikasi Vue

// Registrasi Global Komponen Ikon
// =========================
Object.keys(Icons).forEach(key => {
  // Registrasi setiap ikon sebagai komponen global
  app.component(key, Icons[key as keyof typeof Icons])
})

// Gunakan Plugin & Mount App
app
  .use(ElementPlus) // Gunakan Element Plus UI framework
  .use(router) // Gunakan router untuk navigasi
  .use(pinia) // Gunakan Pinia untuk state management
  .mount('#app') // Mount aplikasi ke elemen dengan id="app"
