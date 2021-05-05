import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/Dashboard')),
    meta: {
        auth: true
    }
  }
]

export default DashboardRoutes
