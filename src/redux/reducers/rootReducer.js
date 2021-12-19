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
import consoles from './consoles'
import games from './games'
import challenges from './challenges'
import dashboard from './dashboard'

const rootReducer = combineReducers({
  layout,
  toastNotification,
  auth,
  country,
  rooms,
  chats,
  layoutSettings,
  wallet,
  consoles,
  games,
  challenges,
  dashboard
})

export default rootReducer
