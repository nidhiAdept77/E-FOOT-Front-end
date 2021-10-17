const {SET_CHALLENGES, SET_LOADER, SET_TOTAL, UPDATE_CHALLENGES, REMOVE_CHALLENGES} = require('../../types')

const initialState = {
    loading: false,
    challenges: [],
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
        case SET_CHALLENGES:
            return {
                ...state,
                challenges: payload
            }
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case UPDATE_CHALLENGES:
            const id = payload._id
            if (id) {
                return {
                    ...state,
                    challenges: state.challenges.map(challenge => {
                        if (id === challenge._id) {
                            return payload
                        }
                        return challenge
                    })
                }
            } else {
                return {
                    ...state,
                    challenges: state.challenges.push(payload)
                }
            }
        case REMOVE_CHALLENGES:
            return {
                ...state,
                challenges: state.challenges.map(challenge => challenge !== payload._id)
            }
        default:
            return state
    }
}