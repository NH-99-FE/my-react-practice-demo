// 日期格式化
export function formatDate(isoString: string): string {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function formatState(state: number) {
  if (state === 1) {
    return '在职'
  } else if (state === 2) {
    return '试用期'
  } else {
    return '离职'
  }
}
