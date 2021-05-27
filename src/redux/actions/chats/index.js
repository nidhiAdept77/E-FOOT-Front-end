import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import {SET_GLOBAL_MESSAGES, SET_LOADER} from '../../types'


const MessageFragment = gql`
    fragment MessageData on Message {
        _id
        roomId
        message
        user{
            _id
            userName
            name
            profilePicture
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

export const getGlobalMessagesSubsctions = (handleMessageAdded) => async dispatch => {
    try {
        const gloabalMsgSubscripton = gql`
           subscription{
            globalMessages{
                    ...MessageData
                }
            }
            ${MessageFragment}
        `
        const observable = client.subscribe({query:  gloabalMsgSubscripton})
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