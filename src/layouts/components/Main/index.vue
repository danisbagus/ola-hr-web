<template>
  <!-- Bagian utama dari layout, di mana komponen halaman ditampilkan -->
  <el-main>
    <!-- router-view menampilkan komponen berdasarkan rute saat ini -->
    <router-view v-slot="{ Component, route }">
      <!-- Transition untuk efek animasi saat halaman berubah -->
      <transition appear name="fade-transform" mode="out-in">
        <!-- Komponen yang dibungkus keep-alive untuk cache halaman tertentu -->
        <keep-alive :include="keepAliveName">
          <component
            :is="createComponentWrapper(Component, route)"
            v-if="isRouterShow"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>

  <!-- Footer akan muncul hanya jika nilai 'footer' adalah true -->
  <el-footer v-show="footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
// Import reactive utilities dari Vue
import { ref, onBeforeUnmount, provide, h } from 'vue'

// Import untuk mengubah state Pinia menjadi reactive references
import { storeToRefs } from 'pinia'

// Import debounce function dari VueUse (mencegah pemanggilan berulang-ulang dalam waktu singkat)
import { useDebounceFn } from '@vueuse/core'

// Import global store yang berisi state umum aplikasi (layout, collapse, dll)
import { useGlobalStore } from '@/stores/modules/global/global.store'

// Import store yang berfungsi untuk menyimpan daftar komponen yang perlu di-*keep-alive*
import { useKeepAliveStore } from '@/stores/modules/keepAlive/keepAlive.store'

// Import komponen Footer untuk digunakan di bagian layout bawah
import Footer from '@/layouts/components/Footer/index.vue'

// Inisialisasi global store
const globalStore = useGlobalStore()

// Ambil state reactive dari global store
const { isCollapse, footer } = storeToRefs(globalStore)

// Inisialisasi store untuk fitur keep-alive
const keepAliveStore = useKeepAliveStore()

// Ambil daftar nama komponen yang perlu disimpan (cached)
const { keepAliveName } = storeToRefs(keepAliveStore)

// Reactive state untuk kontrol visibilitas router-view
const isRouterShow = ref(true)

// Fungsi untuk menyembunyikan/menampilkan kembali router-view
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)

// Provide fungsi refresh agar bisa digunakan oleh komponen anak
provide('refresh', refreshCurrentPage)

// Map untuk menyimpan komponen wrapper berdasarkan fullPath agar tetap ter-cache
const wrapperMap = new Map()

// Fungsi pembungkus komponen agar bisa disimpan dalam keep-alive berdasarkan route
function createComponentWrapper(component, route) {
  if (!component) return // Tidak lakukan apa-apa jika komponen tidak tersedia

  const wrapperName = route.fullPath // Gunakan path lengkap sebagai key

  // Cek apakah sudah ada wrapper untuk path ini
  let wrapper = wrapperMap.get(wrapperName)

  // Jika belum, buat baru
  if (!wrapper) {
    wrapper = {
      name: wrapperName,
      render: () => h(component) // Render komponen secara dinamis menggunakan fungsi h()
    }
    wrapperMap.set(wrapperName, wrapper)
  }

  // Kembalikan elemen virtual DOM dari wrapper
  return h(wrapper)
}

// State reactive untuk menyimpan lebar layar
const screenWidth = ref(0)

// Fungsi yang akan dijalankan saat jendela di-resize (dengan debounce 100ms)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth // Ambil lebar layar saat ini

  // Jika layar kurang dari 1200px dan sidebar belum collapse, set collapse = true
  if (!isCollapse.value && screenWidth.value < 1200) {
    globalStore.setGlobalState('isCollapse', true)
  }

  // Jika layar lebih dari 1200px dan sidebar sedang collapse, buka kembali
  if (isCollapse.value && screenWidth.value > 1200) {
    globalStore.setGlobalState('isCollapse', false)
  }
}, 100) // Delay selama 100ms agar tidak terlalu sering dipanggil
// Tambahkan event listener untuk resize window
window.addEventListener('resize', listeningWindow, false)

// Bersihkan listener saat komponen akan di-unmount untuk mencegah memory leak
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style scoped lang="scss">
/* Gaya untuk elemen <el-main> dari Element Plus */
.el-main {
  box-sizing: border-box; /* Memastikan padding dan border dihitung dalam total width/height elemen */
  padding: 10px 12px; /* Memberikan ruang dalam (inner spacing) ke semua sisi */
  overflow-x: hidden; /* Menyembunyikan scroll horizontal jika konten melebihi lebar */
  background-color: var(
    --el-bg-color-page
  ); /* Menggunakan variabel CSS dari Element Plus untuk latar belakang halaman */
}

/* Gaya untuk elemen <el-footer> dari Element Plus */
.el-footer {
  height: auto; /* Biarkan tinggi menyesuaikan isi secara otomatis */
  padding: 0; /* Hapus padding default */
}
</style>
