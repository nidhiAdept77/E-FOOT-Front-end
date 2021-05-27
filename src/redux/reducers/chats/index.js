const {SET_GLOBAL_MESSAGES, SET_LOADER} = require('../../types')

const initialState = {
    loading: false,
    globalChat: []
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_GLOBAL_MESSAGES:
            return {
                ...state,
                globalChat: payload
            }
        default:
            return state
    }
}