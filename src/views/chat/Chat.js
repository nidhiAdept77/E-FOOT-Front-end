// ** React Imports
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Menu, Send, MessageSquare } from 'react-feather'
import {
  Form,
  InputGroup,
  Input,
  Button
} from 'reactstrap'
import { getChatTime } from '../../utils'
import { addMessageToChannel } from '../../redux/actions/chats'

const ChatLog = props => {
  // ** Props & Store
  const { handleUserSidebarRight, handleSidebar, userSidebarLeft } = props

  let {currentChatMessages} = useSelector(state => state.chats)
  currentChatMessages = currentChatMessages ? currentChatMessages : []

  let {currentRoom} = useSelector(state => state.rooms)
  currentRoom = currentRoom ? currentRoom : {}
  
  const {user} = useSelector(state => state.auth)

  // ** Refs & Dispatch
  const chatArea = useRef(null)
  const dispatch = useDispatch()

  // ** State
  const [msg, setMsg] = useState('')

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const currentChatArea = chatArea?.current
    if (currentChatArea) {
      const chatContainer = ReactDOM.findDOMNode(chatArea.current)
      if (chatContainer) {
        chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
      }
    }
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    if (currentChatMessages.length) {
      scrollToBottom()
    }
  }, [currentChatMessages])

  // ** Renders user chat
  const renderChats = () => {
    return currentChatMessages.length ? currentChatMessages.map((item, index) => {
        return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.user._id !== user._id
          })}
        >
          <div className='chat-avatar'>
            <Avatar
              className='box-shadow-1 cursor-pointer'
              img={item.user.profileImage}
            />
          </div>

          <div className='chat-body'>
              <div key={item._id} className='chat-content'>
                <p>{item.message}</p>
                <p className="chat-time">{getChatTime(new Date(parseInt(item.createdAt)))}</p>
              </div>
          </div>
        </div>
      )
    }) : ""
  }

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = obj => {
    handleUserSidebarRight()
  }

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (!Object.keys(currentRoom).length && !userSidebarLeft && window.innerWidth <= 1200) {
      handleSidebar()
    }
  }

  // ** Sends New Msg
  const handleSendMsg = async e => {
    e.preventDefault()
    if (msg) {
      dispatch(addMessageToChannel(currentRoom._id, msg.trim(), 'private'))
      setMsg('')
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = currentChatMessages.length ? PerfectScrollbar : 'div'
  
  const { type, users } = currentRoom
  let { name, profilePicture: profileImage } = currentRoom
  if (type === "direct") {
    const {firstName, lastName, profilePicture} = users.find(u => u._id !== user._id)
    name = `${firstName} ${lastName}`
    profileImage = profilePicture
  }

  return (
    <div className='chat-app-window'>
      <div className={classnames('start-chat-area', { 'd-none': Object.keys(currentRoom).length })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(currentRoom).length ? (
        <div className={classnames('active-chat', { 'd-none': Object.keys(currentRoom).length === 0 })}>
          <div className='chat-navbar'>
            <header className='chat-header'>
              <div className='d-flex align-items-center'>
                <div className='sidebar-toggle d-block d-lg-none mr-1' onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                {type === "direct" ? (
                  <Avatar
                    className="avatar-border user-profile-toggle m-0 mr-1"
                    img={profileImage}
                    onClick={() => handleAvatarClick({currentRoom})}
                  />
                ) : (
                  <Avatar
                    height="32"
                    color={currentRoom.profileBg}
                    className="avatar-border user-profile-toggle m-0 mr-1"
                    content={currentRoom.name}
                    initials
                    onClick={() => handleAvatarClick(currentRoom)}
                  />
                )}
                <h6 className='mb-0'>{name}</h6>
              </div>
            </header>
          </div>

          <ChatWrapper ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
            {currentChatMessages.length ? <div className='chats'>{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
            <InputGroup className='input-group-merge mr-1 form-send-message'>
              <Input
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder='Type your message here....'
              />
            </InputGroup>
            <Button className='send' color='primary'>
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'>Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog
