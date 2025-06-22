import { Layout } from 'antd'
import { Outlet } from 'react-router'
import NavHeader from './header'
import Footer from './footer'
import useStore from '../store'
import SiderMenu from './menu'
const { Sider } = Layout

const LayoutPage = () => {
  const { collapsed } = useStore()
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
