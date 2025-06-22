import { Menu } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PieChartOutlined,
  SolutionOutlined,
  LaptopOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import useStore from '../../store'
import { useNavigate } from 'react-router'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '/dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
  {
    key: '/user',
    label: '用户模块',
    icon: <MailOutlined />,
    children: [
      { key: '/userList', label: '用户列表', icon: <UserOutlined /> },
      { key: '/menuList', label: '菜单管理', icon: <MailOutlined /> },
      { key: '/roleList', label: '角色管理', icon: <SolutionOutlined /> },
      { key: '/deptList', label: '部门管理', icon: <LaptopOutlined /> },
    ],
  },
]

const SiderMenu = () => {
  const { collapsed, currentMenu, setCurrentMenu } = useStore()
  const navigate = useNavigate()
  const menuClick = ({ key }: { key: string }) => {
    navigate(key)
    setCurrentMenu(key)
  }
  return (
    <>
      <div className="flex items-center justify-center px-5 py-3">
        <img src="/imgs/logo.png" alt="logo" className="h-6 w-6" />
        {collapsed ? null : (
          <span className="mx-5 cursor-pointer overflow-hidden whitespace-nowrap text-gray-100 dark:text-black">
            企业中台管理
          </span>
        )}
      </div>
      <Menu
        defaultSelectedKeys={[currentMenu]}
        defaultOpenKeys={['/user']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={menuClick}
      />
    </>
  )
}

export default SiderMenu
