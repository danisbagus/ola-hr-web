<template>
  <SearchForm
    :search="handleFetchList"
    :reset="resetFilters"
    v-show="isShowSearch"
    :columns="searchColumns"
    :search-param="filters"
    :search-col="searchCol"
  />

  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader" :selected-list-ids="selectedListIds" :is-selected="isSelected" />
      </div>
      <div class="header-button-ri">
        <slot name="toolButton">
          <el-button :icon="Refresh" circle @click="handleFetchList" />
          <el-button :icon="Search" circle @click="isShowSearch = !isShowSearch" />
        </slot>
      </div>
    </div>
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="data"
      :row-key="rowKey"
      @selection-change="selectionChange"
      :border="false"
    >
      <template v-for="item in columnList" :key="item">
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type)"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        >
        </el-table-column>
        <TableColumn v-else :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>No data</div>
          </slot>
        </div>
      </template>
    </el-table>
    <slot name="pagination">
      <Pagination
        v-if="isPagination"
        :pagination-meta="paginationMeta"
        :handle-size-change="setSize"
        :handle-current-change="setPage"
      />
    </slot>
  </div>
</template>

<script setup lang="ts" name="Table">
import { ref, computed, onMounted } from 'vue'
import { ElTable, ElNotification } from 'element-plus'
import { Refresh, Search } from '@element-plus/icons-vue'
import SearchForm from '@/components/SearchForm/index.vue'
import Pagination from './components/Pagination.vue'
import TableColumn from './components/TableColumn.vue'
import { handleProp } from '@/utils'

import type { BreakPoint } from '@/components/Grid/interface'
import type { ColumnProps, TypeProps } from '@/components/DynamicTable/interface'
import type { ListComposable } from '@/shared/types/hook'
import { useSelection } from '@/shared/hooks/selection.hook'

export interface TableProps {
  columns: ColumnProps[]

  // Key unik untuk setiap baris data.
  // Penting untuk performa rendering dan identifikasi baris saat multi-pilih.
  // Default: "id".
  rowKey?: string

  // Konfigurasi lebar kolom untuk item pencarian (di area filter pencarian).
  // Bisa berupa angka langsung (misalnya: 2) atau objek dengan breakpoint untuk responsif (misalnya: { xs: 1, sm: 2, md: 3 }).
  searchCol?: number | Record<BreakPoint, number>

  // Injected composable untuk module tertentu
  useListComposable: () => ListComposable

  // isPagination
  isPagination?: boolean
}

// Nilai default untuk props
const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  isPagination: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

const {
  data,
  paginationMeta,
  filters,
  fetchList,
  resetFilters,
  setPage,
  setSize,
  isSuccess,
  errorMessage
} = props.useListComposable()

const { selectionChange, selectedListIds, isSelected } = useSelection(props.rowKey)

const handleFetchList = async () => {
  await fetchList()
  if (!isSuccess.value) {
    ElNotification({ title: 'Failed get table data', type: 'error', message: errorMessage.value })
  }
}

const columnTypes: TypeProps[] = ['selection']

const isShowSearch = ref(true)

// Asumsikan props.columns sudah tersedia dan tidak akan berubah
const columnList = computed<ColumnProps[]>(() => props.columns || [])

// Ambil kolom yang memiliki konfigurasi pencarian (search) dan urutkan berdasarkan order
const searchColumns = computed(() => {
  return columnList.value
    ?.filter(item => item.search?.el || item.search?.render) // hanya kolom yang ada atribut pencarian
    .sort((a, b) => a.search!.order! - b.search!.order!) // urut berdasarkan properti `order`
})

// Atur urutan dan nilai default untuk search form
searchColumns.value?.forEach((column, index) => {
  // skip jika tidak ada konfigurasi search
  if (!column.search) return

  // Atur default order jika tidak ada
  column.search.order = column.search.order ?? index + 2

  const key = column.search.key ?? handleProp(column.prop!)

  // Atur default value jika ada
  const defaultValue = column.search.defaultValue

  if (defaultValue !== undefined && defaultValue !== null) {
    filters.value[key] = defaultValue
    filters.value[key] = defaultValue
  }
})

onMounted(handleFetchList)
</script>
