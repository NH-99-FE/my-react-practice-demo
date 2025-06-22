import { createBrowserRouter } from 'react-router'
import Login from '../pages/login'
const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
])

export default router
