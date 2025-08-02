import { reactive, ref } from 'vue'
import { useUserStore } from '@/modules/user/user.store'
import { loginApi } from '@/modules/auth/auth.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqLoginParams } from '@/modules/auth/auth.types'
import { useNotify } from '@/shared/hooks/notify.hook'

export const useAuth = () => {
  const userStore = useUserStore()
  const { notifyError, notifySuccess } = useNotify()

  const loginForm = reactive<ReqLoginParams>({
    email: 'danis@live.com',
    password: 'Admin123'
  })

  const isLoadingLogin = ref(false)
  const isSuccessLogin = ref(false)

  const login = async () => {
    isSuccessLogin.value = false
    isLoadingLogin.value = true
    try {
      const { data } = await loginApi({ ...loginForm })
      userStore.setToken(data.token)
      isSuccessLogin.value = true
      notifySuccess('Successfully login')
    } catch (error) {
      notifyError('Failed to login', getErrorMessage(error))
    } finally {
      isLoadingLogin.value = false
    }
  }

  return {
    login,
    loginForm,
    isLoadingLogin,
    isSuccessLogin
  }
}
