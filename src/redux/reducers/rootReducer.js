// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import layout from './layout'
import toastNotification from './toastNotification'
import auth from './auth'

const rootReducer = combineReducers({
  layout,
  toastNotification,
  auth
})

export default rootReducer
