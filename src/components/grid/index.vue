<template>
  <!-- Komponen grid dengan style dinamis berbasis props -->
  <div :style="style">
    <!-- Slot untuk menampilkan isi komponen grid -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="Grid">
import {
  ref,
  watch,
  useSlots,
  computed,
  provide,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onDeactivated,
  onActivated,
  type VNodeArrayChildren,
  type VNode
} from 'vue'
import type { BreakPoint } from './types/index'

// Tipe props yang bisa diterima oleh komponen
type Props = {
  cols?: number | Record<BreakPoint, number> // Jumlah kolom atau konfigurasi responsif per breakpoint
  collapsed?: boolean // Apakah grid dalam keadaan "terlipat" (sembunyikan sebagian item)
  collapsedRows?: number // Jumlah baris yang ditampilkan ketika collapsed = true
  gap?: [number, number] | number // Jarak antar item: [horizontal, vertical] atau satuan tunggal
}

// Mengatur nilai default props
const props = withDefaults(defineProps<Props>(), {
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }), // Default kolom berdasarkan breakpoint
  collapsed: false, // Default tidak collapsed
  collapsedRows: 1, // Default menampilkan 1 baris saat collapsed
  gap: 0 // Default tanpa jarak
})

// Lifecycle Hooks
onBeforeMount(() => props.collapsed && findIndex()) // Cari index item tersembunyi sebelum komponen mount
onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent) // Atur breakpoint saat mount
  window.addEventListener('resize', resize) // Tambah listener resize
})
onActivated(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent) // Saat komponen aktif kembali
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize) // Bersihkan event saat komponen dihapus
})
onDeactivated(() => {
  window.removeEventListener('resize', resize) // Bersihkan event saat tidak aktif
})

// Fungsi untuk menentukan breakpoint berdasarkan lebar layar
const resize = (e: UIEvent) => {
  let width = (e.target as Window).innerWidth
  switch (!!width) {
    case width < 768:
      breakPoint.value = 'xs'
      break
    case width >= 768 && width < 992:
      breakPoint.value = 'sm'
      break
    case width >= 992 && width < 1200:
      breakPoint.value = 'md'
      break
    case width >= 1200 && width < 1920:
      breakPoint.value = 'lg'
      break
    case width >= 1920:
      breakPoint.value = 'xl'
      break
  }
}

// ========== Provide: berbagi data antar komponen anak ==========

// Memberikan nilai jarak (gap) ke komponen anak
provide('gap', Array.isArray(props.gap) ? props.gap[0] : props.gap)

// Menyediakan nilai breakPoint yang bisa diakses oleh komponen anak
let breakPoint = ref<BreakPoint>('xl')
provide('breakPoint', breakPoint)

// Index item grid terakhir yang akan ditampilkan saat collapsed
const hiddenIndex = ref(-1)
provide('shouldHiddenIndex', hiddenIndex)

// Menyediakan jumlah kolom yang dipakai sesuai breakpoint
const gridCols = computed(() => {
  if (typeof props.cols === 'object') return props.cols[breakPoint.value] ?? props.cols
  return props.cols
})
provide('cols', gridCols)

// ========== Fungsi untuk menemukan index terakhir sebelum item disembunyikan ==========

const slots = useSlots().default!() // Ambil slot default dari komponen

const findIndex = () => {
  let fields: VNodeArrayChildren = [] // Semua anak dari slot
  let suffix: VNode | null = null // Komponen GridItem dengan properti suffix (jika ada)

  slots.forEach((slot: any) => {
    if (
      typeof slot.type === 'object' &&
      slot.type.name === 'GridItem' &&
      slot.props?.suffix !== undefined
    ) {
      suffix = slot // Menemukan suffix GridItem
    }
    if (typeof slot.type === 'symbol' && Array.isArray(slot.children)) {
      fields.push(...slot.children) // Ambil anak-anak dari simbol VNode (misalnya: template)
    }
  })

  // Hitung berapa kolom yang digunakan oleh suffix
  let suffixCols = 0
  if (suffix) {
    suffixCols =
      ((suffix as VNode).props![breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
      ((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0)
  }

  // Temukan item yang harus mulai disembunyikan berdasarkan jumlah kolom maksimum
  try {
    let find = false
    fields.reduce((prev = 0, current, index) => {
      prev +=
        ((current as VNode)!.props![breakPoint.value]?.span ??
          (current as VNode)!.props?.span ??
          1) +
        ((current as VNode)!.props![breakPoint.value]?.offset ??
          (current as VNode)!.props?.offset ??
          0)
      if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
        hiddenIndex.value = index // Simpan index yang mulai disembunyikan
        find = true
        throw 'find it' // Keluar dari reduce dengan throw
      }
      return prev
    }, 0)
    if (!find) hiddenIndex.value = -1 // Semua item ditampilkan
  } catch (e) {
    // Kosongkan error karena throw dipakai hanya untuk keluar dari reduce
  }
}

// Saat breakpoint berubah, cari ulang index tersembunyi jika collapsed aktif
watch(
  () => breakPoint.value,
  () => {
    if (props.collapsed) findIndex()
  }
)

// Saat collapsed berubah, cari atau reset index tersembunyi
watch(
  () => props.collapsed,
  value => {
    if (value) return findIndex()
    hiddenIndex.value = -1
  }
)

// Hitung nilai gap CSS untuk grid
const gridGap = computed(() => {
  if (typeof props.gap === 'number') return `${props.gap}px`
  if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px` // vertical horizontal
  return 'unset'
})

// Hitung style untuk elemen <div> grid
const style = computed(() => {
  return {
    display: 'grid',
    gridGap: gridGap.value,
    gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))` // layout grid fleksibel
  }
})

// Mengekspos breakPoint agar bisa diakses oleh parent (jika pakai ref expose)
defineExpose({ breakPoint })
</script>
