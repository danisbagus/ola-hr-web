<template>
  <!-- Komponen GridItem hanya ditampilkan jika isShow bernilai true -->
  <div v-show="isShow" :style="style">
    <!-- Menampilkan isi slot -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="GridItem">
import { computed, inject, type Ref, ref, useAttrs, watch } from 'vue'
import { type BreakPoint, type Responsive } from '../interface/index'

// ================================
// PROPS
// ================================

type Props = {
  offset?: number // Jumlah kolom untuk offset (jarak dari kiri)
  span?: number // Jumlah kolom yang ingin diambil komponen ini
  suffix?: boolean // Apakah item ini elemen akhir di baris (untuk tombol/aksi)
  xs?: Responsive // Responsif untuk layar ekstra kecil
  sm?: Responsive // Responsif untuk layar kecil
  md?: Responsive // Responsif untuk layar sedang
  lg?: Responsive // Responsif untuk layar besar
  xl?: Responsive // Responsif untuk layar ekstra besar
}

// Atur nilai default untuk props
const props = withDefaults(defineProps<Props>(), {
  offset: 0,
  span: 1,
  suffix: false,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined
})

// Ambil atribut tambahan (seperti :index)
const attrs = useAttrs() as { index: string }

// Kontrol visibilitas elemen
const isShow = ref(true)

// ================================
// INJECT PROPERTY DARI KOMPONEN PARENT
// ================================

// Inject breakpoint aktif dari parent Grid (misal: 'md', 'lg')
const breakPoint = inject<Ref<BreakPoint>>('breakPoint', ref('xl'))

// Index dari kolom yang perlu disembunyikan (jika collapse)
const shouldHiddenIndex = inject<Ref<number>>('shouldHiddenIndex', ref(-1))

// Observasi perubahan pada shouldHiddenIndex & breakPoint
watch(
  () => [shouldHiddenIndex.value, breakPoint.value],
  n => {
    // Jika index tersedia, tentukan apakah harus disembunyikan
    if (!!attrs.index) {
      isShow.value = !(n[0] !== -1 && parseInt(attrs.index) >= Number(n[0]))
    }
  },
  { immediate: true } // jalankan saat mounted juga
)

// ================================
// PERHITUNGAN STYLING RESPONSIF GRID
// ================================

// Ambil nilai gap dan jumlah kolom dari parent Grid
const gap = inject('gap', 0)
const cols = inject('cols', ref(4))

// Hitung style CSS grid secara dinamis berdasarkan breakpoint & offset/span
const style = computed(() => {
  // Ambil nilai span dan offset berdasarkan breakpoint aktif
  let span = props[breakPoint.value]?.span ?? props.span
  let offset = props[breakPoint.value]?.offset ?? props.offset

  // Jika item adalah suffix (biasanya tombol aksi), posisikan ke akhir
  if (props.suffix) {
    return {
      gridColumnStart: cols.value - span - offset + 1,
      gridColumnEnd: `span ${span + offset}`,
      marginLeft:
        offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : 'unset'
    }
  } else {
    // Posisi item biasa dalam grid
    return {
      gridColumn: `span ${span + offset > cols.value ? cols.value : span + offset}/span ${
        span + offset > cols.value ? cols.value : span + offset
      }`,
      marginLeft:
        offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : 'unset'
    }
  }
})
</script>
