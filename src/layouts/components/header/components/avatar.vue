<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img
        src="https://res.cloudinary.com/matchoshop/image/upload/v1747178491/avatar-olahr.png"
        alt="avatar"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('userInfoRef')">
          <el-icon><User /></el-icon>User Info
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>Change Password
        </el-dropdown-item>
        <el-dropdown-item divided @click="logoutConfirmVisible = true">
          <el-icon><SwitchButton /></el-icon>Logout
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- infoDialog -->
  <UserInfoDialog ref="userInfoRef"></UserInfoDialog>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
  <!-- logoutConfirmDialog -->
  <el-dialog
    v-model="logoutConfirmVisible"
    title="Do you want to logout?"
    width="500px"
    @close="logoutConfirmVisible = false"
  >
    <template #footer>
      <el-button @click="logoutConfirmVisible = false">No</el-button>
      <el-button type="warning" @click="handleLogout">Yes, Logout</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LOGIN_URL } from '@/config'
import { useRouter } from 'vue-router'
import { useUser } from '@/modules/user/user.hook'
import { ElNotification } from 'element-plus'
import UserInfoDialog from './user-info-dialog.vue'
import PasswordDialog from './password-dialog.vue'

const router = useRouter()

const { setToken } = useUser()

const logoutConfirmVisible = ref(false)

// 退出登录
const handleLogout = () => {
  // Clear Token
  setToken('')
  // Redirect to Login Page
  router.replace(LOGIN_URL)
  // Show Notification
  ElNotification({ title: 'Successfully Logout', type: 'success' })
  // Close Dialog
  logoutConfirmVisible.value = false
}

// Open Dialog to Change Password or User Info
const userInfoRef = ref<InstanceType<typeof UserInfoDialog> | null>(null)
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null)
const openDialog = (ref: string) => {
  if (ref == 'userInfoRef') userInfoRef.value?.openDialog()
  if (ref == 'passwordRef') passwordRef.value?.openDialog()
}
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
