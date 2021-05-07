// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import layout from './layout'
import toastNotification from './toastNotification'
import auth from './auth'
import country from './country'

const rootReducer = combineReducers({
  layout,
  toastNotification,
  auth,
  country
})

export default rootReducer
