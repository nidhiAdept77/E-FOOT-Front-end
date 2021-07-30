const initialState = {
  chats: [],
  contacts: [],
  userProfile: {},
  selectedUser: {},
  currentRoom: {}
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE':
      return { ...state, userProfile: action.userProfile }
    case 'GET_CHAT_CONTACTS':
      return { ...state, chats: action.data.chatsContacts, contacts: action.data.contacts }
    case 'SELECT_CHAT':
      return { ...state, selectedUser: action.data }
    case 'SEND_MSG':
      // ** Add new msg to chat
      const newMsg = action.data.response.chat
      return { ...state, selectedUser: { ...state.selectedUser, chat: newMsg } }
    case 'SET_CURRENT_ROOM':
      return {...state, currentRoom: action.data.currentRoom}
    default:
      return state
  }
}

export default chatReducer