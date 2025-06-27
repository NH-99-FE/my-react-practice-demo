interface IPageParams {
  pageNum: number
  pageSize: number
}

export interface ResultDate<T> {
  list: Array<T>
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}

export interface ILoginParams {
  username: string
  password: string
}

// 部门模块
export interface IDeptSearchParams {
  deptName: string
}
export interface IDept {
  _id: string
  createTime: string
  updateTime: string
  deptName: string
  parentId: string
  userName: string
  children: Array<IDept>
}

// 用户模块
// 用户列表
export interface IUser {
  _id: string
  userName: string
  userId: number
  userEmail: string
  deptId: string
  job: string
  mobile: string
  role: number
  roleList: string
  state: number
  userImg: string
  sex: number
  deptName: string
  createId: number
  createTime: string
}

export interface IUserSearchParams extends IPageParams {
  userId?: string
  userName?: string
  state?: number
}

// 创建用户
export interface IUserCreateParams {
  userName: string
  userEmail: string
  deptId: string
  job?: string
  mobile?: string
  state?: number
  role: number
  roleList: string
}
export interface IUserUpdateParams extends IUserCreateParams {
  userId?: string
}

// 菜单模块

// 创建菜单参数
export interface IMenuCreateParams {
  menuName: string
  icon?: string
  path: string
  menuType: number // 菜单类型 1:菜单 2:按钮 3:页面
  menuCode: string // 菜单权限标示
  parentId: string
  component: string // 组件名称
  menuStatus: number // 菜单状态: 1:启用 2:禁用
}

// 更新菜单参数
export interface IMenuUpdateParams extends IMenuCreateParams {
  _id: string
}

// 菜单List
export interface IMenu extends IMenuCreateParams {
  _id: string
  createTime: string
  buttons?: Array<IMenu>
  children?: Array<IMenu>
}

// 搜索
export interface IMenuSearchParams {
  menuName: string
  menuState: number
}

/*
 * 角色模块
 */
export interface IRole {
  _id: string
  roleName: string
  remark: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
  createTime: string
  updateTime: string
}

export interface IRoleSearchParams extends IPageParams {
  roleName?: string
}
export interface IRoleCreateParams {
  roleName: string
  remark: string
}

export interface IRoleUpdateParams extends IRoleCreateParams {
  _id: string
}

export interface IPermission {
  _id: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
}

/**
 * dashboard模块
 */
export interface IReportData {
  codeLine: number
  salary: number
  icafeCount: number
  projectNum: number
}

export interface ILineData {
  label: Array<string>
  order: Array<number>
  money: Array<number>
}

export interface IPieData {
  value: number
  name: string
}

export interface IRadarData {
  indicator: Array<{
    name: string
    max: number
  }>
  data: {
    value: Array<number>
    name: string
  }
}
