<template>
  <!-- Footer utama dengan class 'flx-center' untuk pusatkan konten secara horizontal dan vertical -->
  <div class="footer flx-center">
    <!-- Link ke GitHub Danisbagus, terbuka di tab baru -->
    <a href="https://github.com/danisbagus" target="_blank"> 2025 © OLA HR by Danisbagus. </a>
  </div>
</template>

<style scoped lang="scss">
/* Gaya untuk elemen footer */
.footer {
  height: 30px; /* Tinggi footer tetap 30px */
  background-color: var(--el-bg-color); /* Warna latar belakang mengikuti tema Element Plus */
  border-top: 1px solid var(--el-border-color-light); /* Garis batas atas sebagai pemisah */

  /* Gaya untuk anchor tag di dalam footer */
  a {
    font-size: 14px; /* Ukuran font 14px */
    color: var(--el-text-color-secondary); /* Warna teks sekunder dari tema Element Plus */
    text-decoration: none; /* Menghapus garis bawah default pada link */
    letter-spacing: 0.5px; /* Spasi antar huruf sedikit diperlebar */
  }
}
</style>
