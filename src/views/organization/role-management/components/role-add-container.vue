<template>
  <Form :detail="{}" :form="roleForm" @cancel="handleCancel" @submit="handleSubmit" mode="add" />

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
import { ref, computed, toRaw } from 'vue'
import Form from '@/views/organization/role-management/components/role-form.vue'
import { useRole } from '@/modules/role/role.hook'
import { isEmptyValue } from '@/shared/utils/checker/index'

const { getRoleList, createRole, roleForm, isSuccessCreate } = useRole()

const emit = defineEmits(['close'])

const cancelConfirmVisible = ref(false)

const isFormFilled = computed(() => {
  return Object.values(toRaw(roleForm)).some(v => !isEmptyValue(v))
})

const handleCancel = async () => {
  if (isFormFilled.value) {
    cancelConfirmVisible.value = true
  } else {
    emit('close')
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  emit('close')
}

const handleSubmit = async () => {
  await createRole()
  if (isSuccessCreate.value) {
    emit('close')
    await getRoleList()
  }
}
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
