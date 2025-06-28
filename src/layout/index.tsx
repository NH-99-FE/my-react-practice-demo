import { Layout } from 'antd'
import { Navigate, Outlet } from 'react-router'
import NavHeader from './header'
import Footer from './footer'
import useStore from '../store'
import SiderMenu from './menu'
import api from '../api'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router'
import { useLocation } from 'react-router'
import { Content } from 'antd/es/layout/layout'

const LayoutPage = () => {
  const { collapsed, updateUserInfo } = useStore()
  const { Sider } = Layout
  const { pathname } = useLocation()
  const { menuPathList } = useLoaderData()

  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUser()
    updateUserInfo(data)
  }

  console.log(menuPathList)

  const staticPathList = ['/welcome', '/403', '/404']
  if (!menuPathList.includes(pathname) && !staticPathList.includes(pathname)) {
    return <Navigate to="/403" />
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavHeader />
        <Content style={{ overflow: 'auto', height: 'calc(100vh - 60px)', padding: '20px' }}>
          <div>
            <Outlet />
          </div>
          <Footer />
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayoutPage
