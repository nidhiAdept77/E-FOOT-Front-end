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
    },
    exact: true
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/how-to-play',
    component: lazy(() => import('../../views/HowToPlay')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/chat')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  // {
  //   path: '/wallet',
  //   component: lazy(() => import('../../views/wallet')),
  //   meta: {
  //     authRoute: true
  //   },
  //   exact: true
  // },
  {
    path: '/create-challenge',
    component: lazy(() => import('../../views/Challenge')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/my-matches',
    component: lazy(() => import('../../views/MyMatches')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/chat-requests',
    component: lazy(() => import('../../views/ChatRequests')),
    meta: {
      authRoute: true
    },
    exact: true
  }
]

export default DashboardRoutes
