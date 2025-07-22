import { ElNotification } from 'element-plus'

export const checkStatus = (status: number) => {
  switch (status) {
    // 400 and 401 intentionally skipped, handled elsewhere
    case 400:
    case 401:
      break

    case 403:
      ElNotification({
        title: 'Forbidden',
        message: 'You do not have permission to access!',
        type: 'error'
      })
      break

    case 404:
      ElNotification({
        title: 'Not Found',
        message: 'Resource not found!',
        type: 'error'
      })
      break

    case 405:
      ElNotification({
        title: 'Method Not Allowed',
        message: 'The request method is incorrect! Please try again later',
        type: 'error'
      })
      break

    case 408:
      ElNotification({
        title: 'Request Timeout',
        message: 'Request timeout! Please try again later',
        type: 'error'
      })
      break

    case 500:
      ElNotification({
        title: 'Server Error',
        message: 'An internal server error occurred.',
        type: 'error'
      })
      break

    case 502:
      ElNotification({
        title: 'Gateway Error',
        message: 'Bad gateway. Please try again later.',
        type: 'error'
      })
      break

    case 503:
      ElNotification({
        title: 'Service Unavailable',
        message: 'Service is currently unavailable.',
        type: 'error'
      })
      break

    case 504:
      ElNotification({
        title: 'Gateway Timeout',
        message: 'Gateway timed out. Please try again.',
        type: 'error'
      })
      break

    default:
      console.warn('Unhandled HTTP status:', status)
      ElNotification({
        title: 'Failed Request',
        message: 'An unknown error occurred.',
        type: 'error'
      })
      break
  }
}
