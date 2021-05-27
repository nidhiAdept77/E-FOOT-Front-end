import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/',
    component: lazy(() => import('../../views/Home')),
    meta: {
      authRoute: true
    },
    exact: true
  },
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
  },
  {
    path: '/how-to-play',
    component: lazy(() => import('../../views/HowToPlay')),
    meta: {
      authRoute: true
    }
  }
]

export default DashboardRoutes
