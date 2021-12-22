import AddEditBtn from './addEditButtons'
import UserAvatarGroup from './avatarColumn'
export const columns = [
  {
    name: "Profile Picture",
    selector: "requestedBy",
    sortable: true,
    cell: ({requestedBy}) => <UserAvatarGroup users={requestedBy} />
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    cell: ({requestedBy: {firstName, lastName}}) => `${firstName} ${lastName}`
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: ({status}) => (<span className='text-capitalize'>{status}</span>)
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <AddEditBtn data={row} isAdd={false} />
    )
  }
]