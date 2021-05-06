// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'underscore'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from 'reactstrap'
import { Inbox, Power, User } from 'react-feather'
import { isUserLoggedIn } from '../../../../auth/utils'
import { showToastMessage } from '../../../../redux/actions/toastNotification'
import {getUserDetails, logoutUser} from '../../../../redux/actions/auth'

const UserDropdown = (props) => {

  // ** State
  // const [userData, setUserData] = useState(null)
  const [isLoggedInUser, setUserLoggedIn] = useState(false)
  const {showToastMessage, getUserDetails, user, logoutUser} = props
  const history = useHistory()
  useEffect(async () => {
    // const userData = localStorage.getItem('userData')
    if (isUserLoggedIn() !== null) {
      setUserLoggedIn(true)
      await getUserDetails()
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    showToastMessage("See you soon", 'success')
    history.push('/login')
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      {isLoggedInUser && !_.isEmpty(user) ? <>
          <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
            <div className='user-nav d-sm-flex d-none'>
              <span className='user-name font-weight-bold capitalize'>{!_.isEmpty(user) ? `${user.firstName} ${user.lastName}` : "John Doe"}</span>
              <span className='user-status capitalize'>{(!_.isEmpty(user) && user.roles[0]) || 'User'}</span>
            </div>
            {user.profilePicture ? 
              <Avatar size='sm' color={user.profileBg}  imgHeight='40' imgWidth='40' status='online'> `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}` </Avatar>
            :
              <Avatar size='sm' color={user.profileBg}  imgHeight='40' imgWidth='40' status='online' content={`${user.firstName} ${user.lastName}`} initials />
            }
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to='/dashboard'>
              <Inbox size={14} className='mr-75' />
              <span className='align-middle'>Dashbard</span>
            </DropdownItem>
            <DropdownItem tag={Link} to='/profile'>
              <User size={14} className='mr-75' />
              <span className='align-middle'>Profile</span>
            </DropdownItem>
            <DropdownItem tag={Link} onClick={handleLogout}>
              <Power size={14} className='mr-75' />
              <span className='align-middle'>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </>
      : <div>
          <Button color='gradient-primary' tag={Link} to='/login' block>
            Login
          </Button>
        </div>}
    </UncontrolledDropdown>
  )
}

UserDropdown.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {showToastMessage, getUserDetails, logoutUser})(UserDropdown)
