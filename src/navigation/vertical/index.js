// ** Navigation sections imports
import dashboards from './dashboards'
import adminRoutes from './adminRoutes'

const normalRoutes = [...dashboards]
const adminRoleRoutes = [...adminRoutes]
export default {normalRoutes, adminRoleRoutes}
