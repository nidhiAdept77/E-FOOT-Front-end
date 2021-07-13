import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_USERS_ROOMS, SET_ALL_ROOMS, DELETE_USER_ROOM, UPDATE_USER_ROOMS, SET_LOADER} = require('../../types')

export const getUsersRoom = () => async dispatch => {
    try {
        const RoomQuery = gql`
            query{
                roomByUserId{
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
        handleAuthResponse(data.roomByUserId)
        const {success} = data.roomByUserId
        if (success) {
            const roomData = getFieldValue(data, 'z')
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