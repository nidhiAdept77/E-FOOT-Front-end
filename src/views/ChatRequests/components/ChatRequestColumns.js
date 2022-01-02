import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddEditBtn from './addEditButtons'
import UserAvatarGroup from './avatarColumn'

const RequestorName = ({data: {userList}}) => {
  const [user, setUser] = useState(null)
  const {_id} = useSelector(state => state.auth.user)
  useEffect(() => {
    if (userList?.length) {
      const {firstName, lastName} = userList.find(user => user._id !== _id)
      setUser(`${firstName} ${lastName}`)
    }
    return () => {
    }
  }, [userList, _id])
  return (<>
    <span>{user}</span>
  </>)
}

export const columns = [
  {
    name: "Profile Picture",
    selector: "userList",
    sortable: true,
    cell: (row) => <UserAvatarGroup data={row} />
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    cell: (row) => <RequestorName data={row} />
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: ({status}) => (<span className='text-capitalize'>{status}</span>)
  },
  {
    name: "When",
    selector: "when",
    sortable: true,
    cell: ({createdAt}) => (<span>{moment(new Date(parseInt(createdAt))).fromNow()}</span>)
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <AddEditBtn data={row} isAdd={false} />
    )
  }
]