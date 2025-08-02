<template>
  <!-- Container breadcrumb, menambahkan class 'no-icon' jika breadcrumbIcon di globalStore = false -->
  <!-- <div :class="['breadcrumb-box mask-image', !globalStore.breadcrumbIcon && 'no-icon']"> -->
  <div class="breadcrumb-box mask-image no-icon">
    <!-- Komponen breadcrumb dari Element Plus, gunakan ikon panah kanan sebagai separator -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <!-- Transisi animasi saat breadcrumb berubah -->
      <transition-group name="breadcrumb">
        <!-- Iterasi setiap item breadcrumb dan tampilkan sebagai breadcrumb-item -->
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <!-- Wrapper clickable untuk setiap item breadcrumb -->
          <!-- :classs: Tambahkan class jika tidak ada ikon -->
          <!-- @click: Pindah ke path jika item diklik -->
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <!-- Tampilkan ikon jika tersedia dan opsi global breadcrumbIcon = true -->
            <!-- <el-icon v-if="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
              <component :is="item.meta.icon"></component>
            </el-icon> -->

            <!-- Tampilkan judul breadcrumb -->
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
// Import API Vue
import { computed } from 'vue'

// Import route constant untuk halaman utama
import { HOME_URL } from '@/config'

// Vue Router hooks
import { useRoute, useRouter } from 'vue-router'

// Import ikon separator dari Element Plus
import { ArrowRight } from '@element-plus/icons-vue'

import { useMenu } from '@/modules/menu/menu.hook'

// Inisialisasi hooks
const route = useRoute()
const router = useRouter()

const { breadcrumbList: breadcrumbsGet } = useMenu()

// Hitung daftar breadcrumb berdasarkan rute saat ini
const breadcrumbList = computed(() => {
  // Ambil breadcrumb dari store sesuai rute terakhir yang dicocokkan
  let breadcrumbData = breadcrumbsGet.value[route.matched[route.matched.length - 1].path] ?? []

  // Jika breadcrumb tidak dimulai dari home, prepend home manual
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [
      { path: HOME_URL, meta: { icon: 'HomeFilled', title: 'Homepage' } },
      ...breadcrumbData
    ]
  }

  return breadcrumbData
})

// Fungsi untuk menangani klik breadcrumb
const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  // Jika item bukan yang terakhir (halaman saat ini), lakukan navigasi
  if (index !== breadcrumbList.value.length - 1) router.push(item.path)
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
  // Pembungkus utama untuk breadcrumb (biasanya horizontal di bawah header)
  display: flex; // Menyusun elemen di dalamnya secara horizontal
  align-items: center; // Menyelaraskan elemen secara vertikal ke tengah
  overflow: hidden; // Menyembunyikan konten yang meluap keluar dari wadah (mencegah wrapping)

  .el-breadcrumb {
    // Komponen breadcrumb utama dari Element Plus
    white-space: nowrap; // Memastikan breadcrumb tidak pindah baris

    .el-breadcrumb__item {
      // Setiap item dalam breadcrumb
      position: relative; // Mengatur posisi relatif (biasanya untuk penempatan elemen anak seperti separator)
      display: inline-block; // Menampilkan sebagai blok dalam satu baris
      float: none; // Menonaktifkan float (jika ada default dari library)

      .item-no-icon {
        // Elemen breadcrumb yang tidak memiliki ikon
        transform: translateY(
          -3px
        ); // Menggeser elemen ke atas 3px agar sejajar secara visual dengan item lain
      }

      .el-breadcrumb__inner {
        // Kontainer dalam untuk isi item breadcrumb (teks/link)
        display: inline-flex; // Menyusun isi dalam satu baris secara fleksibel

        &.is-link {
          // Ketika breadcrumb adalah tautan (bukan hanya teks statis)
          color: var(--el-header-text-color); // Warna default dari teks link breadcrumb

          &:hover {
            // Saat hover pada breadcrumb yang berupa link
            color: var(--el-color-primary); // Ubah warna ke warna utama aplikasi (biasanya biru)
          }
        }

        .breadcrumb-icon {
          // Ikon di dalam breadcrumb (misal: ikon folder/page)
          margin-top: 1px; // Jarak atas sedikit untuk sejajarkan dengan teks
          margin-right: 6px; // Jarak kanan dari teks
          font-size: 16px; // Ukuran ikon sedang
        }

        .breadcrumb-title {
          // Teks judul breadcrumb (nama halaman, dsb.)
          margin-top: 2px; // Geser sedikit ke bawah agar sejajar dengan ikon
        }
      }

      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        // Jika ini adalah item terakhir di breadcrumb
        color: var(--el-header-text-color-regular); // Warna berbeda (biasanya non-link, teks biasa)
      }

      :deep(.el-breadcrumb__separator) {
        // Penyesuaian visual untuk tanda pemisah (">" atau "/")
        transform: translateY(-1px); // Geser sedikit ke atas untuk menyamakan tinggi dengan teks
      }
    }
  }
}
.no-icon {
  // Kelas tambahan untuk kasus breadcrumb tanpa ikon
  .el-breadcrumb {
    // Menargetkan breadcrumb utama di dalam elemen dengan kelas .no-icon
    .el-breadcrumb__item {
      // Setiap item breadcrumb
      top: -2px; // Menggeser item ke atas 2px untuk penyelarasan vertikal ketika tidak ada ikon

      :deep(.el-breadcrumb__separator) {
        // Menarget elemen pemisah dalam shadow DOM
        top: 4px; // Menggeser separator ke bawah 4px agar tetap sejajar secara visual
      }

      .item-no-icon {
        // Item yang secara eksplisit tidak memiliki ikon
        transform: translateY(0); // Reset posisi Y ke normal (tidak naik seperti sebelumnya)
      }
    }
  }
}
</style>
