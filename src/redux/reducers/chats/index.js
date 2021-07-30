const {SET_GLOBAL_MESSAGES, SET_LOADER, GET_USER_PROFILE, GET_CHAT_CONTACTS, SELECT_CHAT, SEND_MSG, SET_CURRENT_CHAT_MESSAGES} = require('../../types')

const initialState = {
    loading: false,
    globalChat: [],
    chats: [],
    contacts: [],
    userProfile: {},
    selectedUser: {}
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
        case GET_CHAT_CONTACTS:
            return { ...state, chats: action.data.chatsContacts, contacts: action.data.contacts }
        case SELECT_CHAT:
            return { ...state, selectedUser: action.data }
        case SEND_MSG:
            // ** Add new msg to chat
            const newMsg = action.data.response.chat
            return { ...state, selectedUser: { ...state.selectedUser, chat: newMsg } }
        case SET_CURRENT_CHAT_MESSAGES:
            return {
                ...state,
                currentChatMessages: payload
            }
        default:
            return state
    }
}