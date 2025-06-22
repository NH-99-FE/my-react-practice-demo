import { createBrowserRouter } from 'react-router'
import Login from '../pages/login'
import Welcome from '../pages/welcome'
import LayoutPage from '../layout'
const router = createBrowserRouter([
  {
    Component: LayoutPage,
    children: [
      {
        path: '/',
        Component: Welcome,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
])

export default router
