import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '',
  timeout: 3000,
  timeoutErrorMessage: '请求超时',
  withCredentials: true,
})

instance.interceptors.response.use(
  config => {
    // TODO: 请求拦截器
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code === 401) {
      window.location.href = '/login'
    } else if (data.code !== 200) {
      message.error(data.msg)
    }
    return data.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  get: (url: string, params?: object) => {
    return instance.get(url, { params })
  },
  post: (url: string, body?: object) => {
    return instance.post(url, body)
  },
  put: (url: string, body?: object) => {
    return instance.put(url, body)
  },
  delete: (url: string, params?: object) => {
    return instance.delete(url, { params })
  },
}
