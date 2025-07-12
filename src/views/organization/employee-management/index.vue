<template>
  <div class="table-box">
    <Table ref="table" :columns="columns" :use-list-composable="useEmployeeList">
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="addEmployee"
          >Add</el-button
        >
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain disabled
          >Batch Add</el-button
        >
        <el-button v-auth="'export'" type="primary" :icon="Download" plain disabled
          >Export</el-button
        >
        <el-button type="danger" :icon="Delete" plain disabled> Batch Delete </el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="editEmployee(scope.row.id)"
          >Edit</el-button
        >
        <el-button type="primary" link :icon="Delete" @click="openDeleteConfirm(scope.row.id)"
          >Delete</el-button
        >
      </template>
    </Table>
    <Drawer ref="drawerRef" />
  </div>
  <!-- Delete Confirmation Dialog -->
  <el-dialog
    v-model="deleteConfirmVisible"
    title="Delete Confirmation"
    width="30%"
    @close="deleteConfirmVisible = false"
  >
    <span>Are you sure you want to delete thi employee?</span>
    <template #footer>
      <el-button @click="deleteConfirmVisible = false">No</el-button>
      <el-button type="danger" @click="handleDelete">Yes, Delete</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import { reactive, h, onMounted, ref } from 'vue'
import Table from '@/components/Table/index.vue'
import Drawer from '@/components/Drawer/index.vue'
import FormEditContainer from '@/views/organization/employee-management/components/FormEditContainer.vue'
import FormAddContainer from '@/views/organization/employee-management/components/FormAddContainer.vue'
import { ElTag, ElText, ElNotification } from 'element-plus'
import { CirclePlus, Delete, EditPen, Download, Upload } from '@element-plus/icons-vue'
import { useEmployeeList } from '@/modules/employee/employeeList.hook'
import { useEmployee } from '@/modules/employee/employee.hook'
import { useDdl } from '@/modules/ddl/ddl.hook.ts'

import type { ColumnProps } from '@/components/Table/interface'
import type { EmployeeList } from '@/modules/employee/employee.types'

const { getDivisionDdl, getRoleDdl, divisionDdl, roleDdl, generalStatus } = useDdl()
const { deleteEmployee, isDeleteEmployeeSuccess, deleteEmployeeErrorMessage } = useEmployee()
const { fetchList } = useEmployeeList()

const deleteConfirmVisible = ref(false)
const selectedId = ref(0)

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
    label: 'Search',
    search: {
      el: 'input',
      key: 'keyword',
      order: 4,
      span: 1,
      props: { placeholder: 'Please Enter Employee Name or ID' }
    },
    render: scope => {
      return h(ElText, { type: 'primary' }, scope.row.name)
    }
  },
  {
    prop: 'division',
    label: 'Division',
    enum: divisionDdl,
    search: { el: 'select', props: { filterable: true }, key: 'division_id', order: 1 }
  },
  {
    prop: 'role',
    label: 'Role',
    enum: roleDdl,
    search: { el: 'select', props: { filterable: true }, key: 'role_id', order: 2 }
  },
  {
    prop: 'is_active',
    label: 'Status',
    enum: generalStatus,
    width: 90,
    search: { el: 'select', props: { filterable: true }, span: 1, key: 'is_active', order: 3 },
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

const onInit = () => {
  getDivisionDdl()
  getRoleDdl()
}

const drawerRef = ref<InstanceType<typeof Drawer> | null>(null)

const editEmployee = (id: number) => {
  drawerRef.value?.openDrawer({
    title: 'Edit Employee',
    component: FormEditContainer,
    props: { id }
  })
}

const addEmployee = () => {
  drawerRef.value?.openDrawer({
    title: 'Add Employee',
    component: FormAddContainer,
    props: {}
  })
}

const openDeleteConfirm = (id: number) => {
  deleteConfirmVisible.value = true
  selectedId.value = id
}

const handleDelete = async () => {
  await deleteEmployee(selectedId.value)
  if (!isDeleteEmployeeSuccess.value) {
    ElNotification({
      title: 'Failed Delete Employee Data',
      type: 'error',
      message: deleteEmployeeErrorMessage.value
    })

    return
  }

  ElNotification({ title: 'Successfully Delete Employee Data', type: 'success' })
  deleteConfirmVisible.value = false
  await fetchList()
}

onMounted(onInit)
</script>
