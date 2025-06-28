import { Breadcrumb as Bread } from 'antd'
import { useLocation } from 'react-router'
import { useState, type ReactNode, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router'
import { getBreadItems } from '../../utils'

const BreadCrumb = () => {
  const { pathname } = useLocation()
  const [breadItems, setBreadItems] = useState<(string | ReactNode)[]>([])
  const { menuList } = useRouteLoaderData('layout')
  useEffect(() => {
    const breadItems = getBreadItems(menuList, pathname, [])
    setBreadItems([<a href="/welcome">首页 </a>, ...breadItems])
  }, [pathname])
  return <Bread items={breadItems.map(item => ({ title: item }))} />
}

export default BreadCrumb
