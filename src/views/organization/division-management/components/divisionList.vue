<template>
  <DataTable ref="table" :columns="columns" :dataSource="divisionList">
    <template #tableHeader="scope">
      <el-button v-auth="'add'" type="primary" :icon="CirclePlus">Add</el-button>
      <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain disabled
        >Batch Add</el-button
      >
      <el-button v-auth="'export'" type="primary" :icon="Download" plain disabled>Export</el-button>
      <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected">
        Batch Delete
      </el-button>
    </template>

    <template #operation>
      <el-button type="primary" link :icon="EditPen">Edit</el-button>
      <el-button type="primary" link :icon="Delete">Delete</el-button>
    </template>

    <template #pagination>
      <Pagination
        :pagination-meta="paginationDivisionList"
        :handle-size-change="setSize"
        :handle-current-change="setPage"
      />
    </template>
  </DataTable>

  <!-- <Drawer ref="drawerRef" /> -->
</template>

<script setup lang="ts">
// Vue built-in
import { reactive, h, onMounted } from 'vue'

// Third-party UI & icon libraries
import { ElTag, ElText } from 'element-plus'
import { CirclePlus, Delete, Download, EditPen, Upload } from '@element-plus/icons-vue'

// Types
import type { ColumnProps } from '@/components/DataTable/types'
import type { DivisionList } from '@/modules/division/division.types'

// Internal modules
import DataTable from '@/components/DataTable/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { useDdl } from '@/modules/ddl/ddl.hook.ts'
import { useDivision } from '@/modules/division/division.hook.ts'

// Hooks
const { generalStatus } = useDdl()
const { divisionList, paginationDivisionList, getDivisionList, setPage, setSize } = useDivision()

const columns = reactive<ColumnProps<DivisionList>[]>([
  { type: 'selection', fixed: 'left', width: 50 },
  {
    prop: 'name',
    label: 'Division Name',
    width: 240,
    render: scope => {
      return h(ElText, { type: 'primary' }, scope.row.name)
    }
  },
  {
    prop: 'is_active',
    label: 'Status',
    options: generalStatus.value,
    width: 240,
    render: scope => {
      const isActive = scope.row.is_active
      return h(
        ElTag,
        { style: 'font-weight: bold', type: isActive ? 'success' : 'danger' },
        isActive ? 'Active' : 'Inactive'
      )
    }
  },
  { prop: 'operation', label: 'Operation', fixed: 'right' }
])

onMounted(async () => {
  await getDivisionList()
})
</script>
