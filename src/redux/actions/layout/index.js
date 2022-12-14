import { HANDLE_CONTENT_WIDTH, HANDLE_MENU_COLLAPSED, HANDLE_MENU_HIDDEN, HANDLE_RTL, HANDLE_ONLINE_USER_HIDDEN, ADD_EDIT_POPUP, ADD_EDIT_POPUP_DATA, DISPUTE_POPUP, TOGGLE_CHALLENGE_MODAL, TOGGLE_ADMIN_DISPUTE_MODAL } from '@src/redux/types'


// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: HANDLE_CONTENT_WIDTH, value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: HANDLE_MENU_COLLAPSED, value })

// ** Handles Menu Hidden State (Bool)
export const handleMenuHidden = value => dispatch => dispatch({ type: HANDLE_MENU_HIDDEN, value })

// ** Handles RTL (Bool)
export const handleRTL = value => dispatch => dispatch({ type: HANDLE_RTL, value })

export const handleStaticPage = value => dispatch => dispatch({ type: HANDLE_STATIC_PAGE, value })

export const handleOnlineUserHidden = value => dispatch => dispatch({ type: HANDLE_ONLINE_USER_HIDDEN, value })

export const setAddEditPopup = value => dispatch => {
    dispatch({
        type: ADD_EDIT_POPUP,
        value
    })
}

export const setAddEditPopupData = value => dispatch => dispatch({
    type: ADD_EDIT_POPUP_DATA,
    value
})

export const setDisputePopup = value => dispatch => {
    dispatch({
        type: DISPUTE_POPUP,
        value
    })
}

export const toggleChallengeModal = value => dispatch => {
    dispatch({
        type: TOGGLE_CHALLENGE_MODAL,
        value
    })
}

export const toggleAdminDisputeModal = value => dispatch => {
    dispatch({
        type: TOGGLE_ADMIN_DISPUTE_MODAL,
        value
    })
}