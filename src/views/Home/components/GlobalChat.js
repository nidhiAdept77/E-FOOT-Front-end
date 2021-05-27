import { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import _ from 'underscore'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardHeader, Form, InputGroup, Input, Button } from 'reactstrap'
import {BsChatQuoteFill} from "react-icons/bs"
import {FiSend} from "react-icons/fi"
import {setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubsctions} from '@src/redux/actions/chats'
import RenderChats from './RenderChats'

import '@styles/base/pages/app-chat-list.scss'
import LoaderComponent from '../../components/Loader'
let globalChatSub
const CardChat = ({loading, setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubsctions, globalChat, rooms}) => {
  const [msg, setMsg] = useState('')
  const [chatRef, setChatRef] = useState(null)
  
  useEffect(async () => {
    await setGlobalMessages()
    globalChatSub = getGlobalMessagesSubsctions(messages => {
      // setTimeout(() => {
        updateGlobalMessage(messages)
      // }, 1000)
    })
    return () => {
      removeGlobalMessages()
      globalChatSub.subscription.unsubscribe()
    }
  }, [])

  //** Scroll to chat bottom
  const scrollToBottom = () => {
    chatRef.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom()
    }
  }, [chatRef, globalChat])

  const handleSendMsg = async e => {
    e.preventDefault()
    if (msg.trim().length) {
      const globalRoom = rooms.find(r => r.default && r.type === 'common')
      await addMessageToChannel(globalRoom._id, msg.trim())
      setMsg('') 
    }
  }

  return (
    <Card className='chat-widget'>
      <LoaderComponent loading={loading} />
      <CardHeader>
        <div className='d-flex align-items-center'>
          <BsChatQuoteFill size="25" className='mr-2'/>
          <h5 className='mb-0'>Global Chat</h5>
        </div>
      </CardHeader>
      <div className='chat-app-window'>
        <PerfectScrollbar
          containerRef={el => setChatRef(el)}
          className='user-chats scroll-area'
          options={{ wheelPropagation: false }}
        >
          <div className='chats'>
            <RenderChats chats={globalChat} />
          </div>
        </PerfectScrollbar>
        <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
          <InputGroup className='input-group-merge mr-1 form-send-message'>
            <Input
              value={msg}
              className='border-0'
              onChange={e => setMsg(e.target.value)}
              placeholder='Type your message'
            />
          </InputGroup>
          <Button.Ripple type="submit" className='send btn-icon' color='gradient-primary'>
            <FiSend size={16} />
          </Button.Ripple>
        </Form>
      </div>
    </Card>
  )
}

CardChat.propTypes = {
  loading: PropTypes.bool.isRequired,
  setGlobalMessages: PropTypes.func.isRequired,
  removeGlobalMessages: PropTypes.func.isRequired,
  addMessageToChannel: PropTypes.func.isRequired,
  getGlobalMessagesSubsctions: PropTypes.func.isRequired,
  updateGlobalMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    loading: state.chats.loading,
    globalChat: state.chats.globalChat,
    rooms: state.rooms.rooms
})

export default connect(mapStateToProps, {setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubsctions})(CardChat)
