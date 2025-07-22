import { ElNotification } from 'element-plus'

export function useNotify() {
  const notifyError = (msg: string, title = 'Error') => {
    ElNotification({
      title,
      message: msg,
      type: 'error'
    })
  }

  const notifySuccess = (msg: string, title = 'Success') => {
    ElNotification({
      title,
      message: msg,
      type: 'success'
    })
  }

  return { notifyError, notifySuccess }
}
