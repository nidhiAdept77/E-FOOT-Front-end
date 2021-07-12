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
  },
  {
    path: '/layout-settings/:id',
    component: lazy(() => import('../../views/LayoutSettings/LayoutUpdate'))
  },
  {
    path: '/rooms',
    component: lazy(() => import('../../views/Room')),
    meta: {
      authRoute: true
    }
  }
]

export default AdminRoutes
