// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Mail, PhoneCall, Clock } from 'react-feather'
import { useSelector } from 'react-redux'

const UserProfileSidebar = props => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props

  let {currentRoom} = useSelector(state => state.rooms)
  currentRoom = currentRoom ? currentRoom : {}

  return (
    <div className={classnames('user-profile-sidebar', { show: userSidebarRight === true })}>
      {Object.keys(currentRoom).length ? (
        <div>
          <header className='user-profile-header'>
            <span className='close-icon' onClick={handleUserSidebarRight}>
              <X size={14} />
            </span>
            <div className='header-profile-sidebar'>
              <Avatar
                className='box-shadow-1 avatar-border'
                size='xl'
                content={currentRoom.name} 
                color={currentRoom.profileBg}
                imgHeight='70'
                imgWidth='70'
                initials
              />
              <h4 className='chat-user-name'>{currentRoom.name}</h4>
            </div>
          </header>
          <PerfectScrollbar className='user-profile-sidebar-area' options={{ wheelPropagation: false }}>
        <div className='personal-info'>
          <h6 className='section-label mb-1 mt-3'>Users</h6>
          <ul className='list-unstyled'>
            {currentRoom && currentRoom.users?.length && currentRoom.users.map(user => <li className='mb-1'>
                <Avatar
                  className='box-shadow-1 avatar-border mr-50'
                  size='xs'
                  img={user.profilePicture}
                  imgHeight='70'
                  imgWidth='70'
                />
                <span className='align-middle'>{user.firstName} {user.lastName}</span>
              </li>
            )}
          </ul>
        </div>
       </PerfectScrollbar>
         </div>
      ) : null}
      </div>
  )
}

export default UserProfileSidebar
