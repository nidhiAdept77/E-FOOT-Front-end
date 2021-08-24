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
import { X, Search, CheckSquare, Bell, User, Trash, MessageSquare } from 'react-feather'
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
        const {  _id, name, lastMessage, createdAt: roomCreatedAt, profileBg, notifications } = item
        const { message, createdAt } = lastMessage || {}
        const currentUserNotifications = notifications.find(noti => noti.userId === user._id)
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
              {currentUserNotifications?.messageIds.length && !(active.type === "room" && active.id === _id) 
              ? (
                <Badge className="float-right" color="danger" pill>
                  {currentUserNotifications.messageIds.length}
                </Badge>
              ) 
              : time && 
              <small className="float-right mb-25 chat-time ml-25">
              {time}
              </small>}
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
  
  // ** Renders Rooms
  const renderUsers = () => {
    if (rooms && rooms.length) {
      return rooms.map(item => {
        const {  _id, name, lastMessage, createdAt: roomCreatedAt, profileBg, notifications } = item
        const { message, createdAt } = lastMessage || {}
        const currentUserNotifications = notifications.find(noti => noti.userId === user._id)
        const time = createdAt || roomCreatedAt ? formatDateToMonthShort(new Date(parseInt(createdAt || roomCreatedAt))) : ""
        return (
          <li
            className={classnames({
              active: active.type === "room" && active.id === _id
            })}
            key={_id}
            onClick={() => handleUserClick("room", _id)}
            style={{borderBottom: "1px solid #ebe9f1"}}
          >
            <Avatar className="custom-size-avatar" color={profileBg} content={name} initials />
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">{name}</h5>
             {/*  {message && (
                <CardText className="text-truncate">
                  {message}
                </CardText>
              )} */}
            </div>
            {/* <div className="chat-meta text-nowrap">
              {currentUserNotifications?.messageIds.length && !(active.type === "room" && active.id === _id) 
              ? (
                <Badge className="float-right" color="danger" pill>
                  {currentUserNotifications.messageIds.length}
                </Badge>
              ) 
              : time && 
              <small className="float-right mb-25 chat-time ml-25">
              {time}
              </small>}
            </div> */}
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
          <header className='chat-profile-header' style={{height: "52px"}}>
            <h5 className='mt-2'>  <MessageSquare className='mr-75' size='18' />Start New Chat</h5>
            <div className='close-icon' onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            {/* <div className='header-profile-sidebar'>
              <Avatar className='box-shadow-1 avatar-border' img={userProfile.avatar} status={status} size='xl' />
              <h4 className='chat-user-name'>{userProfile.fullName}</h4>
              <span className='user-post'>{userProfile.role}</span>
            </div> */}
          </header>
          <div className="sidebar-content">
            <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
              <ul className='chat-users-list chat-list media-list'>{renderUsers()}</ul>
            </PerfectScrollbar>
          </div>
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
              <div className="cursor-pointer">
                <MessageSquare className='ml-75' size='18' onClick={handleUserSidebarLeft} />
              </div>
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
