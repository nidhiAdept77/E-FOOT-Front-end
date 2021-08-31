import _ from 'underscore'

const {SET_CONSOLES, SET_LOADER, SET_TOTAL, SET_UPDATED_CONSOLE } = require('../../types')

const initialState = {
    loading: false,
    consoles: [],
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
        case SET_CONSOLES:
            return {
                ...state,
                consoles: payload
            }
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case SET_UPDATED_CONSOLE:
            const isPresentIndex = state.consoles.findIndex(userTransaction => userTransaction._id === payload._id)
            let consoles
            if (isPresentIndex < 0) {
                consoles = [payload, ...state.consoles]
                consoles = consoles.slice(0, 10)
            } else {
                consoles = state.consoles
                consoles[isPresentIndex] = payload
            }
            return {
                ...state,
                consoles
            }
        default:
            return state
    }
}