import {HANDLE_CONTENT_WIDTH, HANDLE_MENU_COLLAPSED, HANDLE_MENU_HIDDEN, HANDLE_RTL, HANDLE_ONLINE_USER_HIDDEN, ADD_EDIT_POPUP} from '@src/redux/types'


// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: HANDLE_CONTENT_WIDTH, value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: HANDLE_MENU_COLLAPSED, value })

// ** Handles Menu Hidden State (Bool)
export const handleMenuHidden = value => dispatch => dispatch({ type: HANDLE_MENU_HIDDEN, value })

// ** Handles RTL (Bool)
export const handleRTL = value => dispatch => dispatch({ type: HANDLE_RTL, value })

export const handleStaticPage = value => dispatch => dispatch({ type: HANDLE_STATIC_PAGE, value })

export const handleOnlineUserHidden = value => dispatch => dispatch({ type: HANDLE_ONLINE_USER_HIDDEN, value})

export const setAddEditPopup = value => dispatch => {
    dispatch({ 
        type: ADD_EDIT_POPUP,
        value
    })
}