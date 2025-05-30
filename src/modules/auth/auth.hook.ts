import { reactive, ref } from 'vue'
import { useUserStore } from '@/modules/user/user.store'
import { loginApi } from '@/modules/auth/auth.service'
import { getErrorMessage } from '@/shared/utils/http/getErrorMessage'
import type { ReqLoginParams } from '@/modules/auth/auth.types'

export const useAuth = () => {
  const userStore = useUserStore()

  const loginForm = reactive<ReqLoginParams>({
    email: '',
    password: ''
  })

  const isLoadingLogin = ref(false)

  const login = async () => {
    try {
      isLoadingLogin.value = true

      const { data } = await loginApi({ ...loginForm })

      userStore.setToken(data.token)
      return { success: true }
    } catch (error) {
      return { success: false, errorMessage: getErrorMessage(error) }
    } finally {
      isLoadingLogin.value = false
    }
  }

  return {
    isLoadingLogin,
    loginForm,
    login
  }
}
