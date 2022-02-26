import _ from 'underscore'

const { SET_LOADER, SET_DASHBOARD_USER_ID, SET_USER_DASHBOARD, USER_ACTIVITIES, BELL_NOTIFICATIONS, UPDATE_BELL_NOTIFICATIONS } = require('../../types')

const initialState = {
    loading: false,
    dashboardUserId: null,
    userDashboardDetails: {},
    userActivities: [],
    bellNotifications: []
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_DASHBOARD_USER_ID:
            return {
                ...state,
                dashboardUserId: payload
            }
        case SET_USER_DASHBOARD:
            return {
                ...state,
                userDashboardDetails: payload
            }
        case USER_ACTIVITIES:
            return {
                ...state,
                userActivities: payload
            }
        case BELL_NOTIFICATIONS:
            return {
                ...state,
                bellNotifications: payload
            }
        case UPDATE_BELL_NOTIFICATIONS:
            if (localStorage.getItem("userId") === payload?.userId) {
                return {...state, bellNotifications: [...state.bellNotifications, payload]}
            } else {
                return {
                    ...state
                }
            }
        default:
            return state
    }
}