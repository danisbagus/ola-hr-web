<template>
  <DataTable ref="table" :columns="columns" :dataSource="employeeList">
    <template #tableHeader="scope">
      <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="addEmployee"
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
        :pagination-meta="employeeListPagination"
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
    <span>Are you sure you want to delete this employee?</span>
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
    <span>Are you sure you want to batch delete employee?</span>
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
import type { ColumnProps } from '@/components/data-table/types'
import type { EmployeeList } from '@/modules/employee/employee.types'

// Internal modules
import DataTable from '@/components/data-table/index.vue'
import Pagination from '@/components/pagination/index.vue'
import Drawer from '@/components/drawer/index.vue'
import EmployeeAddContainer from '@/views/organization/employee-management/components/employee-add-container.vue'
import EmployeeEditContainer from '@/views/organization/employee-management/components/employee-edit-container.vue'
import { useEmployee } from '@/modules/employee/employee.hook'

// Hooks
const {
  getEmployeeList,
  deleteEmployee,
  deleteBatchEmployee,
  setPage,
  setSize,
  employeeList,
  employeeListPagination,
  isSuccessDelete,
  isSuccessDeleteBatch
} = useEmployee()

const drawerRef = ref<InstanceType<typeof Drawer> | null>(null)

const deleteConfirmVisible = ref(false)
const deleteBatchConfirmVisible = ref(false)
const selectedId = ref(0)
const selectedIds = ref<number[]>([])

const addEmployee = () => {
  drawerRef.value?.openDrawer({
    title: 'Add Employee',
    component: EmployeeAddContainer,
    props: {}
  })
}

const editEmployee = (id: number) => {
  drawerRef.value?.openDrawer({
    title: 'Edit Employee',
    component: EmployeeEditContainer,
    props: { id }
  })
}

const openDeleteConfirm = (id: number) => {
  deleteConfirmVisible.value = true
  selectedId.value = id
}

const handleDelete = async () => {
  await deleteEmployee(selectedId.value)
  if (isSuccessDelete.value) {
    deleteConfirmVisible.value = false
    await getEmployeeList()
  }
}

const openDeleteBatchConfirm = (ids: number[]) => {
  deleteBatchConfirmVisible.value = true
  selectedIds.value = ids
}

const handleDeleteBatch = async () => {
  await deleteBatchEmployee(selectedIds.value)
  if (isSuccessDeleteBatch.value) {
    deleteBatchConfirmVisible.value = false
    await getEmployeeList()
  }
}

const columns = reactive<ColumnProps<EmployeeList>[]>([
  { type: 'selection', fixed: 'left', width: 50 },
  {
    prop: 'employee_number',
    label: 'Employee ID',
    width: 120,
    render: scope => {
      return h(ElText, { style: 'font-weight: bold' }, scope.row.employee_number)
    }
  },
  {
    prop: 'name',
    label: 'Employee Name',
    render: scope => {
      return h(ElText, { type: 'primary' }, scope.row.name)
    }
  },
  {
    prop: 'division',
    label: 'Division'
  },
  {
    prop: 'role',
    label: 'Role'
  },
  {
    prop: 'is_active',
    label: 'Status',
    width: 90,
    render: scope => {
      const isActive = scope.row.is_active
      return h(
        ElTag,
        { style: 'font-weight: bold', type: isActive ? 'success' : 'danger' },
        isActive ? 'Active' : 'Inactive'
      )
    }
  },
  { prop: 'operation', label: 'Operation', fixed: 'right', width: 240 }
])

onMounted(async () => {
  await getEmployeeList()
})
</script>
