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
import { getBellNotifications } from '../../../../redux/actions/reminders'

const NotificationDropdown = () => {
  // ** Notification Array

  const dispatch = useDispatch()
  const {bellNotifications} = useSelector(state => state.dashboard)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    dispatch(getBellNotifications())
    return () => {
    }
  }, [])


  useEffect(() => {
    if (bellNotifications?.length) {
      setNotifications(bellNotifications)
    }
    return () => {
    }
  }, [bellNotifications])

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
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
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
            </a>
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
          <Button.Ripple color='primary' block>
            Clear all notification
          </Button.Ripple>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
