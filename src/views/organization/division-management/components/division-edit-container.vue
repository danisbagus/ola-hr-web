<template>
  <el-skeleton v-if="isLoadingGetDetail || !divisionDetail" animated>
    <div v-for="i in 2" :key="i" class="skeleton-form-item">
      <el-skeleton-item variant="text" class="skeleton-label" />
      <el-skeleton-item variant="input" class="skeleton-input" />
    </div>
  </el-skeleton>

  <Form
    v-else
    :detail="divisionDetail"
    :form="divisionForm"
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
import type { ReqDivision } from '@/modules/division/division.types'
import Form from '@/views/organization/division-management/components/division-form.vue'
import { useDivision } from '@/modules/division/division.hook'

const {
  getDivisionList,
  getDivisionDetail,
  updateDivision,
  resetDivisionDetail,
  divisionDetail,
  divisionForm,
  isLoadingGetDetail,
  isSuccessGetDetail,
  isSuccessUpdate
} = useDivision()

const props = defineProps<{ id: number }>()
const emit = defineEmits(['close'])

const originalData = ref<ReqDivision | null>(null)

const cancelConfirmVisible = ref(false)

function isChanged() {
  return !isEqual(divisionForm, originalData.value)
}

const handleCancel = async () => {
  if (isChanged()) {
    cancelConfirmVisible.value = true
  } else {
    emit('close')
    resetDivisionDetail()
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  emit('close')
  resetDivisionDetail()
}

const handleSubmit = async () => {
  await updateDivision(props.id)
  if (isSuccessUpdate.value) {
    resetDivisionDetail()
    emit('close')
    await getDivisionList()
  }
}

const handleGetDivisionDetail = async (id: number) => {
  resetDivisionDetail()

  await nextTick()
  await getDivisionDetail(id)

  if (isSuccessGetDetail.value) {
    originalData.value = cloneDeep(divisionForm)
  }
}

watch(() => props.id, handleGetDivisionDetail, { immediate: true })
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
