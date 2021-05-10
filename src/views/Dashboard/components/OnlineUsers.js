import Chart from 'react-apexcharts'
import Avatar from '@components/avatar'
import { HelpCircle, MoreVertical } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media, UncontrolledTooltip } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import {getInitOnlineUsers, removeOnlineUsers} from '@src/redux/actions/auth'

const OnlineUsers = ({ colors, trackBgColor, getInitOnlineUsers, removeOnlineUsers, onlineUsers }) => {
  useEffect(() => {
    getInitOnlineUsers()
    return () => {
      removeOnlineUsers()
    }
  }, [])

  const renderTasks = (onlineUsers) => {
    return onlineUsers.length > 0 ? onlineUsers.map(user => {

      return (
        <div key={user.firstName} className='employee-task d-flex justify-content-between align-items-center'>
          <Media>
            {user.profilePicture ? 
              <Avatar size='sm' imgClassName='rounded' className='mr-75' img={user.profilePicture}  imgHeight='42' imgWidth='42' status='online' />
            :
              <Avatar size='sm' color={user.profileBg} imgClassName='rounded' className='mr-75'  imgHeight='42' imgWidth='42' status='online' content={`${user.firstName} ${user.lastName}`} initials />
            }
            <Media className='my-auto' body status='online'>
              <h6 className='mb-0'>{user.firstName}</h6>
            </Media>
          </Media>
        </div>
      )
    }) : null
  }

  return (
    <Card className='card-employee-task'>
      <CardHeader>
        <CardTitle tag='h4'>Online Users</CardTitle>
        <HelpCircle size={18} id="onlineUsersHelp" className='text-muted cursor-pointer' />
        <UncontrolledTooltip placement='auto' target='onlineUsersHelp'>
          All online users
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>{renderTasks(onlineUsers)}</CardBody>
    </Card>
  )
}

OnlineUsers.propTypes = {
  getInitOnlineUsers: PropTypes.func.isRequired,
  removeOnlineUsers: PropTypes.func.isRequired,
  onlineUsers: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  onlineUsers: state.auth.onlineUsers
})
export default connect(mapStateToProps, {getInitOnlineUsers, removeOnlineUsers})(OnlineUsers)
