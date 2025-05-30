import { reactive, ref } from 'vue'
import { useUserStore } from '@/modules/user/user.store'
import { getUserInfoApi, updateUserInfoApi, updatePasswordApi } from '@/modules/user/user.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqUserInfo, ReqUpdatePassword } from '@/modules/user/user.types'

export function useUser() {
  const userStore = useUserStore()

  const updateUserInfoForm = reactive<ReqUserInfo>({
    name: ''
  })

  const updatePasswordForm = reactive<ReqUpdatePassword>({
    currentPassword: '',
    confirmPassword: '',
    newPassword: ''
  })

  const isLoadingGetUserInfo = ref(false)
  const isLoadingUpdateUserInfo = ref(false)
  const isLoadingUpdatePassword = ref(false)

  const getUserInfo = async () => {
    isLoadingGetUserInfo.value = true

    try {
      const { data } = await getUserInfoApi()
      userStore.setUserInfo(data)
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingGetUserInfo.value = false
    }
  }

  const updateUserInfo = async () => {
    isLoadingUpdateUserInfo.value = true
    try {
      await updateUserInfoApi({ ...updateUserInfoForm })
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingUpdateUserInfo.value = false
    }
  }

  const updatePassword = async () => {
    isLoadingUpdatePassword.value = true
    try {
      await updatePasswordApi({ ...updatePasswordForm })
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingUpdatePassword.value = false
    }
  }

  const setToken = (token: string) => {
    userStore.setToken(token)
  }

  return {
    userInfo: userStore.userInfo,
    token: userStore.token,
    getUserInfo,
    updateUserInfo,
    updatePassword,
    setToken,
    updateUserInfoForm,
    updatePasswordForm,
    isLoadingGetUserInfo,
    isLoadingUpdateUserInfo,
    isLoadingUpdatePassword
  }
}
