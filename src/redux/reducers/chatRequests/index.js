import _ from 'underscore'

const {SET_CHAT_REQUESTS, SET_LOADER, SET_TOTAL} = require('../../types')

const initialState = {
    loading: false,
    chatRequests: [],
    total: 0
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case SET_CHAT_REQUESTS:
            return {
                ...state,
                chatRequests: payload
            }
        default:
            return state
    }
}