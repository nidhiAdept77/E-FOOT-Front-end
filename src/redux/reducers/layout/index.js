// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'
import {HANDLE_CONTENT_WIDTH, HANDLE_MENU_COLLAPSED, HANDLE_MENU_HIDDEN, HANDLE_RTL, HANDLE_ONLINE_USER_HIDDEN} from '@src/redux/actions/types'
// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Initial State
const initialState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  showOnlineUserPopup: false
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CONTENT_WIDTH:
      return { ...state, contentWidth: action.value }
    case HANDLE_MENU_COLLAPSED:
      window.localStorage.setItem('menuCollapsed', action.value)
      return { ...state, menuCollapsed: action.value }
    case HANDLE_MENU_HIDDEN:
      return { ...state, menuHidden: action.value }
    case HANDLE_RTL:
      return { ...state, isRTL: action.value }
    case HANDLE_ONLINE_USER_HIDDEN:
      return {...state, showOnlineUserPopup: action.value}
    default:
      return state
  }
}

export default layoutReducer
