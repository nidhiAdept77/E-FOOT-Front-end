import _ from 'underscore'

const { SET_GAMES, SET_LOADER, SET_TOTAL, SET_UPDATED_GAMES } = require('../../types')

const initialState = {
    loading: false,
    games: [],
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
        case SET_GAMES:
            return {
                ...state,
                games: payload
            }
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        case SET_UPDATED_GAMES:
            const games = state.games
            const gameFound = _.findWhere(games, {_id: payload._id})
            if (gameFound) {
                return {
                    ...state,
                    games: games.map(game => {
                        if (game._id === payload._id) {
                            return payload
                        }
                        return game
                    })
                }
            } else {
                return {
                    ...state,
                    games: [...games, payload]
                }
            }
        default:
            return state
    }
}