import request from '../utils/request.ts'
import type { IDept, ILoginParams } from '../types/api.ts'
import type { IDeptSearchParams } from '../types/api.ts'

export default {
  login(params: ILoginParams) {
    return request.post('/users/login', params)
  },

  // 获取部门数据
  getDeptmentList(params?: IDeptSearchParams) {
    return request.get<IDept[]>('/dept/list', params)
  },
}
