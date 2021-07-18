import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import {SET_GLOBAL_MESSAGES, SET_LOADER, GET_USER_PROFILE, GET_CHAT_CONTACTS, SELECT_CHAT, SEND_MSG} from '../../types'
import axios from 'axios'
import {data} from '@src/assets/data/chat-data'

const MessageFragment = gql`
    fragment MessageData on Message {
        _id
        roomId
        message
        user{
            _id
            userName
            firstName
            lastName
            profileImage
            isImageOns3
            profileBg
        }
    }
`
export const setGlobalMessages = () => async dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: true
    })
    try {
        const globalMessageQuery = gql`
            query {
                getGlobalMessages{
                    statusCode
                    success
                    nextToken
                    data{
                        ...MessageData
                    }
                }
            }
            ${MessageFragment}
        `
        const {data} = await client.query({
            query: globalMessageQuery
        })
        handleAuthResponse(data.getGlobalMessages)
        const {success} = data.getGlobalMessages
        if (success) {
            const roomData = getFieldValue(data, 'getGlobalMessages.data')
            if (!_.isEmpty(roomData)) {
                dispatch({
                    type: SET_GLOBAL_MESSAGES,
                    payload: roomData
                })
            }
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })

    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const removeGlobalMessages = () => dispatch => {
    dispatch({
        type: SET_GLOBAL_MESSAGES,
        payload: []
    })
}

export const addMessageToChannel = (roomId, message) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const addMessageMutation = gql`
            mutation addMessage($input: MessageInput){
                addMessage(input: $input){
                    statusCode
                    success
                    message
                    nextToken
                    data{
                        ...MessageData
                    }
                }
            }
        ${MessageFragment}
        `
        const {data} = await client.mutate({
            mutation: addMessageMutation,
            variables: {
                input: {
                    roomId,
                    message
                }
            }
        })
        handleAuthResponse(data.addMessage)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const getGlobalMessagesSubscriptions = (handleMessageAdded) => async dispatch => {
    try {
        const gloabalMsgSubscription = gql`
           subscription{
            globalMessages{
                    ...MessageData
                }
            }
            ${MessageFragment}
        `
        const observable = client.subscribe({query:  gloabalMsgSubscription})
        return observable.subscribe(({data}) =>  handleMessageAdded(data.globalMessages))
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }

}

export const updateGlobalMessage = (messages) => dispatch => {
    try {
        dispatch({
            type: SET_GLOBAL_MESSAGES,
            payload: messages
        })
    } catch (error) {
        console.error('error: ', error)
        
    }
}

// ** Get User Profile
export const getUserProfile = () => dispatch => {
    dispatch({
        type: GET_USER_PROFILE,
        userProfile: data.profileUser
    })
}

// ** Get Chats & Contacts
export const getChatContacts = () => dispatch => {
    const chatsContacts = data.chats.map(chat => {
        const contact = data.contacts.find(c => c.id === chat.userId)
        contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.chat[chat.chat.length - 1] }
        return contact
      })
      const profileUserData = {
        id: data.profileUser.id,
        avatar: data.profileUser.avatar,
        fullName: data.profileUser.fullName,
        status: data.profileUser.status
      }
    const result = { chatsContacts, contacts: data.contacts, profileUser: profileUserData }
    dispatch({
        type: GET_CHAT_CONTACTS,
        data: result
    })
}

// ** Select Chat
export const selectChat = id => dispatch => {

    let userId = config.id

    //  Convert Id to number
    userId = Number(userId)
  
    const chat = data.chats.find(c => c.id === userId)
    if (chat) chat.unseenMsgs = 0
    const contact = data.contacts.find(c => c.id === userId)
    if (contact.chat) contact.chat.unseenMsgs = 0
    const result = { chat, contact }
    dispatch({ type: SELECT_CHAT, data: result })
    dispatch(getChatContacts())
}

// ** Send Msg
export const sendMsg = obj => {
    let activeChat = data.chats.find(chat => chat.userId === obj.contact.id)

  const newMessageData = {
    message: obj.message,
    time: new Date(),
    senderId: 11
  }
  // If there's new chat for user create one
  let isNewChat = false
  if (activeChat === undefined) {
    isNewChat = true

    const { length } = data.chats
    // const lastId = data.chats[length - 1].id

    data.chats.push({
      id: obj.contact.id,
      userId: obj.contact.id,
      unseenMsgs: 0,
      chat: [newMessageData]
    })
    activeChat = data.chats[data.chats.length - 1]
  } else {
    activeChat.chat.push(newMessageData)
  }

  const response = { newMessageData, id: obj.contact.id }
  if (isNewChat) response.chat = activeChat
  dispatch({ type: SEND_MSG, data: response })
  dispatch(selectChat(obj.contact.id))
  
}
