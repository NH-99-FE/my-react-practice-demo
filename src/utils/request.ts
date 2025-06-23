import axios from 'axios'
import { message } from 'antd'

const url = import.meta.env.VITE_BASE_URL

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
  timeoutErrorMessage: '请求超时',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'X-Requested-With': 'XMLHttpRequest',
  },
})

instance.interceptors.request.use(
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
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, body?: object): Promise<T> {
    return instance.post(url, body)
  },
  put<T>(url: string, body?: object): Promise<T> {
    return instance.put(url, body)
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return instance.delete(url, { params })
  },
}
