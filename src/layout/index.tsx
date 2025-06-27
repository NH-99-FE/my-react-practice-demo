import { Layout } from 'antd'
import { Outlet } from 'react-router'
import NavHeader from './header'
import Footer from './footer'
import useStore from '../store'
import SiderMenu from './menu'
import api from '../api'
import { useEffect } from 'react'
const { Sider } = Layout

const LayoutPage = () => {
  const { collapsed, updateUserInfo } = useStore()

  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUser()
    updateUserInfo(data)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavHeader />
        <div className="min-h-[calc(100vh-60px)] overflow-auto p-5">
          <div>
            <Outlet />
          </div>
          <Footer />
        </div>
      </Layout>
    </Layout>
  )
}
export default LayoutPage
