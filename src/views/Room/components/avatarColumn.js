import AvatarGroup from '@components/avatar-group'
import _ from 'underscore'

import { useSelector } from "react-redux"
import { useEffect, useState } from 'react'

const UserAvatarGroup = ({users}) => {
  const { allUsers } = useSelector((state) => state.auth)

  const [roomUser, setRoomUser] = useState([])

  useEffect(() => {
    
    const userList = []

    users.forEach(id => {
      const user = _.findWhere(allUsers, { _id: id })
      if (user) {
        const {firstName, lastName, profileImage} = user
        userList.push({
          title: `${firstName} ${lastName}`,
          img: profileImage
        })
      }
    })

    setRoomUser(userList)

    return () => {
      setRoomUser([])
    }
  }, [allUsers])

  return <AvatarGroup data={ roomUser.length ? roomUser : [] } />
}

export default UserAvatarGroup 