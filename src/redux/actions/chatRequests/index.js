import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const { SET_CHAT_REQUESTS, UPDATE_CHAT_REQUESTS, SET_LOADER, SET_TOTAL} = require('../../types')

export const getUserChatRequests = (limit, page, searchString) => async dispatch => {
    console.log('limit: ', limit)
    
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const ChatRequestsQuery = gql`query getChatRequests($limit: Int, $skip: Int, $searchString: String){
            getChatRequests(limit: $limit, skip: $skip, searchString: $searchString){
              statusCode
              success
              message
              nextToken
              data{
                totalPages
                skip
                limit
                data {
                  _id
                  type
                  status
                  createdBy
                  requestedBy {
                    firstName
                    lastName
                    profilePicture
                  }
                }
              }
            }
          }`
        const {data} = await client.query({
            query: ChatRequestsQuery,
            variables: {
                limit, 
                skip: (page * limit),
                searchString
            }
        })
        handleAuthResponse(data.getChatRequests)
        const {success} = data.getChatRequests
        if (success) {
            const rooms = getFieldValue(data, 'getChatRequests.data.data')
            if (!_.isEmpty(rooms)) {
                dispatch({
                    type: SET_CHAT_REQUESTS,
                    payload: rooms
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getChatRequests.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_CHAT_REQUESTS,
                    payload: []
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: 0
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
            type: SET_CHAT_REQUESTS,
            payload: []
        })
        dispatch({
            type: SET_TOTAL,
            payload: 0
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const removeChatRequests = () => dispatch => {
    dispatch({
        type: SET_CHAT_REQUESTS,
        payload: []
    })
}

export const updateChatRequests = ({_id, status}) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const addRoomMutation = gql`
        mutation acceptRejectChatRequest( $input: ChatRequestsAcceptRejectInput ) {
            acceptRejectChatRequest( input: $input  ) {
                statusCode
                success
                message
                data {
                _id
                }
            }
        }`
        const { data } = await client.mutate({
            mutation: addRoomMutation,
            variables: {
                input: {
                    _id,
                    status
                }
            }
        })
        handleAuthResponse(data.acceptRejectChatRequest)
        console.log('data.acceptRejectChatRequest: ', data.acceptRejectChatRequest)
        dispatch({
            type: UPDATE_CHAT_REQUESTS,
            payload: data.acceptRejectChatRequest.data
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.acceptRejectChatRequest
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}
// export const deleteChatRequests = (id) => async dispatch => {
//     try {
//         dispatch({
//             type: SET_LOADER,
//             payload: true
//         })
//         const removeRoomMutation = gql`
//             mutation removeRoom($input: RemoveRoomInput){
//                 removeRoom(input: $input){
//                     statusCode
//                     success
//                     message
//                     data{
//                         _id
//                     }
//                 }
//             }`
//         const {data} = await client.mutate({
//             mutation: removeRoomMutation,
//             variables: {
//                 input: {
//                     _id: id
//                 }
//             }
//         })
//         handleAuthResponse(data.removeRoom)
//         dispatch({
//             type: DELETE_USER_ROOM,
//             payload: data.removeRoom.data
//         })
//         dispatch({
//             type: SET_LOADER,
//             payload: false
//         })
//         return data.removeRoom
//     } catch (error) {
//         console.error('error: ', error)
//         dispatch({
//             type: SET_LOADER,
//             payload: false
//         })
//     }
// }

// rooms subscriptions
// export const subsChatRooms = (handleChatRooms) => dispatch => {
//     try {
//         const chatRoomsSubscription = gql`
//         subscription{
//             chatRoomSubs {
//               _id
//               name
//               userIds
//               type
//               createdAt
//               default
//               profileBg
//               lastMessage {
//                 message
//                 createdAt
//               }
//               notifications{
//                   _id
//                   messageIds
//                   roomId
//                   userId
//               }
//               users {
//                   _id
//                   firstName
//                   lastName
//                   profilePicture
//               }
//             }
//           }
//         `
//         const observable = client.subscribe({query:  chatRoomsSubscription})
//         return observable.subscribe(({data}) => handleChatRooms(data.chatRoomSubs)) 
//     } catch (error) {
//         console.error('error: ', error)
//         dispatch({
//             type: SET_LOADER,
//             payload: false
//         })
//     }
// }