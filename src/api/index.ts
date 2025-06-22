import request from '../utils/request.ts'
import type { ILoginParams } from '../types/api.ts'

export default {
  login(params: ILoginParams) {
    return request.post('/users/login', params)
  },
}
