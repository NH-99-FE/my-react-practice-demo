import { createBrowserRouter } from 'react-router'
import Login from '../pages/login'
import Welcome from '../pages/welcome'
import LayoutPage from '../layout'
import Dashboard from '../pages/dashboard'
import User from '../pages/user'
import Dept from '../pages/dept'
import Menu from '../pages/menu'
import Role from '../pages/role'

const router = createBrowserRouter([
  {
    Component: LayoutPage,
    children: [
      {
        path: '/',
        Component: Welcome,
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'userList',
        Component: User,
      },
      {
        path: 'deptList',
        Component: Dept,
      },
      {
        path: 'menuList',
        Component: Menu,
      },
      {
        path: 'roleList',
        Component: Role,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
])

export default router
