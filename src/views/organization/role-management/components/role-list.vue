<template>
  <DataTable ref="table" :columns="columns" :dataSource="roleList">
    <template #tableHeader="scope">
      <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="addRole">Add</el-button>
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
      <el-button type="primary" link :icon="EditPen" @click="editRole(scope.row.id)"
        >Edit</el-button
      >
      <el-button type="primary" link :icon="Delete" @click="openDeleteConfirm(scope.row.id)"
        >Delete</el-button
      >
    </template>

    <template #pagination>
      <Pagination
        :pagination-meta="roleListPagination"
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
    <span>Are you sure you want to delete this role?</span>
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
    <span>Are you sure you want to batch delete role?</span>
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
import { ElTag, ElText, ElTooltip } from 'element-plus'
import { CirclePlus, Delete, Download, EditPen } from '@element-plus/icons-vue'

// Types
import type { ColumnProps } from '@/components/data-table/types'
import type { RoleList } from '@/modules/role/role.types'

// Internal modules
import DataTable from '@/components/data-table/index.vue'
import Pagination from '@/components/pagination/index.vue'
import Drawer from '@/components/drawer/index.vue'
import RoleAddContainer from '@/views/organization/role-management/components/role-add-container.vue'
import RoleEditContainer from '@/views/organization/role-management/components/role-edit-container.vue'
import { useRole } from '@/modules/role/role.hook.ts'
import { useModule } from '@/modules/module/module.hook.ts'

// Hooks
const {
  getRoleList,
  deleteRole,
  deleteBatchRole,
  setPage,
  setSize,
  roleList,
  roleListPagination,
  isSuccessDelete,
  isSuccessDeleteBatch
} = useRole()

const { getModuleList } = useModule()

const drawerRef = ref<InstanceType<typeof Drawer> | null>(null)

const deleteConfirmVisible = ref(false)
const deleteBatchConfirmVisible = ref(false)
const selectedId = ref(0)
const selectedIds = ref<number[]>([])

const addRole = () => {
  drawerRef.value?.openDrawer({
    title: 'Add Role',
    component: RoleAddContainer,
    props: {}
  })
}

const editRole = (id: number) => {
  drawerRef.value?.openDrawer({
    title: 'Edit Role',
    component: RoleEditContainer,
    props: { id }
  })
}

const openDeleteConfirm = (id: number) => {
  deleteConfirmVisible.value = true
  selectedId.value = id
}

const handleDelete = async () => {
  await deleteRole(selectedId.value)
  if (isSuccessDelete.value) {
    deleteConfirmVisible.value = false
    await getRoleList()
  }
}

const openDeleteBatchConfirm = (ids: number[]) => {
  deleteBatchConfirmVisible.value = true
  selectedIds.value = ids
}

const handleDeleteBatch = async () => {
  await deleteBatchRole(selectedIds.value)
  if (isSuccessDeleteBatch.value) {
    deleteBatchConfirmVisible.value = false
    await getRoleList()
  }
}

const columns = reactive<ColumnProps<RoleList>[]>([
  { type: 'selection', fixed: 'left', width: 50 },
  {
    prop: 'name',
    label: 'Role Name',
    width: 150,
    render: scope => {
      return h(ElText, { type: 'primary' }, scope.row.name)
    }
  },
  {
    prop: 'modules',
    label: 'Modules',
    width: 360,
    render: scope => {
      const modules = scope.row.modules || []
      const visibleModules = modules.slice(0, 2) // tampilkan 2 tag pertama
      const hiddenModules = modules.slice(2) // sisanya di tooltip

      return h('div', {}, [
        ...visibleModules.map((module: string) =>
          h(ElTag, { type: 'info', size: 'small', style: 'margin-right: 4px' }, () => module)
        ),
        hiddenModules.length > 0 &&
          h(
            ElTooltip,
            { content: hiddenModules.join(', '), placement: 'top' },
            {
              default: () =>
                h(
                  ElTag,
                  { type: 'info', size: 'small', style: 'margin-right: 4px' },
                  `+${hiddenModules.length}`
                )
            }
          )
      ])
    }
  },
  {
    prop: 'is_active',
    label: 'Status',
    width: 100,
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
  getRoleList()
  getModuleList()
})
</script>
