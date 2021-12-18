import _ from 'underscore'

const { SET_LOADER, SET_DASHBOARD_USER_ID, SET_USER_DASHBOARD, USER_ACTIVITIES } = require('../../types')

const initialState = {
    loading: false,
    dashboardUserId: localStorage.getItem("userId") || null,
    userDashboardDetails: {},
    userActivities: []
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
        default:
            return state
    }
}