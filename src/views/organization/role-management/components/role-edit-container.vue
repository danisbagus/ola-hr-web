<template>
  <el-skeleton v-if="isLoadingGetDetail || !roleDetail" animated>
    <template #template>
      <div v-for="i in 11" :key="i" class="skeleton-form-item">
        <el-skeleton-item variant="text" class="skeleton-label" />
        <el-skeleton-item variant="input" class="skeleton-input" />
      </div>
    </template>
  </el-skeleton>

  <Form
    v-else
    :detail="roleDetail"
    :form="roleForm"
    @cancel="handleCancel"
    @submit="handleSubmit"
    mode="edit"
  />

  <!-- Cancel Confirmation Dialog -->
  <el-dialog
    v-model="cancelConfirmVisible"
    title="Discard changes?"
    width="30%"
    @close="cancelConfirmVisible = false"
  >
    <span>Changes to the field will be lost. Are you sure you want to cancel?</span>
    <template #footer>
      <el-button @click="cancelConfirmVisible = false">No</el-button>
      <el-button type="danger" @click="confirmCancel">Yes, Discard</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { cloneDeep, isEqual } from 'lodash-es'
import type { ReqRole } from '@/modules/role/role.types'
import Form from '@/views/organization/role-management/components/role-form.vue'
import { useRole } from '@/modules/role/role.hook'
import { useModule } from '@/modules/module/module.hook'

const {
  getRoleList,
  getRoleDetail,
  updateRole,
  resetRoleDetail,
  roleDetail,
  roleForm,
  isLoadingGetDetail,
  isSuccessGetDetail,
  isSuccessUpdate
} = useRole()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

const originalData = ref<ReqRole | null>(null)

const cancelConfirmVisible = ref(false)

function isChanged() {
  return !isEqual(roleForm, originalData.value)
}

const handleCancel = async () => {
  if (isChanged()) {
    cancelConfirmVisible.value = true
  } else {
    emit('close')
    resetRoleDetail()
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  emit('close')
  resetRoleDetail()
}

const handleSubmit = async (data: any) => {
  await updateRole(props.id)
  if (isSuccessUpdate.value) {
    resetRoleDetail()
    emit('close')
    await getRoleList()
  }
}

const handleGetRoleDetail = async (id: number) => {
  resetRoleDetail()

  await nextTick()
  await getRoleDetail(id)

  if (isSuccessGetDetail.value) {
    originalData.value = cloneDeep(roleForm)
  }
}

watch(() => props.id, handleGetRoleDetail, { immediate: true })
</script>

<style scoped>
.skeleton-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.skeleton-label {
  width: 140px;
  margin-right: 16px;
}
.skeleton-input {
  flex: 1;
  height: 32px;
}
</style>
