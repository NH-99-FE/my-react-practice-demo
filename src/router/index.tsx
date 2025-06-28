import { createBrowserRouter, Navigate } from 'react-router'
import Login from '../pages/login'
import LayoutPage from '../layout'
import AuthLoader from './AuthLoader.ts'

const router = createBrowserRouter([
  {
    id: 'layout',
    Component: LayoutPage,
    loader: async () => {
      return AuthLoader()
    },
    children: [
      {
        path: '/welcome',
        lazy: async () => ({ Component: (await import('../pages/welcome')).default }),
      },
      {
        path: 'dashboard',
        lazy: async () => ({ Component: (await import('../pages/dashboard')).default }),
      },
      {
        path: 'userList',
        lazy: async () => ({ Component: (await import('../pages/user')).default }),
      },
      {
        path: 'deptList',
        lazy: async () => ({ Component: (await import('../pages/dept')).default }),
      },
      {
        path: 'menuList',
        lazy: async () => ({ Component: (await import('../pages/menu')).default }),
      },
      {
        path: 'roleList',
        lazy: async () => ({ Component: (await import('../pages/role')).default }),
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: () => <Navigate to="/welcome" replace />,
  },
  {
    path: '/403',
    lazy: async () => ({ Component: (await import('../pages/403.tsx')).default }),
  },
  {
    path: '*',
    lazy: async () => ({ Component: (await import('../pages/NotFound.tsx')).default }),
  },
])

export default router
