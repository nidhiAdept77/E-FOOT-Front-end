// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { selectChat } from '@src/redux/actions/chats'

import { getUsersRoom, removeRooms } from '@src/redux/actions/rooms'
import { handleOnlineUserHidden } from '@src/redux/actions/layout'

// ** Utils
import { formatDateToMonthShort } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, CheckSquare, Bell, User, Trash } from 'react-feather'
import { CardText, InputGroup, InputGroupAddon, Input, InputGroupText, Badge, CustomInput, Button } from 'reactstrap'
import _ from 'underscore'
import { removeCurrentChatMessages, setCurrentChatMessages, subsCurrentSeletedChat, updateCurrentChatMessage } from '../../redux/actions/chats'
import { setCurrentRoom } from '../../redux/actions/rooms'

let currentChatSub
const SidebarLeft = props => {
  // ** Props & Store
  const { store, sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft } = props
  const { chats, contacts, userProfile } = store
  const {rooms} = useSelector(state => state.rooms)
  const {user} = useSelector(state => state.auth)
  
  // ** Dispatch
  const dispatch = useDispatch()
  
  // ** State
  const [about, setAbout] = useState('')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState({})
  const [status, setStatus] = useState('online')
  const [filteredChat, setFilteredChat] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [roomId, setRoomId] = useState(null)
  
  dispatch(handleOnlineUserHidden(false))
  
  useEffect(() => {
    dispatch(getUsersRoom(false, searchValue))
    return () => {
      dispatch(removeRooms())
      getUsersRoom(true)
    }
  }, [searchValue])
  
  useEffect(() => {
    dispatch(setCurrentChatMessages(roomId))
    dispatch(setCurrentRoom(roomId))
    currentChatSub = dispatch(subsCurrentSeletedChat(messages => {
      dispatch(updateCurrentChatMessage(messages))
    }))
    return () => {
      dispatch(removeCurrentChatMessages())
      if (currentChatSub && currentChatSub.subscription) {
        currentChatSub.subscription.unsubscribe()
      }
    }
  }, [roomId])
  
  // ** Handles User Chat Click
  const handleUserClick = (type, id) => {
    setRoomId(id)
    dispatch(selectChat(id))
    setActive({ type, id })
    if (sidebar === true) {
      handleSidebar()
    }
  }

  // ** Renders Rooms
  const renderRooms = () => {
    if (rooms && rooms.length) {
      return rooms.map(item => {
        const {  _id, name, lastMessage, createdAt: roomCreatedAt, profileBg } = item
        const { message, createdAt } = lastMessage || {}
        const time = createdAt || roomCreatedAt ? formatDateToMonthShort(new Date(parseInt(createdAt || roomCreatedAt))) : ""
        return (
          <li
            className={classnames({
              active: active.type === "room" && active.id === _id
            })}
            key={_id}
            onClick={() => handleUserClick("room", _id)}
          >
            <Avatar className="custom-size-avatar" color={profileBg} content={name} initials />
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">{name}</h5>
              {message && (
                <CardText className="text-truncate">
                  {message}
                </CardText>
              )}
            </div>
            <div className="chat-meta text-nowrap">
              {time && <small className="float-right mb-25 chat-time ml-25">
                {time}
              </small>}
             {/*  {item.chat.unseenMsgs >= 1 ? (
                <Badge className="float-right" color="danger" pill>
                  {item.chat.unseenMsgs}
                </Badge>
              ) : null} */}
            </div>
          </li>
        )
      })
    } else {
      return (
        <li className='no-results show'>
          <h6 className='mb-0'>No Rooms Found</h6>
        </li>
      )
    }
  }

  // ** Renders Chat
  /* const renderChats = () => {
    if (chats && chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <li className='no-results show'>
            <h6 className='mb-0'>No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : chats

        return arrToMap.map(item => {
          const time = formatDateToMonthShort(item.chat.lastMessage ? item.chat.lastMessage.time : new Date())

          return (
            <li
              className={classnames({
                active: active.type === 'chat' && active.id === item.id
              })}
              key={item.id}
              onClick={() => handleUserClick('chat', item.id)}
            >
              <Avatar img={item.avatar} imgHeight='42' imgWidth='42' status={item.status} />
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>{item.fullName}</h5>
                <CardText className='text-truncate'>
                  {item.chat.lastMessage ? item.chat.lastMessage.message : chats[chats.length - 1].message}
                </CardText>
              </div>
              <div className='chat-meta text-nowrap'>
                <small className='float-right mb-25 chat-time ml-25'>{time}</small>
                {item.chat.unseenMsgs >= 1 ? (
                  <Badge className='float-right' color='danger' pill>
                    {item.chat.unseenMsgs}
                  </Badge>
                ) : null}
              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  } */

  // ** Renders Contact
  const renderContacts = () => {
    if (contacts && contacts.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <li className='no-results show'>
            <h6 className='mb-0'>No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts
        return arrToMap.map(item => {
          return (
            <li
              className={classnames({
                active: active.type === 'contact' && active.id === item.id
              })}
              key={item.fullName}
              onClick={() => handleUserClick('contact', item.id)}
            >
              <Avatar img={item.avatar} imgHeight='42' imgWidth='42' />
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>{item.fullName}</h5>
                <CardText className='text-truncate'>{item.about}</CardText>
              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  }

  // ** Handles Filter
  const handleFilter = e => {
    e.preventDefault()
    setSearchValue(e.target.value)
  }

  return store ? (
    <div className='sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('chat-profile-sidebar', {
            show: userSidebarLeft
          })}
        >
          <header className='chat-profile-header'>
            <div className='close-icon' onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            <div className='header-profile-sidebar'>
              <Avatar className='box-shadow-1 avatar-border' img={userProfile.avatar} status={status} size='xl' />
              <h4 className='chat-user-name'>{userProfile.fullName}</h4>
              <span className='user-post'>{userProfile.role}</span>
            </div>
          </header>
          <PerfectScrollbar className='profile-sidebar-area' options={{ wheelPropagation: false }}>
            <h6 className='section-label mb-1'>About</h6>
            <div className='about-user'>
              <Input
                rows='5'
                defaultValue={userProfile.about}
                type='textarea'
                onChange={e => setAbout(e.target.value)}
                className={classnames('char-textarea', {
                  'text-danger': about && about.length > 120
                })}
              />
              <small className='counter-value float-right'>
                <span className='char-count'>{userProfile.about ? userProfile.about.length : 0}</span>/ 120
              </small>
            </div>
            <h6 className='section-label mb-1 mt-3'>Status</h6>
            <ul className='list-unstyled user-status'>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-primary'
                  id='online'
                  label='Online'
                  onChange={e => setStatus('online')}
                  checked={status === 'online'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-danger'
                  id='busy'
                  label='Do Not Disturb'
                  onChange={e => setStatus('busy')}
                  checked={status === 'busy'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-warning'
                  id='away'
                  label='Away'
                  onChange={e => setStatus('away')}
                  checked={status === 'away'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-secondary'
                  id='offline'
                  label='Offline'
                  onChange={e => setStatus('offline')}
                  checked={status === 'offline'}
                />
              </li>
            </ul>
            <h6 className='section-label mb-1 mt-2'>Settings</h6>
            <ul className='list-unstyled'>
              <li className='d-flex justify-content-between align-items-center mb-1'>
                <div className='d-flex align-items-center'>
                  <CheckSquare className='mr-75' size='18' />
                  <span className='align-middle'>Two-step Verification</span>
                </div>
                <CustomInput type='switch' id='verification' name='verification' label='' defaultChecked />
              </li>
              <li className='d-flex justify-content-between align-items-center mb-1'>
                <div className='d-flex align-items-center'>
                  <Bell className='mr-75' size='18' />
                  <span className='align-middle'>Notification</span>
                </div>
                <CustomInput type='switch' id='notifications' name='notifications' label='' />
              </li>
              <li className='d-flex align-items-center cursor-pointer mb-1'>
                <User className='mr-75' size='18' />
                <span className='align-middle'>Invite Friends</span>
              </li>
              <li className='d-flex align-items-center cursor-pointer'>
                <Trash className='mr-75' size='18' />
                <span className='align-middle'>Delete Account</span>
              </li>
            </ul>
            <div className='mt-3'>
              <Button color='primary'>Logout</Button>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames('sidebar-content', {
            show: sidebar === true
          })}
        >
          <div className='sidebar-close-icon' onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
              {/* use below code to open side bar */}
              {/* <div className='sidebar-profile-toggle' onClick={handleUserSidebarLeft}> */}
              <div className='sidebar-profile-toggle'>
                {Object.keys(user).length ? (
                  <Avatar
                    className='avatar-border'
                    img={user.profileImage}
                    status={status}
                    imgHeight='42'
                    imgWidth='42'
                  />
                ) : null}
              </div>
              <InputGroup className='input-group-merge ml-1 w-100'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText className='round'>
                    <Search className='text-muted' size={14} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={searchValue}
                  className='round'
                  placeholder='Search or start a new chat'
                  onChange={handleFilter}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
            {/* <h4 className='chat-list-title'>Rooms</h4> */}
            <ul className='chat-users-list chat-list media-list'>{renderRooms()}</ul>
            {/* <h4 className='chat-list-title'>Chats</h4>
            <ul className='chat-users-list chat-list media-list'>{renderChats()}</ul>
            <h4 className='chat-list-title'>Contacts</h4>
            <ul className='chat-users-list contact-list media-list'>{renderContacts()}</ul> */}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null
}

export default SidebarLeft
