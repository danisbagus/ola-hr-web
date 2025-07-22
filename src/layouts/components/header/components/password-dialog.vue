<template>
  <el-dialog v-model="dialogVisible" title="Change Password" width="500px" draggable>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="Current Password" prop="currentPassword">
        <el-input v-model="form.currentPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="New Password" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" show-password />
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
      <span>Changes to the field will be lost. Are you sure you want to cancel?</span>
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
import { reactive, ref } from 'vue'
import { ElNotification, ElForm } from 'element-plus'
import { useUser } from '@/modules/user/user.hook'

// State
const dialogVisible = ref(false)
const cancelConfirmVisible = ref(false)
const submitConfirmVisible = ref(false)

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()

const { isLoadingUpdatePassword: loading, updatePasswordForm: form, updatePassword } = useUser()

// Validasi
const rules = reactive({
  currentPassword: [{ required: true, message: 'Please input current password', trigger: 'blur' }],
  newPassword: [{ required: true, message: 'Please input new password', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: 'Please input confirm password', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        if (value !== form.newPassword) {
          callback(new Error('Password does not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// Buka dialog
const openDialog = () => {
  dialogVisible.value = true
  form.currentPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
}

// Cancel dengan konfirmasi
const handleCancel = () => {
  if (form.currentPassword || form.newPassword || form.confirmPassword) {
    cancelConfirmVisible.value = true
  } else {
    dialogVisible.value = false
  }
}

const confirmCancel = () => {
  cancelConfirmVisible.value = false
  dialogVisible.value = false
}

// Submit form
const handleSubmit = () => {
  formRef.value?.validate(valid => {
    if (!valid) return
    submitConfirmVisible.value = true
  })
}

const confirmSubmit = async () => {
  const result = await updatePassword()

  if (result.success) {
    ElNotification({ title: 'Successfully Change Password', type: 'success' })
    submitConfirmVisible.value = true
  } else {
    ElNotification({ title: 'Successfully Change Password', type: 'success' })
  }

  submitConfirmVisible.value = false
  dialogVisible.value = false
}

// Ekspor agar parent bisa buka dialog
defineExpose({ openDialog })

// [v] templating
// [v] wording
// [v] styling
// [v] function
// integration
</script>
