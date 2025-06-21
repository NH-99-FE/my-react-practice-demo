import { createBrowserRouter } from 'react-router'
import Welcome from '../pages/welcome'
const router = createBrowserRouter([
  {
    path: '/',
    Component: Welcome,
  },
])

export default router
