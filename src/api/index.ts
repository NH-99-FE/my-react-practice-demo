import request from '../utils/request.ts'
import type { IDept, ILoginParams, IUser } from '../types/api.ts'
import type { IDeptSearchParams } from '../types/api.ts'

export default {
  login(params: ILoginParams) {
    return request.post('/users/login', params)
  },

  // 获取部门数据
  getDeptmentList(params?: IDeptSearchParams) {
    return request.get<IDept[]>('/dept/list', params)
  },

  // 创建部门
  createDept(params?: IDept) {
    return request.post('/dept/create', params)
  },

  // 修改部门
  updateDept(params?: IDept) {
    return request.post('/dept/edit', params)
  },

  // 删除部门
  deleteDept(params: { _id: string }) {
    return request.post('/dept/delete', params)
  },

  // 获取用户列表
  getUserList() {
    return request.get('/users/list')
  },

  // 获取所有用户信息
  getAllUserList() {
    return request.get<IUser[]>('/users/all/list')
  },
}
