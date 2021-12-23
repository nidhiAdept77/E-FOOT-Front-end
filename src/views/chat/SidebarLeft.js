// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

import { getUsersRoom, removeRooms, subsChatRooms, updateChatRooms } from '@src/redux/actions/rooms'
import { handleOnlineUserHidden } from '@src/redux/actions/layout'
import { getAllUsers, removeAllUsers } from "@store/actions/auth"

// ** Utils
import { formatDateToMonthShort } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, MessageSquare } from 'react-feather'
import { CardText, InputGroup, InputGroupAddon, Input, InputGroupText, Badge } from 'reactstrap'
import _ from 'underscore'
import { removeCurrentChatMessages, setCurrentChatMessages, subsCurrentSeletedChat, updateCurrentChatMessage, subsLastMessage, updateLastChatMessage, subsMessageNotifications, setMesageNotifications} from '../../redux/actions/chats'
import { setCurrentRoom, updateRoom, removeRoomNotifications } from '../../redux/actions/rooms'

let currentChatSub, chatRoomsSubs, lastMessageSubs, notificationsSubs
const SidebarLeft = props => {
  // ** Props & Store
  const { store, sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft } = props
  const {rooms, currentRoom} = useSelector(state => state.rooms)
  const {user, allUsers, onlineUsers} = useSelector(state => state.auth)
  
  // ** Dispatch
  const dispatch = useDispatch()
  
  // ** State
  const [active, setActive] = useState({})
  const [chatType, setChatType] = useState({})
  const [searchValue, setSearchValue] = useState("")
  const [roomId, setRoomId] = useState(null)
  
  dispatch(handleOnlineUserHidden(false))
  
  // to clear active room notifications
  window.setInterval(() => {
    if (active?.id === roomId && currentRoom?.notifications?.length) {
      dispatch(removeRoomNotifications(roomId))
    }
  }, 2000)

  useEffect(() => {
    dispatch(getAllUsers())

    if (chatRoomsSubs && chatRoomsSubs.subscription) {
      chatRoomsSubs.subscription.unsubscribe()
    }
    chatRoomsSubs = dispatch(subsChatRooms(room => {
      dispatch(updateChatRooms(room))
    }))

  // useEffect(() => {
  //   if (lastMessageSubs && lastMessageSubs.subscription) {
  //     lastMessageSubs.subscription.unsubscribe()
  //   }
  //   lastMessageSubs = dispatch(subsLastMessage(message => {
  //     dispatch(updateLastChatMessage(message))
  //   }))
  //   return () => {
  //     if (lastMessageSubs && lastMessageSubs.subscription) {
  //       lastMessageSubs.subscription.unsubscribe()
  //     }
  //   }
  // }, [])

    if (notificationsSubs && notificationsSubs.subscription) {
      notificationsSubs.subscription.unsubscribe()
    }
    notificationsSubs = dispatch(subsMessageNotifications(notificationArray => {
      dispatch(setMesageNotifications(notificationArray))
    }))

    return () => {
      dispatch(removeRooms())
      dispatch(removeAllUsers())

      if (chatRoomsSubs && chatRoomsSubs.subscription) {
        chatRoomsSubs.subscription.unsubscribe()
      }

      if (lastMessageSubs && lastMessageSubs.subscription) {
        lastMessageSubs.subscription.unsubscribe()
      }

      if (notificationsSubs && notificationsSubs.subscription) {
        notificationsSubs.subscription.unsubscribe()
      }
      
    }
  }, [])
  
  useEffect(() => {
    dispatch(getUsersRoom(false, searchValue))
    return () => {
      dispatch(removeRooms())
      if (currentChatSub && currentChatSub.subscription) {
        currentChatSub.subscription.unsubscribe()
      }
    }
  }, [searchValue])

  useEffect(() => {
    if (chatType === "contact" && currentRoom) {
      handleUserSidebarLeft()
    }
    if (currentRoom?.notifications?.length) {
      dispatch(removeRoomNotifications(roomId))
    }
    return () => {
      dispatch(removeCurrentChatMessages())
      if (currentChatSub && currentChatSub.subscription) {
        currentChatSub.subscription.unsubscribe()
      }
    }
  }, [currentRoom])
  
  useEffect(() => {
    if (roomId) {
      dispatch(setCurrentChatMessages(roomId))
      dispatch(setCurrentRoom(roomId))
    }
    if (currentChatSub && currentChatSub.subscription) {
      currentChatSub.subscription.unsubscribe()
    }
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
  const handleUserClick = (type, id, name) => {
    setChatType(type)
    if (type === "room") {
      setRoomId(id)
      setActive({ type, id })
    } else if (type === "contact") {
      const isRoomExists = rooms.find(room => room.type === "direct" && _.contains(room.userIds, id))
      if (!isRoomExists) {
        dispatch(updateRoom({
          name,
          userIds: [id, user._id],
          type: 'direct'
        }))
      } else {
        setRoomId(isRoomExists._id)
        setActive({ type: "room", id: isRoomExists._id })
      }
    }
    if (sidebar === true) {
      handleSidebar()
    }
  }

  // ** Renders Rooms
  const renderRooms = () => {
    if (rooms && rooms.length) {
      return rooms.map(item => {
        const {  _id, lastMessage, createdAt: roomCreatedAt, profileBg, notifications, type, users } = item
        let { name, profilePicture: profileImage } = item
        if (type === "direct") {
          const {firstName, lastName, profilePicture} = users.find(u => u._id !== user._id)
          name = `${firstName} ${lastName}`
          profileImage = profilePicture
        }
        const { message, createdAt } = lastMessage || {}
        const currentUserNotifications = notifications?.find(noti => noti.userId === user._id)
        const time = createdAt || roomCreatedAt ? formatDateToMonthShort(new Date(parseInt(createdAt || roomCreatedAt))) : ""
        return (
          <li
            className={classnames({
              active: active.type === "room" && active.id === _id
            })}
            key={_id}
            onClick={() => handleUserClick("room", _id)}
          >
            {type === "direct" ? (
              <Avatar className="custom-size-avatar" img={profileImage} />
            ) : (
              <Avatar
                className="custom-size-avatar"
                color={profileBg}
                content={name}
                initials
              />
            )}
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
    const onlineUsersIds = _.pluck(onlineUsers, "_id")
    const allUsersExceptLoggedUser = allUsers.filter(item => item._id !== user._id)
    if (allUsersExceptLoggedUser?.length) {
      return allUsersExceptLoggedUser.map(item => {
        const {  _id, firstName, lastName, profileImage } = item
        return (
          <li
            className={classnames({
              active: active.type === "contact" && active.id === _id
            })}
            key={_id}
            onClick={() => handleUserClick("contact", _id, `${firstName} ${lastName}`)}
            style={{ borderBottom: "1px solid #ebe9f1" }}
          >
            <Avatar className="custom-size-avatar" img={profileImage} status={_.contains(onlineUsersIds, _id) ? 'online' : 'offline'} />
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">
                {firstName} {lastName}
              </h5>
            </div>
          </li>
        )
      })
    } else {
      return (
        <li className='no-results show'>
          <h6 className='mb-0'>No Users Found</h6>
        </li>
      )
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
                    status="online"
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
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null
}

export default SidebarLeft
