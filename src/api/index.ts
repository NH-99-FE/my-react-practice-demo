import request from '../utils/request.ts'
import type {
  IMenuCreateParams,
  IDept,
  ILoginParams,
  IMenu,
  IMenuSearchParams,
  IMenuUpdateParams,
  IUser,
  IUserCreateParams,
  IUserUpdateParams,
  IUserSearchParams,
  ResultDate,
  IReportData,
  ILineData,
  IPieData,
  IRadarData,
} from '../types/api.ts'
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

  /**
   * 用户模块
   */

  // 获取当前用户信息

  getUser() {
    return request.get<IUser>('/users/getUserInfo')
  },

  // 获取用户列表
  getUserList(params?: IUserSearchParams) {
    return request.get<ResultDate<IUser>>('/users/list', params)
  },

  // 获取所有用户信息
  getAllUserList() {
    return request.get<IUser[]>('/users/all/list')
  },

  createUser(params: IUserCreateParams) {
    return request.post('/users/create', params)
  },

  updateUser(params: IUserUpdateParams) {
    return request.post('/users/edit', params)
  },

  deleteUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  /**
   * 菜单模块
   */

  // 创建菜单
  createMenu(params: IMenuCreateParams) {
    return request.post('/menu/create', params)
  },

  // 更新菜单
  updateMenu(params: IMenuUpdateParams) {
    return request.post('/menu/edit', params)
  },

  // 获取菜单列表
  getMenuList(params?: IMenuSearchParams) {
    return request.get<IMenu[]>('/menu/list', params)
  },

  // 删除菜单
  deleteMenu(params: { _id: string }) {
    return request.post('/menu/delete', params)
  },

  /**
   * dashboard模块
   */
  getReportData() {
    return request.get<IReportData>('/order/dashboard/getReportData')
  },

  getLineData() {
    return request.get<ILineData>('/order/dashboard/getLineData')
  },

  getPieCityData() {
    return request.get<IPieData>('/order/dashboard/getPieCityData')
  },

  getPieAgeData() {
    return request.get<IPieData>('/order/dashboard/getPieCityData')
  },

  getRadarData() {
    return request.get<IRadarData>('/order/dashboard/getRadarData')
  },
}
