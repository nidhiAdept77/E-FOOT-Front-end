import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/Dashboard')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile')),
    meta: {
      authRoute: true
    }
  }
]

export default DashboardRoutes
