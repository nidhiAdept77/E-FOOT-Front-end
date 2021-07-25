import {SET_USERS_PAYMENT_METHODS, SET_USERS_TRANSACTIONS, SET_TOTAL, SET_TRANSACTION, SET_LOADER} from '../../types'

const initialState = {
    userPaymentMethods: [],
    userTransactions: [],
    transaction: {},
    total:1,
    loading: false
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
        case SET_TRANSACTION:
            return {
                ...state,
                transaction: payload
            }
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}