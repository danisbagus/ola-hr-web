<template>
  <!-- Looping semua item dalam menuList -->
  <template v-for="subItem in menuList" :key="subItem.path">
    <!-- Jika item memiliki children (submenu), tampilkan el-sub-menu -->
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <!-- Slot title untuk label menu -->
      <template #title>
        <!-- Jika ada icon di meta, tampilkan icon -->
        <el-icon v-if="subItem.meta?.icon">
          <!-- Komponen icon bersifat dinamis -->
          <component :is="subItem.meta?.icon"></component>
        </el-icon>
        <!-- Judul menu -->
        <span class="sle">{{ subItem.meta?.title }}</span>
      </template>

      <!-- Rekursif panggil SubMenu lagi untuk menampilkan submenu -->
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>

    <!-- Jika tidak punya children, tampilkan sebagai item biasa -->
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <!-- Tampilkan icon jika ada -->
      <el-icon v-if="subItem.meta?.icon">
        <component :is="subItem.meta?.icon"></component>
      </el-icon>

      <!-- Gunakan slot title -->
      <template #title>
        <span class="sle">{{ subItem.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' // Import Vue Router
import type { MenuRouteItem } from '@/modules/menu/menu.types'

// Terima props menuList bertipe array dari Menu.MenuOptions
defineProps<{ menuList: MenuRouteItem[] }>()

// Gunakan instance router
const router = useRouter()

// Fungsi ketika menu diklik
const handleClickMenu = (subItem: MenuRouteItem) => {
  // Jika item adalah link eksternal, buka tab baru
  if (subItem.meta?.is_link) return window.open(subItem.path, '_blank')

  // Jika bukan link eksternal, navigasi ke route lokal
  router.push(subItem.path)
}
</script>

<style lang="scss">
// Hover pada sub-menu title: ubah warna teks, hapus warna background
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}

// Saat menu dalam kondisi collapse dan aktif: ubah warna latar dan teks
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}

// Style umum untuk item menu
.el-menu-item {
  // Hover: ubah warna teks
  &:hover {
    color: var(--el-menu-hover-text-color);
  }

  // Saat aktif: ubah warna teks dan background
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;

    // Tambahkan garis warna di sisi kiri sebagai indikator aktif
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      padding: 0px 0px;
      width: 5px;
      content: '';
      background-color: var(--el-color-primary);
    }
  }
}
</style>
