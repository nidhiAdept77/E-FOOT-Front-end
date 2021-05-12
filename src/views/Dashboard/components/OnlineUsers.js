import Avatar from '@components/avatar'
import { HelpCircle, MoreVertical } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media, UncontrolledTooltip } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OnlineUserRow from './OnlineUserRow'


const OnlineUsers = ({ onlineUsers }) => {
  const renderTasks = (onlineUsers) => {
    return onlineUsers.length > 0 ? onlineUsers.map(user => {
      return (
        <OnlineUserRow user={user} />
      )
    }) : null
  }

  return onlineUsers ? (
    <Card className='card-employee-task'>
      <CardHeader>
        <CardTitle tag='h4'>Online Users ({onlineUsers.length})</CardTitle>
        <HelpCircle size={18} id="onlineUsersHelp" className='text-muted cursor-pointer' />
        <UncontrolledTooltip placement='auto' target='onlineUsersHelp'>
          All online users
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>{renderTasks(onlineUsers)}</CardBody>
    </Card>
  ) : null
}

OnlineUsers.propTypes = {
  onlineUsers: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  onlineUsers: state.auth.onlineUsers
})
export default connect(mapStateToProps, {})(OnlineUsers)
