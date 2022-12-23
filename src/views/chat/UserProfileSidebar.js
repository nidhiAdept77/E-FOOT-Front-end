// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X } from 'react-feather'
import { useSelector } from 'react-redux'

const UserProfileSidebar = props => {
  // ** Props
  const { handleUserSidebarRight, userSidebarRight } = props

  let { currentRoom } = useSelector(state => state.rooms)
  currentRoom = currentRoom ? currentRoom : {}
  const { user } = useSelector(state => state.auth)

  const { type, users } = currentRoom
  let { name, profilePicture: profileImage } = currentRoom
  if (type === "direct") {
    const { firstName, lastName, profilePicture } = users.find(u => u._id !== user._id)
    name = `${firstName} ${lastName}`
    profileImage = profilePicture
  }

  return (
    <div className={classnames('user-profile-sidebar', { show: userSidebarRight === true })}>
      {Object.keys(currentRoom).length ? (
        <div>
          <header className='user-profile-header'>
            <span className='close-icon' onClick={handleUserSidebarRight}>
              <X size={14} />
            </span>
            <div className='header-profile-sidebar'>
              {currentRoom.type === "direct" ? (
                <Avatar
                  className='box-shadow-1 avatar-border'
                  size='xl'
                  img={profileImage}
                  imgHeight='70'
                  imgWidth='70'
                />)
                : (
                  <Avatar
                    className='box-shadow-1 avatar-border'
                    size='xl'
                    content={currentRoom.name}
                    color={currentRoom.profileBg}
                    imgHeight='70'
                    imgWidth='70'
                    initials
                  />)
              }

              <h4 className='chat-user-name'>{name}</h4>
            </div>
          </header>
          {currentRoom.type === "private" ? (
            <PerfectScrollbar className='user-profile-sidebar-area' options={{ wheelPropagation: false }}>
              <div className='personal-info'>
                <h6 className='section-label mb-1 mt-3'>Users</h6>
                <ul className='list-unstyled'>
                  {currentRoom && currentRoom.users?.length && currentRoom.users.map(user => <li key={user._id} className='mb-1'>
                    <Avatar
                      className='box-shadow-1 avatar-border mr-50'
                      size='sm'
                      img={user.profilePicture}
                      imgHeight='70'
                      imgWidth='70'
                    />
                    <span className='align-middle'>{user.firstName} {user.lastName}</span>
                  </li>
                  )}
                </ul>
              </div>
            </PerfectScrollbar>)
            : null}
        </div>
      ) : null}
    </div>
  )
}

export default UserProfileSidebar
