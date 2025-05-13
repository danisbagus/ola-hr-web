<template>
  <!-- Komponen ikon dari Element Plus, digunakan untuk tombol collapse/expand sidebar -->
  <el-icon class="collapse-icon" @click="changeCollapse">
    <!-- Menggunakan dynamic component: jika sidebar collapse maka tampilkan ikon 'expand', jika tidak tampilkan 'fold' -->
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
// Import global store untuk mengakses dan mengubah state UI global
import { useGlobalStore } from '@/stores/modules/global/global.store'

// Inisialisasi store global
const globalStore = useGlobalStore()

// Fungsi untuk toggle (ubah) state collapse sidebar
const changeCollapse = () => {
  // Mengubah nilai isCollapse menjadi kebalikannya
  globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
}
</script>

<style scoped lang="scss">
.collapse-icon {
  // Kelas untuk ikon collapse (biasanya ikon menu di sidebar/header)
  margin-right: 20px; // Memberi jarak 20px ke kanan dari elemen berikutnya (biasanya teks atau ikon lain)
  font-size: 22px; // Ukuran font 22px agar ikon terlihat cukup besar dan jelas
  color: var(
    --el-header-text-color
  ); // Warna ikon ditentukan oleh variabel CSS, biasanya sesuai tema header
  cursor: pointer; // Saat diarahkan kursor, berubah jadi pointer (menunjukkan bahwa elemen bisa diklik)
}
</style>
