import {SET_USERS_PAYMENT_METHODS, SET_USERS_TRANSACTIONS, SET_TOTAL} from '../../types'

const initialState = {
    userPaymentMethods: [],
    userTransactions: [],
    total:1
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
        case SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        default:
            return state
    }
}