<template>
  <DataTable ref="table" :columns="columns" :dataSource="divisionList">
    <template #tableHeader="scope">
      <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="addDivision"
        >Add</el-button
      >
      <el-button v-auth="'export'" type="primary" :icon="Download" plain disabled>Export</el-button>
      <el-button
        type="danger"
        :icon="Delete"
        plain
        :disabled="!scope.isSelected"
        @click="openDeleteBatchConfirm(scope.selectedListIds)"
      >
        Batch Delete
      </el-button>
    </template>

    <template #operation="scope">
      <el-button type="primary" link :icon="EditPen" @click="editEmployee(scope.row.id)"
        >Edit</el-button
      >
      <el-button type="primary" link :icon="Delete" @click="openDeleteConfirm(scope.row.id)"
        >Delete</el-button
      >
    </template>

    <template #pagination>
      <Pagination
        :pagination-meta="paginationDivisionList"
        :handle-size-change="setSize"
        :handle-current-change="setPage"
      />
    </template>
  </DataTable>

  <Drawer ref="drawerRef" />

  <el-dialog
    v-model="deleteConfirmVisible"
    title="Delete Confirmation"
    width="30%"
    @close="deleteConfirmVisible = false"
  >
    <span>Are you sure you want to delete this division?</span>
    <template #footer>
      <el-button @click="deleteConfirmVisible = false">No</el-button>
      <el-button type="danger" @click="handleDelete">Yes, Delete</el-button>
    </template>
  </el-dialog>

  <el-dialog
    v-model="deleteBatchConfirmVisible"
    title="Delete Batch Confirmation"
    width="30%"
    @close="deleteBatchConfirmVisible = false"
  >
    <span>Are you sure you want to batch delete division?</span>
    <template #footer>
      <el-button @click="deleteBatchConfirmVisible = false">No</el-button>
      <el-button type="danger" @click="handleDeleteBatch">Yes, Delete</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// Vue built-in
import { ref, reactive, h, onMounted } from 'vue'

// Third-party UI & icon libraries
import { ElTag, ElText } from 'element-plus'
import { CirclePlus, Delete, Download, EditPen } from '@element-plus/icons-vue'

// Types
import type { ColumnProps } from '@/components/DataTable/types'
import type { DivisionList } from '@/modules/division/division.types'

// Internal modules
import DataTable from '@/components/DataTable/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Drawer from '@/components/Drawer/index.vue'
import DivisionAddContainer from './divisionAddContainer.vue'
import DivisionEditContainer from '@/views/organization/division-management/components/divisionEditContainer.vue'
import { useDdl } from '@/modules/ddl/ddl.hook.ts'
import { useDivision } from '@/modules/division/division.hook.ts'

// Hooks
const { generalStatus } = useDdl()
const {
  divisionList,
  paginationDivisionList,
  getDivisionList,
  deleteDivision,
  deleteBatchDivision,
  setPage,
  setSize,
  isSuccessDelete,
  isSuccessDeleteBatch
} = useDivision()

const drawerRef = ref<InstanceType<typeof Drawer> | null>(null)

const deleteConfirmVisible = ref(false)
const deleteBatchConfirmVisible = ref(false)
const selectedId = ref(0)
const selectedIds = ref<number[]>([])

const addDivision = () => {
  drawerRef.value?.openDrawer({
    title: 'Add Employee',
    component: DivisionAddContainer,
    props: {}
  })
}

const editEmployee = (id: number) => {
  drawerRef.value?.openDrawer({
    title: 'Edit Employee',
    component: DivisionEditContainer,
    props: { id }
  })
}

const openDeleteConfirm = (id: number) => {
  deleteConfirmVisible.value = true
  selectedId.value = id
}

const handleDelete = async () => {
  await deleteDivision(selectedId.value)
  if (isSuccessDelete.value) {
    deleteConfirmVisible.value = false
    await getDivisionList()
  }
}

const openDeleteBatchConfirm = (ids: number[]) => {
  deleteBatchConfirmVisible.value = true
  selectedIds.value = ids
}

const handleDeleteBatch = async () => {
  await deleteBatchDivision(selectedIds.value)
  if (isSuccessDeleteBatch.value) {
    deleteBatchConfirmVisible.value = false
    await getDivisionList()
  }
}

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
