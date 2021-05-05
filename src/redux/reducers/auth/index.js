import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_LOADER} from '../../actions/types'

const initialState = {
    user: {},
    loading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                user: payload
            }
        case REMOVE_USER_DETAIL:
            return {
                ...state,
                user: {}
            }
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}