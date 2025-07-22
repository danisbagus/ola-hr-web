<template>
  <el-skeleton v-if="isLoadingGetDetail || !employeeDetail" animated>
    <template #template>
      <div v-for="i in 11" :key="i" class="skeleton-form-item">
        <el-skeleton-item variant="text" class="skeleton-label" />
        <el-skeleton-item variant="input" class="skeleton-input" />
      </div>
    </template>
  </el-skeleton>

  <Form
    v-else
    :detail="employeeDetail"
    :form="employeeForm"
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
import type { ReqEmployee } from '@/modules/employee/employee.types'
import Form from './employee-form.vue'
import { useEmployee } from '@/modules/employee/employee.hook'

const {
  getEmployeeList,
  getEmployeeDetail,
  updateEmployee,
  resetEmployeeDetail,
  employeeDetail,
  employeeForm,
  isLoadingGetDetail,
  isSuccessGetDetail,
  isSuccessUpdate
} = useEmployee()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

const originalData = ref<ReqEmployee | null>(null)

const cancelConfirmVisible = ref(false)

function isChanged() {
  return !isEqual(employeeForm, originalData.value)
}

const handleCancel = async () => {
  if (isChanged()) {
    cancelConfirmVisible.value = true
  } else {
    emit('close')
    resetEmployeeDetail()
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  emit('close')
  resetEmployeeDetail()
}

const handleSubmit = async (data: any) => {
  await updateEmployee(props.id)
  if (isSuccessUpdate.value) {
    resetEmployeeDetail()
    emit('close')
    await getEmployeeList()
  }
}

const handleGetEmployeeDetail = async (id: number) => {
  resetEmployeeDetail()

  await nextTick()
  await getEmployeeDetail(id)

  if (isSuccessGetDetail.value) {
    originalData.value = cloneDeep(employeeForm)
  }
}

watch(() => props.id, handleGetEmployeeDetail, { immediate: true })
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
