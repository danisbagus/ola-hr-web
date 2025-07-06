<template>
  <!-- Drawer utama -->
  <el-drawer v-model="visible" :title="title" size="50%" :destroy-on-close="true">
    <!-- Komponen dinamis yang akan di-render di dalam drawer -->
    <!-- Emit 'close' dari child akan ditangkap di sini -->
    <component :is="component" v-if="component" v-bind="props" @close="handleClose" />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

// Status visible drawer
const visible = ref(false)

// Judul drawer (ditampilkan di header)
const title = ref('')

// Komponen dinamis yang akan dirender di dalam drawer
const component = shallowRef()

// Props yang akan diberikan ke komponen dinamis
const props = ref<Record<string, any>>({})

/**
 * Membuka drawer dengan komponen dan props yang diberikan
 * @param options.title Judul drawer
 * @param options.component Komponen Vue yang ingin ditampilkan
 * @param options.props (Opsional) Props untuk dikirim ke komponen
 */
function openDrawer(options: { title: string; component: any; props?: Record<string, any> }) {
  title.value = options.title
  component.value = options.component
  props.value = options.props || {}
  visible.value = true
}

/**
 * Menutup drawer
 */
function closeDrawer() {
  visible.value = false
}

/**
 * Fungsi ini dipanggil ketika child emit('close'),
 * dan akan menutup drawer secara terpusat
 */
function handleClose() {
  closeDrawer()
}

// Mengekspos method agar bisa dipanggil dari parent via ref
defineExpose({ openDrawer, closeDrawer })
</script>
