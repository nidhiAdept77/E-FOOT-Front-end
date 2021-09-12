// ** React Imports
import LayoutSettingActions from './layoutSettingsAction'
import LayoutSettingsStatus from './layoutSettingsStatus'

export const columns = [
  {
    name: "Page",
    selector: "page",
    sortable: true,
    cell: (row) => row.page
  },
  {
    name: "Position",
    selector: "position",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.position}</span>
  },
  {
    name: "Status",
    cell: (row) => <LayoutSettingsStatus row={row} />
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => <LayoutSettingActions row={row} />
  }
]