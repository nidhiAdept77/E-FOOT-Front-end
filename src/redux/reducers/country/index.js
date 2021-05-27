import {SET_LOADER, SET_COUNTRY_DETAILS, REMOVE_COUNTRY_DETAILS} from '../../types'

const initialState = {
    loading: false,
    country: []
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                laoding: payload
            }
        case SET_COUNTRY_DETAILS:
            return {
                ...state,
                country: payload
            }
        case REMOVE_COUNTRY_DETAILS:
            return {
                ...state,
                country: []
            }
        default:
            return state
    }
}