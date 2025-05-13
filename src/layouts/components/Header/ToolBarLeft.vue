<template>
  <!-- Container untuk toolbar sisi kiri -->
  <div class="tool-bar-left">
    <!-- Komponen ikon untuk toggle collapse/expand sidebar -->
    <CollapseIcon id="collapseIcon" />

    <!-- Komponen breadcrumb (navigasi jalur halaman), hanya ditampilkan jika diaktifkan di globalStore -->
    <Breadcrumb v-show="globalStore.breadcrumb" id="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
// Import store global untuk mengambil konfigurasi tampilan UI global
import { useGlobalStore } from '@/stores/modules/global/global.store'

// Import komponen CollapseIcon (untuk toggle sidebar)
import CollapseIcon from './components/CollapseIcon.vue'

// Import komponen Breadcrumb (navigasi jalur halaman)
import Breadcrumb from './components/Breadcrumb.vue'

// Inisialisasi store global, digunakan untuk mengakses state global seperti 'breadcrumb'
const globalStore = useGlobalStore()
</script>

<style scoped lang="scss">
.tool-bar-left {
  display: flex; // Gunakan Flexbox agar item tersusun horizontal
  align-items: center; // Vertikal: pusatkan item di tengah
  justify-content: center; // Horizontal: pusatkan item di tengah
  overflow: hidden; // Sembunyikan konten yang meluap
  white-space: nowrap; // Cegah item melipat ke baris baru
}
</style>
