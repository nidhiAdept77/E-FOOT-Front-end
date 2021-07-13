const {SET_USERS_ROOMS, SET_ALL_ROOMS, DELETE_USER_ROOM, UPDATE_USER_ROOMS, SET_LOADER} = require('../../types')

const initialState = {
    loading: false,
    rooms: [],
    total: 0
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                laoding: payload
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
        case UPDATE_USER_ROOMS:
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (room._id === payload._id) {
                        console.log('payload: ', payload)
                        console.log('room._id === payload._id: ', room._id === payload._id)
                        return payload
                    }
                    return room
                })
            }
        case DELETE_USER_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== payload._id)
            }
        default:
            return state
    }
}