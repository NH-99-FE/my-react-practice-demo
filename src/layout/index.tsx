import { Layout } from 'antd'
import { Outlet } from 'react-router'
import NavHeader from './header'
import Footer from './footer'
import useCollapsedStore from '../store'
import SiderMenu from './menu'
const { Sider } = Layout

const LayoutPage = () => {
  const { collapsed } = useCollapsedStore()
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavHeader />
        <div className="p-5 overflow-auto min-h-[calc(100vh-60px)]">
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
