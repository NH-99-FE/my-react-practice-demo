import { Menu } from 'antd'
import * as Icons from '@ant-design/icons'

import type { MenuProps } from 'antd'
import useStore from '../../store'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router'
import React, { useEffect, useState } from 'react'
import type { IMenu } from '../../types/api.ts'
type MenuItem = Required<MenuProps>['items'][number]

const SiderMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [menuItem, setMenuItem] = useState<MenuItem[]>([])
  const data = useRouteLoaderData('layout')
  const { collapsed, currentTheme } = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const menuClick = ({ key }: { key: string }) => {
    navigate(key)
    setSelectedKeys([key])
  }

  useEffect(() => {
    const treeMenuList = getMenuTree(data.menuList)
    setMenuItem(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  function getItem(label: string, key: string, icon?: React.ReactNode, children?: MenuItem[]) {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem
  }

  const createIcon = (name?: string) => {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  const getMenuTree = (menuList: IMenu[], menuTree: MenuItem[] = []): MenuItem[] => {
    menuList.forEach(item => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          return menuTree.push(getItem(item.menuName, item.path, createIcon(item.icon)))
        }
        menuTree.push(
          getItem(
            item.menuName,
            item.path,
            createIcon(item.icon),
            getMenuTree(item.children || [], [])
          )
        )
      }
    })
    return menuTree
  }

  console.log('menuItem', menuItem)

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
        mode="inline"
        theme={currentTheme === 'dark' ? 'light' : 'dark'}
        inlineCollapsed={collapsed}
        items={menuItem}
        selectedKeys={selectedKeys}
        onClick={menuClick}
      />
    </>
  )
}

export default SiderMenu
