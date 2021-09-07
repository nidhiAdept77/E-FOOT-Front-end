import _ from 'underscore'

const {SET_USERS_ROOMS, SET_ALL_ROOMS, DELETE_USER_ROOM, UPDATE_USER_ROOMS, SET_LOADER, SET_TOTAL, SET_CURRENT_ROOM, SET_PRIVATE_ROOM, SET_LAST_MESSAGE, SET_MESSAGE_NOTIFICATION, REMOVE_MESSAGE_NOTIFICATION} = require('../../types')

const initialState = {
    loading: false,
    rooms: [],
    total: 0,
    currentRoom: {}
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_USERS_ROOMS:
            return {
                ...state,
                rooms: payload
            }
        case SET_ALL_ROOMS:
            return {
                ...state,
                rooms: payload
            }
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case UPDATE_USER_ROOMS:
            const rooms = state.rooms
            const roomFound = _.findWhere(rooms, {_id: payload._id})
            if (roomFound) {
                return {
                    ...state,
                    rooms: rooms.map(room => {
                        if (room._id === payload._id) {
                            return payload
                        }
                        return room
                    })
                }
            } else {
                return {
                    ...state,
                    rooms: [...rooms, payload]
                }
            }
        case DELETE_USER_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== payload._id)
            }
        case SET_CURRENT_ROOM: 
            return {
                ...state,
                currentRoom: state.rooms.find(room => room._id === action.value)
            }
        case SET_PRIVATE_ROOM:
            return {
                ...state,
                currentRoom: payload
            
            }
        case SET_LAST_MESSAGE:
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    const {message, createdAt, roomId} = payload
                    if (room._id === roomId) {
                        room.lastMessage = {
                            message,
                            createdAt
                        }
                    }
                    return room
                })
            }
        case SET_MESSAGE_NOTIFICATION: 
            const userRooms = state.rooms
            userRooms.forEach(room => {
                const notifications = payload.filter(notify => room._id === notify.roomId)
                if (notifications.length) {
                    room.notifications = notifications
                }
            })
            return {
                ...state,
                rooms: userRooms
            }
        case REMOVE_MESSAGE_NOTIFICATION:
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (payload._id === room._id) {
                        room.notifications = []
                    }
                    return room
                })
            }
        default:
            return state
    }
}