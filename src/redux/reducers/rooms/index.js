const {SET_USERS_ROOMS, SET_LOADER} = require('../../types')

const initialState = {
    loading: false,
    rooms: [],
    total: 0
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                laoding: payload
            }
        case SET_USERS_ROOMS:
            return {
                ...state,
                rooms: payload
            }
        default:
            return state
    }
}