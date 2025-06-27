import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { type MenuProps, Switch } from 'antd'
import { Button, Dropdown } from 'antd'
import storage from '../../utils/storage.ts'
import useStore from '../../store'
import { useEffect } from 'react'

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

const NavHeader = () => {
  const { collapsed, updateCollapsed, currentTheme, setTheme } = useStore()

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [currentTheme])

  const onClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // 退出登录
      storage.remove('token')
      window.location.href = '/login'
    }
  }

  const toggleCollapsed = () => {
    updateCollapsed()
  }

  const handleSwitch = () => {
    if (currentTheme === 'light') {
      setTheme('dark')
      storage.set('theme', 'dark')
    } else {
      setTheme('light')
      storage.set('theme', 'light')
    }
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
      <div className="flex items-center justify-between">
        <Switch
          onChange={handleSwitch}
          style={{ marginRight: 10 }}
          checked={currentTheme === 'dark'}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className="mr-2 cursor-pointer text-lg">jack</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
