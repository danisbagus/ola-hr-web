<template>
  <!-- Container utama dengan kelas "home" dan "card" -->
  <div class="home card">
    <!-- Gambar latar yang ditampilkan di halaman home -->
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
  </div>
</template>

<script setup lang="ts" name="home"></script>

<style scoped lang="scss">
.home {
  display: flex; /* Gunakan flexbox untuk penataan */
  align-items: center; /* Pusatkan konten secara vertikal */
  justify-content: center; /* Pusatkan konten secara horizontal */
  width: 100%; /* Gunakan seluruh lebar kontainer induk */
  height: 100%; /* Gunakan seluruh tinggi kontainer induk */

  .home-bg {
    width: 70%; /* Gambar menempati 70% dari lebar kontainer */
    max-width: 1200px; /* Batas maksimum lebar gambar */
    margin-bottom: 20px; /* Jarak bawah dari elemen di bawahnya (jika ada) */
  }
}
</style>
