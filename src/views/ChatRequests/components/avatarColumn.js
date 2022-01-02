import AvatarGroup from '@components/avatar-group'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserAvatarGroup = ({data: {userList}}) => {
  const [user, setUser] = useState([])
  const {_id} = useSelector(state => state.auth.user)
  useEffect(() => {
    if (userList.length) {
      const {firstName, lastName, profilePicture} = userList.find(user => user._id !== _id)
      const avatarDetails = {
        title: `${firstName} ${lastName}`,
        img: profilePicture
      }
      setUser([avatarDetails])
    }
    return () => {
    }
  }, [userList, _id])
  return <AvatarGroup data={user.length ? user : []} />
}

export default UserAvatarGroup