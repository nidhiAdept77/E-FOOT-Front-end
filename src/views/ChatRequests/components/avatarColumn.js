import AvatarGroup from '@components/avatar-group'
import { useEffect, useState } from 'react'

const UserAvatarGroup = ({users: {firstName, lastName, profilePicture}}) => {
  const [user, setUser] = useState([])
  useEffect(() => {
    if (firstName || lastName || profilePicture) {
      const avatarDetails = {
        title: `${firstName} ${lastName}`,
        img: profilePicture
      }
      setUser([avatarDetails])
    }
    return () => {
    }
  }, [firstName, lastName, profilePicture])
  return <AvatarGroup data={user.length ? user : []} />
}

export default UserAvatarGroup