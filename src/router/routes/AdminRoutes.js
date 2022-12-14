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
    component: lazy(() => import('../../views/LayoutSettings/LayoutUpdate')),
    exact: true
  },
  {
    path: '/create-console',
    component: lazy(() => import('../../views/ConsoleList')),
    exact: true
  },
  {
    path: '/create-games',
    component: lazy(() => import('../../views/Games')),
    exact: true
  },
  {
    path: '/resolve-dispute',
    component: lazy(() => import('../../views/ResolveDispute')),
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/rooms',
    component: lazy(() => import('../../views/Room')),
    meta: {
      authRoute: true
    },
    exact: true
  }
]

export default AdminRoutes
