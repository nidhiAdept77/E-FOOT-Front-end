import {SET_USERS_PAYMENT_METHODS, SET_USERS_TRANSACTIONS} from '../../types'

const initialState = {
    userPaymentMethods: [],
    userTransactions: []
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_USERS_PAYMENT_METHODS:
            return {
                ...state,
                userPaymentMethods: payload
            }
        case SET_USERS_TRANSACTIONS:
            return {
                ...state,
                userTransactions: payload
            }
        default:
            return state
    }
}