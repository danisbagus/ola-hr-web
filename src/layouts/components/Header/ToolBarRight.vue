<template>
  <div class="tool-bar-right">
    <div class="header-icon">
      <!-- <Message id="message" /> -->
    </div>
    <div class="user-info">
      <span class="username">{{ userInfo.name }}</span>
      <span class="role">{{ userInfo.role }}</span>
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
// import Message from './components/Message.vue'
import Avatar from './components/Avatar.vue'
import { useUser } from '@/modules/user/user.hook'

const { userInfo } = useUser()
</script>

<style scoped lang="scss">
.tool-bar-right {
  // Kontainer utama untuk elemen di sisi kanan toolbar/header
  display: flex; // Menyusun anak-anaknya dalam satu baris (horizontal)
  align-items: center; // Menyelaraskan anak-anaknya secara vertikal ke tengah
  justify-content: center; // Menyusun anak-anak di tengah secara horizontal
  padding-right: 25px; // Memberi padding kanan sebesar 25px (jarak dari sisi kanan container)

  .header-icon {
    // Grup ikon dalam toolbar kanan (misal: notifikasi, pengaturan)
    display: flex; // Menyusun ikon dalam satu baris
    align-items: center; // Menyelaraskan ikon secara vertikal

    & > * {
      // Menarget semua elemen anak langsung dari .header-icon
      margin-left: 21px; // Memberi jarak ke kiri untuk pemisahan antar ikon
      color: var(--el-header-text-color); // Warna ikon mengikuti tema header
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    text-align: right;
  }

  .username {
    font-weight: bold;
    font-size: 1rem;
    color: var(--el-header-text-color);
  }

  .role {
    font-size: 0.75rem;
    color: #888;
    font-style: italic;
  }
}
</style>
