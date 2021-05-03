// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import layout from './layout'
import toastNotification from './toastNotification'

const rootReducer = combineReducers({
  layout,
  toastNotification
})

export default rootReducer
