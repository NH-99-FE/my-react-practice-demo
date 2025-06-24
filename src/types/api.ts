interface IPageParams {
  pageNum: number
  pageSize: number
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
export interface IUser {
  _id: string
  userName: string
  userId: string
  userEmail: string
}

// 菜单模块

// 创建菜单参数
export interface ICreateMenuParams {
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
export interface IUpdateMenuParams extends ICreateMenuParams {
  _id: string
}

// 菜单List
export interface IMenu extends ICreateMenuParams {
  _id: string
  createTime: string
  buttons?: Array<IMenu>
  children?: Array<IMenu>
}

// 搜索参数
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
