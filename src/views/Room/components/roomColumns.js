import AddEditBtn from './addEditButtons'
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
      <AddEditBtn data={row} isAdd={false} />
    )
  }
]