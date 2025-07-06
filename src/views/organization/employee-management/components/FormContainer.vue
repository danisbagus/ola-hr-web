<template>
  <el-skeleton v-if="isLoadingGetEmployeeDetail || !employeeDetail" animated>
    <template #template>
      <div v-for="i in 11" :key="i" class="skeleton-form-item">
        <el-skeleton-item variant="text" class="skeleton-label" />
        <el-skeleton-item variant="input" class="skeleton-input" />
      </div>
    </template>
  </el-skeleton>

  <Form v-else :formData="employeeDetail" @cancel="handleCancel" @submit="handleSubmit" />

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
import Form from './Form.vue'
import { ElNotification } from 'element-plus'
import { useEmployee } from '@/modules/employee/employee.hook'

const {
  employeeDetail,
  getEmployeeDetail,
  resetEmployeeDetail,
  isLoadingGetEmployeeDetail,
  isGetEmployeeDetailSuccess,
  getEmployeeDetailErrorMessage
} = useEmployee()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

// todo: next compare with original data for confirmation logic
const formData = ref<any>(null)
const originalData = ref<any>(null)

const cancelConfirmVisible = ref(false)

function isChanged() {
  return JSON.stringify(formData.value) !== JSON.stringify(originalData.value)
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
  try {
    // Simulasi update
    await new Promise(r => setTimeout(r, 500))

    // Normally: await axios.put(`/api/employees/${data.id}`, data)
    ElNotification({ title: 'Successfully Change Employee Data', type: 'success' })
    emit('close')
    resetEmployeeDetail()
  } catch (err) {
    ElNotification({ title: 'Failed Change Employee Data', type: 'success' })
  }
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
