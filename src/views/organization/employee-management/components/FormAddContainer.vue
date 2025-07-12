<template>
  <Form
    :detail="{}"
    :form="employeeForm"
    @cancel="handleCancel"
    @submit="handleSubmit"
    mode="add"
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
import { ref, computed, toRaw } from 'vue'
import Form from './Form.vue'
import { ElNotification } from 'element-plus'
import { useEmployee } from '@/modules/employee/employee.hook'
import { useEmployeeList } from '@/modules/employee/employeeList.hook'
import { isEmptyValue } from '@/shared/utils/checker/index'

const { createEmployee, employeeForm, isCreateEmployeeSuccess, createEmployeeErrorMessage } =
  useEmployee()

const { fetchList } = useEmployeeList()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

const cancelConfirmVisible = ref(false)

const isFormFilled = computed(() => {
  return Object.values(toRaw(employeeForm)).some(v => !isEmptyValue(v))
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

const handleSubmit = async (data: any) => {
  await createEmployee()
  if (!isCreateEmployeeSuccess.value) {
    ElNotification({
      title: 'Failed Add New Employee',
      type: 'error',
      message: createEmployeeErrorMessage.value
    })

    return
  }

  ElNotification({ title: 'Successfully Add New Employee', type: 'success' })
  emit('close')

  await fetchList()
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
