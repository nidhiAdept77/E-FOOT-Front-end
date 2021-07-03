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
  },
  {
    path: '/rooms',
    component: lazy(() => import('../../views/Room')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/create-room',
    component: lazy(() => import('../../views/Room/createRoom.js')),
    meta: {
      authRoute: true
    }
  }
]

export default DashboardRoutes
