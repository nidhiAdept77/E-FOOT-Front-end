const {SET_CHALLENGES, SET_LOADER} = require('../../types')

const initialState = {
    loading: false,
    challenges: []
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_CHALLENGES:
            return {
                ...state,
                challenges: payload
            }
        default:
            return state
    }
}