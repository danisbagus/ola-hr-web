<template>
  <!-- Hanya tampilkan form jika ada kolom yang perlu dicari -->
  <div v-if="columns.length" class="card table-search">
    <!-- Form pencarian menggunakan Element Plus -->
    <el-form ref="formRef" :model="searchParam">
      <!-- Komponen Grid yang mengatur tata letak responsif form item -->
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <!-- Iterasi setiap kolom pencarian -->
        <GridItem
          v-for="(item, index) in columns"
          :key="item.prop"
          v-bind="getResponsive(item)"
          :index="index"
        >
          <!-- v-bind="getResponsive(item)": Tentukan atribut responsif berdasarkan props kolom -->

          <!-- Komponen FormItem dari Element Plus -->
          <el-form-item>
            <template #label>
              <el-space :size="4">
                <!-- Tampilkan label dari konfigurasi search.label atau fallback ke item.label -->
                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                <!-- Jika ada tooltip, tampilkan ikon info -->
                <el-tooltip
                  v-if="item.search?.tooltip"
                  effect="dark"
                  :content="item.search?.tooltip"
                  placement="top"
                >
                  <i :class="'iconfont icon-yiwen'"></i>
                </el-tooltip>
              </el-space>
              <span>&nbsp;:</span>
            </template>
            <!-- Komponen yang bertanggung jawab merender input pencarian (text/select/date dsb) -->
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </GridItem>

        <!-- Tombol aksi: search, reset, dan collapse/expand -->
        <GridItem suffix>
          <div class="operation">
            <!-- Tombol pencarian -->
            <el-button type="primary" :icon="Search" @click="search"> Search </el-button>
            <!-- Tombol reset pencarian -->
            <el-button :icon="Delete" @click="reset"> Reset </el-button>
            <!-- Tombol collapse/expand jika form terlalu panjang -->
            <el-button
              v-if="showCollapse"
              type="primary"
              link
              class="search-isOpen"
              @click="collapsed = !collapsed"
            >
              {{ collapsed ? 'Expand' : 'Collapse' }}
              <el-icon class="el-icon--right">
                <!-- Ikon collapse/expand dinamis -->
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="SearchForm">
import { ref, computed } from 'vue'
import type { ColumnProps } from '@/components/Table/interface'
import type { BreakPoint } from '@/components/Grid/interface'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SearchFormItem from './components/SearchFormItem.vue'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'

// Interface properti yang bisa diterima komponen
interface TableProps {
  columns?: ColumnProps[] // Daftar kolom yang mendukung pencarian
  searchParam?: { [key: string]: any } // Data model untuk form pencarian
  searchCol: number | Record<BreakPoint, number> // Konfigurasi kolom grid
  search: (params: any) => void // Fungsi untuk melakukan pencarian
  reset: (params: any) => void // Fungsi untuk mereset pencarian
}

// Menyediakan nilai default jika props tidak diberikan
const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  searchParam: () => ({})
})

// Fungsi untuk mengambil atribut layout/grid responsif dari kolom
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span, // Lebar kolom
    offset: item.search?.offset ?? 0, // Jarak offset kolom
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl
  }
}

// Status collapsible form (expand/collapse)
const collapsed = ref(true)

// Referensi ke Grid, digunakan untuk mengambil breakpoint yang sedang aktif
const gridRef = ref()

// Hitung breakpoint aktif berdasarkan Grid
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// Menentukan apakah tombol "Expand/Collapse" perlu ditampilkan
const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    // Hitung total span + offset untuk setiap field
    prev +=
      (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    // Jika nilai lebih besar dari batas kolom (misalnya 24), tampilkan tombol collapse
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true
    } else {
      if (prev >= props.searchCol) show = true
    }
    return prev
  }, 0)
  return show
})
</script>
