<template>
  <el-dialog v-model="dialogVisible" title="User Information" width="500px" draggable>
    <el-form :model="form" label-width="100px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="userInfo.email" disabled />
      </el-form-item>
      <el-form-item label="Role">
        <el-input v-model="userInfo.role" disabled />
      </el-form-item>
      <el-form-item label="Division">
        <el-input v-model="userInfo.division" disabled />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </span>
    </template>

    <!-- Cancel Confirmation Dialog -->
    <el-dialog
      v-model="cancelConfirmVisible"
      title="Discard changes?"
      width="30%"
      @close="cancelConfirmVisible = false"
    >
      <span>Changes to the name field will be lost. Are you sure you want to cancel?</span>
      <template #footer>
        <el-button @click="cancelConfirmVisible = false">No</el-button>
        <el-button type="danger" @click="confirmCancel">Yes, Discard</el-button>
      </template>
    </el-dialog>

    <!-- Submit Confirmation Dialog -->
    <el-dialog
      v-model="submitConfirmVisible"
      title="Confirm Submission"
      width="30%"
      @close="submitConfirmVisible = false"
    >
      <span>Are you sure you want to submit the changes?</span>
      <template #footer>
        <el-button @click="submitConfirmVisible = false">No</el-button>
        <el-button type="primary" :loading="loading" @click="confirmSubmit">Yes, Submit</el-button>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useUser } from '@/modules/user/user.hook'

const dialogVisible = ref(false)
const cancelConfirmVisible = ref(false)
const submitConfirmVisible = ref(false)

const {
  userInfo,
  updateUserInfoForm: form,
  updateUserInfo,
  isLoadingUpdateUserInfo: loading
} = useUser()

const openDialog = () => {
  dialogVisible.value = true
  form.name = userInfo.name
}

const handleCancel = () => {
  if (form.name !== userInfo.name) {
    cancelConfirmVisible.value = true
  } else {
    dialogVisible.value = false
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  dialogVisible.value = false
}

const handleSubmit = () => {
  submitConfirmVisible.value = true
}
const confirmSubmit = async () => {
  const result = await updateUserInfo()

  if (result.success) {
    ElNotification({ title: 'Successfully Update User Information', type: 'success' })
    submitConfirmVisible.value = true
    dialogVisible.value = false
  } else {
    ElNotification({
      title: 'Failed Update User Information',
      type: 'error',
      message: result.errorMessage
    })
  }
}

defineExpose({ openDialog })
</script>
