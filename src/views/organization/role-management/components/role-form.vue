<template>
  <el-container style="height: 100%">
    <el-main>
      <el-form :model="form" label-width="60" :rules="rules" ref="formRef">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Status" prop="is_active">
          <el-switch v-model="form.is_active" />
        </el-form-item>

        <el-form-item prop="module_ids">
          <div class="module-tree-wrapper">
            <div class="module-tree-header">
              <span>Module List</span>
              <el-button size="small" @click="toggleExpand">
                {{ isExpanded ? 'Collapse All' : 'Expand All' }}
              </el-button>
            </div>
            <div class="module-tree-container">
              <el-tree
                ref="moduleTreeRef"
                :data="moduleListTree"
                show-checkbox
                node-key="id"
                :props="{ label: 'title', children: 'children' }"
                :default-checked-keys="form.module_ids"
                :default-expand-all="isExpanded"
                @check="onCheckChange"
                class="custom-tree"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer height="auto">
      <div class="form-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ResRoleDetail, ReqRole } from '@/modules/role/role.types'
import { rules } from '@/views/organization/role-management/validation/rules'
import { useModule } from '@/modules/module/module.hook'

const props = defineProps<{
  detail: Partial<ResRoleDetail>
  form: Partial<ReqRole>
  mode: 'add' | 'edit'
}>()

const { moduleListTree } = useModule()

const formRef = ref<FormInstance>()
const moduleTreeRef = ref()

const checkedModuleIds = ref<number[]>(props.form.module_ids || [])
const isExpanded = ref(true)

const emit = defineEmits(['submit', 'cancel'])

const onSubmit = () => {
  emit('submit', props.form)
}
const onCancel = () => {
  emit('cancel')
}

const onCheckChange = () => {
  const tree = moduleTreeRef.value
  const checkedNodes = tree.getCheckedNodes() // get nodes, not only IDs

  // Filter only leaf nodes (nodes without children)
  const leafNodeIds = checkedNodes
    .filter((node: any) => !node.children || node.children.length === 0)
    .map((node: any) => node.id)

  checkedModuleIds.value = leafNodeIds
  props.form.module_ids = leafNodeIds // Bind back to form
}

const toggleExpand = () => {
  if (!moduleTreeRef.value) return
  const nodesMap = moduleTreeRef.value.store.nodesMap
  const expand = !isExpanded.value
  Object.values(nodesMap).forEach((node: any) => {
    node.expanded = expand
  })
  isExpanded.value = expand
}
</script>

<style scoped>
.form-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
}

.module-tree-wrapper {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 32px;
  background-color: #fafafa;
  width: 460px; /* Fixed width */
}

.module-tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.module-tree-container {
  width: 100%;
}

.custom-tree :deep(.el-tree-node__content) {
  border-radius: 4px;
  padding: 4px 8px;
}

.custom-tree :deep(.el-tree-node__content:hover) {
  background-color: #f5f7fa;
}
</style>
