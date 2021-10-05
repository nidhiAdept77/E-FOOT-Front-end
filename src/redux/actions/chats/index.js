import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import {SET_GLOBAL_MESSAGES, SET_LOADER, GET_USER_PROFILE, GET_CHAT_CONTACTS, SELECT_CHAT, SEND_MSG, SET_CURRENT_CHAT_MESSAGES, SET_LAST_MESSAGE, SET_MESSAGE_NOTIFICATION} from '../../types'

const MessageFragment = gql`
    fragment MessageData on Message {
        _id
        roomId
        message
        createdAt
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

export const addMessageToChannel = (roomId, message, type = null) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const addMessageMutation = type ? gql`
            mutation addRoomMessage($input: MessageInput){
                addRoomMessage(input: $input){
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
        ` : gql`
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
        handleAuthResponse(type ? data.addRoomMessage : data.addMessage)
        if (type === "private") {
            dispatch({
                type: SET_LAST_MESSAGE,
                payload: data.addRoomMessage.data
            })
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

export const setCurrentChatMessages = (roomId) => async dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: true
    })
    try {
        const currentChatMessageQuery = gql`
            query getCurrentChatByRoomId($roomId: String){
                getCurrentChatMessages(roomId: $roomId){
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
            query: currentChatMessageQuery,
            variables: {
                roomId
            }
        })
        handleAuthResponse(data.getCurrentChatMessages)
        const {success} = data.getCurrentChatMessages
        if (success) {
            const messages = getFieldValue(data, 'getCurrentChatMessages.data')
            if (messages && messages.length) { 
                dispatch({
                    type: SET_CURRENT_CHAT_MESSAGES,
                    payload: messages
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

export const updateCurrentChatMessage = (messages) => dispatch => {
    try {
        dispatch({
            type: SET_CURRENT_CHAT_MESSAGES,
            payload: messages
        })
    } catch (error) {
        console.error('error: ', error)
        
    }
}

export const removeCurrentChatMessages = () => dispatch => {
    dispatch({
        type: SET_CURRENT_CHAT_MESSAGES,
        payload: []
    })
}

export const updateLastChatMessage = (message) => dispatch => {
    try {
        dispatch({
            type: SET_LAST_MESSAGE,
            payload: message
        })
    } catch (error) {
        console.error('error: ', error)
    }
}

export const setMesageNotifications = (notifications) => dispatch => {
    try {
        dispatch({
            type: SET_MESSAGE_NOTIFICATION,
            payload: notifications
        })
    } catch (error) {
        console.error('error: ', error)
    }
}


//Chat Subscriptions
export const subsCurrentSeletedChat = (handleCurrentChat) => dispatch => {
    try {
        const CurrentSeletedSubscription = gql`
           subscription{
            currentChat{
                    ...MessageData
                }
            }
            ${MessageFragment}
        `
        const observable = client.subscribe({query:  CurrentSeletedSubscription})
        return observable.subscribe(({data}) => handleCurrentChat(data.currentChat)) 
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const subsLastMessage = (handleLastMessage) => dispatch => {
    try {
        const LastMessageSubscription = gql`
        subscription{
            lastMessageSubs {
              _id
              roomId
              message
              createdAt
            }
          }
        `
        const observable = client.subscribe({query:  LastMessageSubscription})
        return observable.subscribe(({data}) => handleLastMessage(data.lastMessageSubs)) 
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const subsMessageNotifications = (handleMessageNotification) => dispatch => {
    try {
        const messageNotificationSubscription = gql`
        subscription{
            messageNotificationSubs {
              _id
              userId
              roomId
              messageIds
              tag
              createdAt
              updatedAt
              status
            }
          }
        `
        const observable = client.subscribe({query:  messageNotificationSubscription})
        return observable.subscribe(({data}) => handleMessageNotification(data.messageNotificationSubs)) 
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}