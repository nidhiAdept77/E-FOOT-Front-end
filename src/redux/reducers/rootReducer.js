// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import layout from './layout'
import toastNotification from './toastNotification'
import auth from './auth'
import country from './country'
import rooms from './rooms'
import chats from './chats'
import layoutSettings from './layoutSettings'
import wallet from './wallet'

const rootReducer = combineReducers({
  layout,
  toastNotification,
  auth,
  country,
  rooms,
  chats,
  layoutSettings,
  wallet
})

export default rootReducer
