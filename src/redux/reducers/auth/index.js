import {SET_USER_DETAIL, REMOVE_USER_DETAIL} from '../../actions/types'

const initialState = {
    user: {}
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
        default:
            return state
    }
}