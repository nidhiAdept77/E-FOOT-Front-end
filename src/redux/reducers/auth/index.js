import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_LOADER, SET_ONLINE_USERS, UPDATE_ONLINE_USERS, REMOVE_ONLINE_USERS,  UPDATE_OFFLINE_USERS} from '../../types'

const initialState = {
    user: {},
    loading: false,
    onlineUsers: []
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                user: payload
            }
        case REMOVE_USER_DETAIL:
            return {
                ...state,
                user: {}
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload
            }
        case UPDATE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: [payload.user, ...state.onlineUsers]
            }
        case REMOVE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: []
            }
        case UPDATE_OFFLINE_USERS:
            return {
                ...state,
                onlineUsers: state.onlineUsers.filter(user => user._id !== payload.user._id)
            }
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}