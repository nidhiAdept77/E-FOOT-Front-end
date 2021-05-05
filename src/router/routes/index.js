// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './DashboardRoutes'

// ** Document title
const TemplateTitle = '%s - EFOOT-NL Dashboard'

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce'
// ** Merge Routes
const Routes = [...DashboardRoutes, ...PagesRoutes]
export { DefaultRoute, Routes, TemplateTitle }
