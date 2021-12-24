import _ from 'underscore'

const {SET_CHAT_REQUESTS, SET_LOADER, SET_TOTAL, UPDATE_CHAT_REQUESTS} = require('../../types')

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
        case UPDATE_CHAT_REQUESTS:
            const chatRequests = state.chatRequests || []
            const {status, _id} = payload
            return {
                ...state,
                chatRequests: chatRequests.map(request => {
                    if (request._id === _id) {
                        request.status = status
                    }
                    return request
                })
            }
        default:
            return state
    }
}