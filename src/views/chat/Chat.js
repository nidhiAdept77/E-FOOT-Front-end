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
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button
} from 'reactstrap'
import { getChatTime } from '../../utils'
import { addMessageToChannel } from '../../redux/actions/chats'

const ChatLog = props => {
  // ** Props & Store
  const { handleUser, handleUserSidebarRight, handleSidebar, userSidebarLeft } = props

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
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    if (currentChatMessages.length) {
      scrollToBottom()
    }
  }, [currentChatMessages])

  // ** Formats chat data based on sender
  /* const formattedChatData = () => {
    let chatLog = []
    if (selectedUser.chat) {
      chatLog = selectedUser.chat.chat
    }

    const formattedChatLog = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : undefined
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: []
    }
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          msg: msg.message,
          time: msg.time
        })
      } else {
        chatMessageSenderId = msg.senderId
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              msg: msg.message,
              time: msg.time
            }
          ]
        }
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })
    return formattedChatLog
  } */

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
    handleUser(obj)
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
      dispatch(addMessageToChannel(currentRoom._id, msg.trim()))
      setMsg('')
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = currentChatMessages.length ? PerfectScrollbar : 'div'
  
  return (
    <div className='chat-app-window'>
      {/* <div className={classnames('start-chat-area', { 'd-none': currentChatMessages.length })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div> */}
      {Object.keys(currentRoom).length ? (
        <div className={classnames('active-chat', { 'd-none': Object.keys(currentRoom).length === 0 })}>
          <div className='chat-navbar'>
            <header className='chat-header'>
              <div className='d-flex align-items-center'>
                <div className='sidebar-toggle d-block d-lg-none mr-1' onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight='36'
                  imgWidth='36'
                  img="https://icon-library.com/images/user-group-512_59631.png"
                  /* status={selectedUser.contact.status} */
                  className='avatar-border user-profile-toggle m-0 mr-1'
                  /* onClick={() => handleAvatarClick(selectedUser.contact)} */
                />
                <h6 className='mb-0'>{currentRoom.name}</h6>
              </div>
              {/* <div className='d-flex align-items-center'>
                <PhoneCall size={18} className='cursor-pointer d-sm-block d-none mr-1' />
                <Video size={18} className='cursor-pointer d-sm-block d-none mr-1' />
                <Search size={18} className='cursor-pointer d-sm-block d-none' />
                <UncontrolledDropdown>
                  <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                    <MoreVertical size='18' />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div> */}
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
