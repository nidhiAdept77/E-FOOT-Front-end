// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './DashboardRoutes'
import AdminRoutes from './AdminRoutes'

// ** Document title
const TemplateTitle = '%s - EFOOT-NL Dashboard'

// ** Default Route
const DefaultRoute = '/dashboard'
// ** Merge Routes
const Routes = [...DashboardRoutes, ...PagesRoutes, ...AdminRoutes]
export { DefaultRoute, Routes, TemplateTitle }
