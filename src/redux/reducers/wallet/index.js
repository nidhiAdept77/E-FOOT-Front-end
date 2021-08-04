import {SET_USERS_PAYMENT_METHODS, SET_USERS_TRANSACTIONS, SET_TOTAL, SET_TRANSACTION, SET_LOADER, SET_CASH_POSITION, SET_SUBS_TRANSACTION} from '../../types'

const initialState = {
    userPaymentMethods: [],
    userTransactions: [],
    transaction: {},
    total:1,
    loading: false,
    userCashPosition: {}
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

        case SET_CASH_POSITION:
            return {
                ...state,
                userCashPosition: payload
            }
        case SET_SUBS_TRANSACTION:
            const isPresentIndex = state.userTransactions.findIndex(userTransaction => userTransaction._id === payload._id)
            let transactions
            if (isPresentIndex < 0) {
                transactions = [payload, ...state.userTransactions]
                transactions = transactions.slice(0, 10)
            } else {
                transactions = state.userTransactions
                transactions[isPresentIndex] = payload
            }
            return {
                ...state,
                userTransactions: transactions
            }
        default:
            return state
    }
}