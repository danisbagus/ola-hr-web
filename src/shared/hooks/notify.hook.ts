import { ElNotification } from 'element-plus'

export function useNotify() {
  const notifyError = (title: string, msg: string = '') => {
    ElNotification({
      title,
      message: msg,
      type: 'error'
    })
  }

  const notifySuccess = (title: string, msg: string = '') => {
    ElNotification({
      title,
      message: msg,
      type: 'success'
    })
  }

  return { notifyError, notifySuccess }
}
