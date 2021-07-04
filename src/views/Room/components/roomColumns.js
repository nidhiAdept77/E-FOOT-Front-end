import { Button } from 'reactstrap'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import UserAvatarGroup from './avatarColumn'
export const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    cell: (row) => row.name
  },
  {
    name: "Users",
    selector: "userIds",
    sortable: true,
    cell: (row) => <UserAvatarGroup users={row.userIds} />
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <div className='demo-inline-spacing'>
        <Button.Ripple className='btn-icon' color='flat-success'>
          <FiEdit size={16} />
        </Button.Ripple>
        <Button.Ripple className='btn-icon' color='flat-danger'>
          <FiTrash2 size={16} />
        </Button.Ripple>
      </div>
    )
  }
]