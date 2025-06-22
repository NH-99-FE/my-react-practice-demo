import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import storage from '../../utils/storage.ts'
import useStore from '../../store'

const items: MenuProps['items'] = [
  {
    key: 'email',
    label: '邮箱：123@qq.com',
  },
  {
    key: 'logout',
    label: '退出',
  },
]
const onClick = ({ key }: { key: string }) => {
  if (key === 'logout') {
    // 退出登录
    storage.remove('token')
    window.location.href = '/login'
  }
}
const NavHeader = () => {
  const { collapsed, updateCollapsed } = useStore()

  const toggleCollapsed = () => {
    updateCollapsed()
  }

  return (
    <div className="flex h-15 items-center justify-between bg-white px-5 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div>
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className="mr-2 cursor-pointer text-lg">jack</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
