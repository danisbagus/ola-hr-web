<template>
  <!-- Root container dengan minimal lebar 600px untuk menjaga responsif -->
  <el-container class="layout-container" style="min-width: 600px">
    <!-- Header bagian atas layout -->
    <el-header>
      <!-- Bagian kiri header: logo dan toolbar kiri -->
      <div class="header-left mask-image">
        <!-- Logo aplikasi dan nama aplikasi -->
        <div class="logo flx-center">
          <!-- Gambar logo -->
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <!-- Teks nama aplikasi (data binding ke variabel `title`) -->
          <span class="logo-text">{{ title }}</span>
        </div>
        <!-- <ToolBarLeft /> -->
      </div>
      <div class="header-right">
        <!-- Komponen toolbar kiri (misalnya: tombol collapse menu, breadcrumb, dll) -->
        <!-- <ToolBarRight /> -->
      </div>
    </el-header>

    <!-- Kontainer utama setelah header -->
    <el-container class="layout-content">
      <!-- Sidebar kiri (navigasi menu) -->
      <el-aside>
        <!-- Box pembungkus sidebar dengan lebar dinamis berdasarkan `isCollapse` -->
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <!-- Scrollbar vertikal untuk sidebar menu -->
          <el-scrollbar>
            <!-- Komponen menu dari Element Plus -->
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
            >
              <!--router: Menu tidak otomatis mengarahkan berdasarkan route -->
              <!--default-active: Menu aktif saat ini -->
              <!--collapse: Collapse menu atau tidak -->
              <!--unique-opened: Hanya satu menu terbuka dalam satu waktu -->
              <!--collapse-transition: Nonaktifkan transisi saat collapse -->

              <!-- Komponen submenu, menerima prop daftar menu -->
              <!-- <SubMenu :menu-list="menuList" /> -->
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <!-- Bagian konten utama (halaman dinamis) -->
      <el-container class="layout-main">
        <!-- Komponen utama yang merender <router-view> atau isi halaman -->
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// core libraries
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// stores / state management
import { useAuthStore } from '@/stores/modules/auth/auth.store'
import { useGlobalStore } from '@/stores/modules/global/global.store'

// layout components
// import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue'
// import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'
// import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import Main from '@/layouts/components/Main/index.vue'

// environment variable
const title = import.meta.env.VITE_GLOB_APP_TITLE

// reactive state
const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

// computed
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(
  () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
)

// [v] templating
// [v] wording
// [v]styling
// [v] function
// integration
</script>

<style lang="scss" scoped>
.el-container {
  // Elemen utama yang menjadi kontainer seluruh layout (baik header maupun konten)
  width: 100%; // Mengatur agar lebar kontainer mengisi seluruh ruang horizontal
  height: 100%; // Mengatur agar tinggi kontainer mengisi seluruh ruang vertikal

  :deep(.el-header) {
    // Selektor deep untuk menarget elemen .el-header yang mungkin berada dalam shadow DOM (misalnya dari library seperti Element Plus)
    box-sizing: border-box; // Menyertakan padding dan border ke dalam total lebar/tinggi elemen
    display: flex; // Mengaktifkan layout fleksibel agar anak-anaknya bisa ditata horizontal/vertikal
    align-items: center; // Menyelaraskan anak-anak secara vertikal (vertically center)
    justify-content: space-between; // Menyebar anak-anak sejauh mungkin secara horizontal (spasi di antara elemen)
    height: 55px; // Menetapkan tinggi tetap untuk header
    padding: 0 15px 0 0; // Padding atas: 0, kanan: 15px, bawah: 0, kiri: 0 (memberi jarak kanan terhadap isi)
    background-color: var(
      --el-header-bg-color
    ); // Menggunakan variabel CSS untuk latar belakang header (bisa dikustomisasi secara global)
    border-bottom: 1px solid var(--el-header-border-color); // Garis bawah sebagai pembatas visual antara header dan konten

    .header-left {
      // Bagian kiri dari header, biasanya berisi logo dan nama aplikasi
      display: flex; // Menata konten di dalamnya secara horizontal
      align-items: center; // Menengahkan isi secara vertikal
      overflow: hidden; // Menyembunyikan isi yang meluap (berguna jika teks/logo terlalu panjang)
      white-space: nowrap; // Mencegah teks dipotong ke baris berikutnya (semua dalam satu baris)

      .logo {
        // Area khusus untuk logo
        flex-shrink: 0; // Mencegah elemen ini mengecil saat ruang terbatas
        width: 210px; // Menetapkan lebar tetap untuk area logo
        margin-right: 16px; // Memberi jarak ke kanan terhadap elemen selanjutnya (misalnya nama aplikasi)

        .logo-img {
          // Gambar logo
          width: 28px; // Ukuran gambar tetap 28px (baik tinggi maupun lebar, tergantung proporsi gambar)
          object-fit: contain; // Menyesuaikan gambar agar tidak terpotong dan tetap proporsional di dalam kotak
        }

        .logo-text {
          // Teks di samping logo (biasanya nama aplikasi)
          margin-left: 6px; // Jarak antara gambar logo dan teks
          font-size: 21.5px; // Ukuran font cukup besar untuk terlihat sebagai branding
          font-weight: bold; // Menjadikan teks lebih tebal agar menonjol
          color: var(--el-header-logo-text-color); // Warna teks diatur melalui variabel CSS
          white-space: nowrap; // Menjaga teks tetap dalam satu baris agar tidak terpotong
        }
      }
    }
  }

  .layout-content {
    // Kontainer untuk seluruh bagian di bawah header (aside dan main content)
    display: flex; // Menggunakan layout fleksibel untuk menempatkan aside dan main content secara horizontal
    height: calc(100% - 55px); // Tinggi konten dikurangi tinggi header agar tidak tumpang tindih

    :deep(.el-aside) {
      // Menarget elemen aside (biasanya sidebar navigasi), menggunakan deep untuk shadow DOM
      width: auto; // Lebarnya disesuaikan dengan isi, bisa berubah dinamis tergantung konten
      background-color: var(--el-menu-bg-color); // Latar belakang dari sidebar (bisa disesuaikan)
      border-right: 1px solid var(--el-aside-border-color); // Garis pembatas kanan sidebar

      .aside-box {
        // Kontainer utama dari isi sidebar
        display: flex; // Flexbox agar anak-anak bisa diatur posisinya
        flex-direction: column; // Menyusun anak-anaknya secara vertikal (dari atas ke bawah)
        height: 100%; // Mengisi seluruh tinggi area sidebar
        transition: width 0.3s ease; // Animasi halus ketika lebar aside berubah (misalnya collapse/expand)

        .el-menu {
          // Komponen menu navigasi dalam aside
          width: 100%; // Lebar penuh sesuai dengan aside-box
          overflow-x: hidden; // Menghindari scroll horizontal
          border-right: none; // Menghilangkan garis batas kanan default pada menu
        }
      }
    }

    .layout-main {
      // Bagian utama layout tempat konten halaman ditampilkan
      display: flex; // Flexbox untuk tata letak konten dalam main
      flex-direction: column; // Konten utama disusun vertikal (dari atas ke bawah)
    }
  }
}
</style>
