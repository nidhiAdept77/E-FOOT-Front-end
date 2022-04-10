// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearBellNotifications, getBellNotifications, subsReminders, updateReminders } from '../../../../redux/actions/reminders'
import { CONSTANTS } from '../../../../utils/CONSTANTS'
import { useHistory } from 'react-router-dom'

let reminderSubs
const NotificationDropdown = () => {
  // ** Notification Array

  const dispatch = useDispatch()
  const history = useHistory()
  const {bellNotifications} = useSelector(state => state.dashboard)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    dispatch(getBellNotifications())
    if (reminderSubs?.subscription) {
      reminderSubs.subscription.unsubscribe()
    }
    reminderSubs = dispatch(
      subsReminders((reminder) => {
        dispatch(updateReminders(reminder))
      })
    )
    return () => {
      if (reminderSubs?.subscription) {
        reminderSubs.subscription.unsubscribe()
      }
    }
  }, [])

  const handleClearNotification = (event) => {
    event.preventDefault()
    const userId = localStorage.getItem("userId")
    dispatch(clearBellNotifications(userId, [CONSTANTS.REMINDER_TYPES.WL_SCORE_UPDATE, CONSTANTS.REMINDER_TYPES.CHALLENGE, CONSTANTS.REMINDER_TYPES.DISPUTE]))
  }

  useEffect(() => {
    if (bellNotifications?.length) {
      const challengeNotifications = [], disputeNotifications = [], scoreUpdateNotifications = [], others = []
      bellNotifications.forEach(noti => {
        if (noti.type === CONSTANTS.REMINDER_TYPES.WL_SCORE_UPDATE) {
          scoreUpdateNotifications.push(noti)
        } else if (noti.type === CONSTANTS.REMINDER_TYPES.CHALLENGE) {
          challengeNotifications.push(noti)
        } else if (noti.type === CONSTANTS.REMINDER_TYPES.DISPUTE) {
          disputeNotifications.push(noti)
        } else {
          others.push(noti)
        }
      })
      setNotifications([...challengeNotifications, ...disputeNotifications, ...scoreUpdateNotifications, ...others])
    }
  }, [bellNotifications])

  const handleNotificationClick = (event, data) => {
    event.preventDefault()
    const userId = localStorage.getItem("userId")
    if (userId) {
      if (data?.type === CONSTANTS.REMINDER_TYPES.WL_SCORE_UPDATE) {
        dispatch(clearBellNotifications(userId, [CONSTANTS.REMINDER_TYPES.WL_SCORE_UPDATE]))
        history.push({
          pathname: '/profile',
          state: { section: '2' }
        })
      } else if (data?.type === CONSTANTS.REMINDER_TYPES.DISPUTE) {
        dispatch(clearBellNotifications(userId, [CONSTANTS.REMINDER_TYPES.DISPUTE]))
        history.push('/my-matches')
      } else if (data?.type === CONSTANTS.REMINDER_TYPES.CHALLENGE) {
        dispatch(clearBellNotifications(userId, [CONSTANTS.REMINDER_TYPES.CHALLENGE]))
        history.push('/my-matches')
      } else {
        console.log("Other notification")
      }
    }
  }

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notifications?.length ? notifications.map((item, index) => {
          item['avatarIcon'] = (
            <AlertTriangle size={14} />
          )
          item['title'] = (
            <Media tag='p' heading>
              <span className='font-weight-bolder'>{item.title}</span>
            </Media>
          )
          return (
            <p key={index} className='d-flex' onClick={e => handleNotificationClick(e, item)}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <Media left>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                          : null)}
                      />
                    </Media>
                    <Media body>
                      {item.title}
                      <small className='notification-text'>{item.message}</small>
                    </Media>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                  </Fragment>
                )}
              </Media>
            </p>
          )
        })
        : (<div className='d-flex'>
          <div className='d-flex align-items-center text-center ml-2'>
            <span>
              No new notifications
            </span>
          </div>
        </div>)}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {notifications?.length || 0}
        </Badge>
      </DropdownToggle>
      {notifications?.length ? (
        <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            {/* <Badge tag='div' color='light-primary' pill>
              6 New
            </Badge> */}
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' block onClick={handleClearNotification}>
            Clear all notification
          </Button.Ripple>
        </li>
      </DropdownMenu>
      ) : null}
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
