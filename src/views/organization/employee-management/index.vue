<template>
  <div class="table-box">
    <Table ref="table" :columns="columns" :use-list-composable="useEmployeeList">
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" disabled>Add</el-button>
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
        <el-button type="primary" link :icon="View">View</el-button>
        <el-button type="primary" link :icon="EditPen">Edit</el-button>
        <el-button type="primary" link :icon="Delete">Delete</el-button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="tsx">
import { reactive, h, onMounted } from 'vue'
import type { EmployeeList } from '@/modules/employee/employee.types'
import Table from '@/components/Table/index.vue'
import { ElTag, ElText } from 'element-plus'
import { CirclePlus, Delete, EditPen, Download, Upload, View } from '@element-plus/icons-vue'
import { useEmployeeList } from '@/modules/employee/employeeList.hook'
import { useDdl } from '@/modules/ddl/ddl.hook '
import type { ColumnProps } from '@/components/Table/interface'

const { getDivisionDdl, getRoleDdl, divisionDdl, roleDdl, generalStatus } = useDdl()

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

onMounted(onInit)
</script>
