const {SET_GLOBAL_MESSAGES, SET_LOADER, GET_USER_PROFILE, GET_CHAT_CONTACTS, SELECT_CHAT, SEND_MSG, SET_CURRENT_CHAT_MESSAGES} = require('../../types')

const initialState = {
    loading: false,
    globalChat: [],
    userProfile: {},
    currentChatMessages: []
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_GLOBAL_MESSAGES:
            return {
                ...state,
                globalChat: payload
            }
        case GET_USER_PROFILE:
            return { ...state, userProfile: action.userProfile }
        case SET_CURRENT_CHAT_MESSAGES:
            return {
                ...state,
                currentChatMessages: payload
            }
        default:
            return state
    }
}