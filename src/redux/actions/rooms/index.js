import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_USERS_ROOMS, SET_ALL_ROOMS, DELETE_USER_ROOM, UPDATE_USER_ROOMS, SET_LOADER, SET_TOTAL} = require('../../types')

export const getUsersRoom = () => async dispatch => {
    try {
        const RoomQuery = gql`
          query {
            roomByUserId {
              statusCode
              success
              data {
                _id
                name
                userIds
                type
                createdAt
                lastMessage {
                  message
                  createdAt
                }
              }
              nextToken
            }
          }
        `
        const {data} = await client.query({
            query: RoomQuery
        })
        handleAuthResponse(data.roomByUserId)
        const {success} = data.roomByUserId
        if (success) {
            const roomData = getFieldValue(data, 'roomByUserId.data')
            if (!_.isEmpty(roomData)) {
                dispatch({
                    type: SET_USERS_ROOMS,
                    payload: roomData
                })
            }
        }
    } catch (error) {
        console.error('error: ', error)
    }
}

export const getPaginatedRooms = (limit, page, searchString) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const RoomQuery = gql`
             query getRooms($limit: Int, $skip: Int, $searchString:String){
                getRooms(limit: $limit, skip: $skip, searchString:$searchString ){
                statusCode
                success
                message
                data{
                    totalPages
                    skip
                    limit
                    data{
                        _id
                        name
                        userIds
                        userNames
                        type
                        default
                    }
                }
                nextToken
            }
          }`
        const {data} = await client.query({
            query: RoomQuery,
            variables: {
                limit, 
                skip: (page * limit),
                searchString
            }
        })
        handleAuthResponse(data.getRooms)
        const {success} = data.getRooms
        if (success) {
            const rooms = getFieldValue(data, 'getRooms.data.data')
            if (!_.isEmpty(rooms)) {
                dispatch({
                    type: SET_ALL_ROOMS,
                    payload: rooms
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getRooms.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_ALL_ROOMS,
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
            type: SET_ALL_ROOMS,
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

export const getRooms = () => async dispatch => {
    try {
        const RoomQuery = gql`
            query{
                rooms{
                    statusCode
                    success
                    data{
                        _id
                        name
                        userIds
                        type
                        default
                    }
                    nextToken
                }
            }
        `
        const {data} = await client.query({
            query: RoomQuery
        })
        handleAuthResponse(data.rooms)
        const {success} = data.rooms
        if (success) {
            const roomData = getFieldValue(data, 'rooms.data')
            if (!_.isEmpty(roomData)) {
                dispatch({
                    type: SET_ALL_ROOMS,
                    payload: roomData
                })
            }
        }
    } catch (error) {
        console.error('error: ', error)
    }
}

export const removeUsersRoom = () => dispatch => {
    dispatch({
        type: SET_USERS_ROOMS,
        payload: []
    })
}

export const removeRooms = () => dispatch => {
    dispatch({
        type: SET_ALL_ROOMS,
        payload: []
    })
}

export const updateRoom = ({id, name, userIds}) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const addRoomMutation = gql`
            mutation addRoom($input: RoomInput){
                addRoom(input: $input){
                    statusCode
                    success
                    message
                    nextToken
                    data{
                        _id
                        name
                        userIds
                    }
                }
            }`
        const {data} = await client.mutate({
            mutation: addRoomMutation,
            variables: {
                input: {
                    _id: id,
                    name,
                    userIds
                }
            }
        })
        handleAuthResponse(data.addRoom)
        dispatch({
            type: UPDATE_USER_ROOMS,
            payload: data.addRoom.data
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.addRoom
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const deleteRoom = (id) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const removeRoomMutation = gql`
            mutation removeRoom($input: RemoveRoomInput){
                removeRoom(input: $input){
                    statusCode
                    success
                    message
                    data{
                        _id
                    }
                }
            }`
        const {data} = await client.mutate({
            mutation: removeRoomMutation,
            variables: {
                input: {
                    _id: id
                }
            }
        })
        handleAuthResponse(data.removeRoom)
        dispatch({
            type: DELETE_USER_ROOM,
            payload: data.removeRoom.data
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.removeRoom
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}