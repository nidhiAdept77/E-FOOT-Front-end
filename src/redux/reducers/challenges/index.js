import _ from 'underscore'

const { SET_CHALLENGES, SET_LOADER, SET_TOTAL, UPDATE_CHALLENGES, REMOVE_CHALLENGES } = require('../../types')

const initialState = {
    loading: false,
    challenges: [],
    total: 0
}

export default (state = initialState, action) => {
    const { type, payload } = action
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
            const list = state.challenges
            const challengeFound = _.findWhere(list, { _id: payload._id })
            const challengeList = state.challenges.map(challenge => {
                if (payload._id === challenge._id) {
                    const data = Object.assign(challenge, payload)
                    // console.log(payload.challengerScore.my)
                    // console.log(payload)
                    // if (payload.opponentScore.my && payload.challengerScore.my) {
                    //     data['status'] = "finished"
                    // } else {
                    data['status'] = payload.status
                    data['type'] = payload.type
                    // }

                    return data
                }
                return challenge
            })
            if (challengeFound) {
                return {
                    ...state,
                    challenges: challengeList
                }
            } else {
                return {
                    ...state,
                    challenges: [...list, payload]
                }
            }
        case REMOVE_CHALLENGES:
            return {
                ...state,
                challenges: state.challenges.filter(challenge => challenge._id !== payload._id)
            }
        default:
            return state
    }
}