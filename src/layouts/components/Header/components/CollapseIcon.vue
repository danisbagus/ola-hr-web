<template>
  <!-- Komponen ikon dari Element Plus, digunakan untuk tombol collapse/expand sidebar -->
  <el-icon class="collapse-icon" @click="toggleCollapse">
    <!-- Menggunakan dynamic component: jika sidebar collapse maka tampilkan ikon 'expand', jika tidak tampilkan 'fold' -->
    <component :is="isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobal } from '@/modules/global/global.hook'
const { isCollapse, toggleCollapse } = useGlobal()
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
