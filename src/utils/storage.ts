export default {
  get: (key: string) => {
    const value = localStorage.getItem(key)
    if (!value) {
      return null
    }
    return JSON.parse(value)
  },
  set: (key: string, value: unknown) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    return localStorage.removeItem(key)
  },
  clear: () => {
    return localStorage.clear()
  },
}
