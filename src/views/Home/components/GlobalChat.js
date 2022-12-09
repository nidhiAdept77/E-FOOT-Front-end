import { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import _ from 'underscore'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardHeader, Form, InputGroup, Input, Button } from 'reactstrap'
import { BsChatQuoteFill } from "react-icons/bs"
import { FiSend } from "react-icons/fi"
import { setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubscriptions } from '@src/redux/actions/chats'
import RenderChats from './RenderChats'

import '@styles/base/pages/app-chat-list.scss'
import LoaderComponent from '../../components/Loader'
import moment from 'moment'
let globalChatSub
const CardChat = ({ loading, setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubscriptions, globalChat, rooms }) => {
  const [msg, setMsg] = useState('')
  const [chatRef, setChatRef] = useState(null)

  useEffect(() => {
    setGlobalMessages()
    globalChatSub = getGlobalMessagesSubscriptions(messages => {
      updateGlobalMessage(messages)
    })
    return () => {
      removeGlobalMessages()
      if (globalChatSub && globalChatSub.subscription) {
        globalChatSub.subscription.unsubscribe()
      }
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
      // const globalRoom = rooms.find(r => r.default && r.type === 'common')
      const globalRoom2 = {
        _id: "637b6f0bd3cbf785fc3f149e"

      }

      await addMessageToChannel(globalRoom2._id, msg.trim())
      setMsg('')
      document.getElementById("btn") && document.getElementById("btn").remove()
    }
  }

  const handleSendMsg2 = async e => {

    e.preventDefault()

    // const globalRoom = rooms.find(r => r.default && r.type === 'common')
    const globalRoom2 = {
      _id: "637b6f0bd3cbf785fc3f149e"

    }

    await addMessageToChannel(globalRoom2._id, "Joined the Chat")
    setMsg('')
    document.getElementById("btn").remove()

  }

  // const tomorrow = moment().add(-1, 'days')
  // console.log(tomorrow.format('YYYY-MM-DD'))

  return (
    <Card className='chat-widget' style={{ border: "1px solid #aaa" }}>
      <LoaderComponent loading={loading} />
      <CardHeader>
        <div className='d-flex align-items-center w-100'>
          <BsChatQuoteFill size="25" className='mr-2' />
          <h5 className='mb-0 mr-auto'>Global Chat</h5>
          <Button.Ripple onClick={handleSendMsg2} className='send btn-icon ml-auto' id="btn" color='gradient-primary'>
            <p className='pb-0 mb-0'>Join Global Chat</p>
          </Button.Ripple>
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
          <InputGroup className='input-group-merge mr-1 form-send-message form-send-message-global'>
            <Input
              value={msg}
              className='border-0'
              onChange={e => setMsg(e.target.value)}
              placeholder='Press `windows + dot(•)` for emojies'
            />
          </InputGroup>
          <Button.Ripple type="submit" className='send btn-icon mr-1' color='gradient-primary'>
            <FiSend />
          </Button.Ripple>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

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
  getGlobalMessagesSubscriptions: PropTypes.func.isRequired,
  updateGlobalMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.chats.loading,
  globalChat: state.chats.globalChat,
  rooms: state.rooms.rooms
})

export default connect(mapStateToProps, { setGlobalMessages, removeGlobalMessages, addMessageToChannel, updateGlobalMessage, getGlobalMessagesSubscriptions })(CardChat)
