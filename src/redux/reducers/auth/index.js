import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_LOADER, SET_ONLINE_USERS, REMOVE_ONLINE_USERS} from '../../actions/types'

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
        case REMOVE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: []
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