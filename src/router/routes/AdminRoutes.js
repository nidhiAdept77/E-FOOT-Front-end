import { lazy } from 'react'

const AdminRoutes = [
  // Admin Routes
  {
    path: '/layout-settings',
    component: lazy(() => import('../../views/LayoutSettings')),
    meta: {
      authRoute: true
    },
    exact: true
  }
]

export default AdminRoutes
