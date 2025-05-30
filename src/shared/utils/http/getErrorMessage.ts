export const getErrorMessage = (err: any): string => {
  const status = err.response?.status
  const message = err.response?.data?.message
  switch (status) {
    case 400:
      return message || 'Failed request! Please try again later'
    case 401:
      return message || 'Invalid token! Please log in again'
    default:
      return 'Failed request!'
  }
}
