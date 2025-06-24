import request from '../utils/request.ts'
import type {
  IRole,
  IRoleSearchParams,
  IPermission,
  IRoleCreateParams,
  IRoleUpdateParams,
  ResultDate,
} from '../types/api.ts'

export default {
  // 获取角色列表
  getRoleList(params: IRoleSearchParams) {
    return request.get<ResultDate<IRole>>('/roles/list', params)
  },
  // 创建角色
  createRole(params: IRoleCreateParams) {
    return request.post<IRole[]>('/roles/create', params)
  },
  // 删除角色
  deleteRole(params: { _id: string }) {
    return request.post('/roles/delete', params)
  },
  // 更新角色
  updateRole(params: IRoleUpdateParams) {
    return request.post<IRole[]>('/roles/edit', params)
  },
  // 更新权限
  updatePermission(params: IPermission) {
    return request.post('/roles/update/permission', params)
  },
}
