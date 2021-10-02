import _ from 'underscore'

const {SET_CONSOLES, SET_LOADER, SET_TOTAL, SET_UPDATED_CONSOLE, REMOVE_DELETED_CONSOLE } = require('../../types')

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
            const consoles = state.consoles
            const consoleFound = _.findWhere(consoles, {_id: payload._id})
            if (consoleFound) {
                return {
                    ...state,
                    consoles: consoles.map(console => {
                        if (console._id === payload._id) {
                            return payload
                        }
                        return console
                    })
                }
            } else {
                return {
                    ...state,
                    consoles: [...consoles, payload]
                }
            }
        case REMOVE_DELETED_CONSOLE:
                return {
                    ...state,
                    consoles: state.consoles.filter(console => console._id !== payload)
                }
        default:
            return state
    }
}