<template>
  <el-skeleton v-if="isLoadingGetEmployeeDetail || !employeeDetail" animated>
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
    :form="updateEmployeeForm"
    @cancel="handleCancel"
    @submit="handleSubmit"
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
import Form from './Form.vue'
import { ElNotification } from 'element-plus'
import { useEmployee } from '@/modules/employee/employee.hook'
import { useEmployeeList } from '@/modules/employee/employeeList.hook'
import type { ReqUpdateEmployee } from '@/modules/employee/employee.types'

const {
  employeeDetail,
  getEmployeeDetail,
  updateEmployee,
  resetEmployeeDetail,
  updateEmployeeForm,
  isLoadingGetEmployeeDetail,
  isGetEmployeeDetailSuccess,
  isUpdateEmployeeSuccess,
  getEmployeeDetailErrorMessage,
  updateEmployeeErrorMessage
} = useEmployee()

const { fetchList } = useEmployeeList()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

const originalData = ref<ReqUpdateEmployee | null>(null)

const cancelConfirmVisible = ref(false)

function isChanged() {
  return !isEqual(updateEmployeeForm, originalData.value)
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
  if (!isUpdateEmployeeSuccess.value) {
    ElNotification({
      title: 'Failed Update Employee Data',
      type: 'error',
      message: updateEmployeeErrorMessage.value
    })

    return
  }

  ElNotification({ title: 'Successfully Change Employee Data', type: 'success' })
  resetEmployeeDetail()
  emit('close')

  await fetchList()
}

const handleGetEmployeeDetail = async (id: number) => {
  resetEmployeeDetail()

  await nextTick()
  await getEmployeeDetail(id)

  if (!isGetEmployeeDetailSuccess.value) {
    ElNotification({
      title: 'Failed get employee data',
      type: 'error',
      message: getEmployeeDetailErrorMessage.value
    })

    return
  }

  originalData.value = cloneDeep(updateEmployeeForm)
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
