const {SET_LAYOUT_SETTINGS, SET_LOADER, SET_TOTAL, SET_LAYOUT_SETTING} = require('../../types')

const initialState = {
    loading: false,
    layoutSettings: [],
    total: 0,
    layoutSetting: {}
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        case SET_LAYOUT_SETTINGS:
            return {
                ...state,
                layoutSettings: payload
            }

        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case SET_LAYOUT_SETTING:
            return {
                ...state,
                layoutSetting: payload
            }
        default:
            return state
    }
}