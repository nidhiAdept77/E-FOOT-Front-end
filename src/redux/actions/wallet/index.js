import {request} from '../../../utils/apiService'
import {getFieldValue, handleAuthResponse} from '../../../utils'
import { CONSTANTS } from '@src/utils/CONSTANTS'
import {SET_LOADER, SET_USERS_PAYMENT_METHODS, SET_USERS_TRANSACTIONS, SET_TOTAL} from '../../types'
import client from '../../../graphql/client'
import gql from 'graphql-tag'


export const addUserPaymentMethods = () => async dispatch => {
    const authtoken = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const {getFieldValue} = require('../../../utils')
    const _ = require('underscore')

    const headers = {
        "Access-Control-Allow-Origin": "*"
    }
    try {
        const {data:{data:{redirectUrl}}} = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/payment/paypalConnect/${userId}`,
            'get',
            headers
        )
        console.log('redirectUrl: ', redirectUrl)
        window.location.href = redirectUrl
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const depositAmount = () => async dispatch => {
    const authtoken = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const {getFieldValue} = require('../../../utils')
    const _ = require('underscore')

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": authtoken,
        "x-user-id": userId
    }
    try {
        const {data:{data:{redirectUrl}}} = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/payment/paypalpay?amount=${2}`,
            'get',
            headers
        )
        console.log('redirectUrl: ', redirectUrl)
        window.location.href = redirectUrl
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const getAllUserPaymentMethods = () => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const UserPaymentMethodsQuery = gql`
            query getAllUserPaymentMethods{
                getAllUserPaymentMethods{
                statusCode
                success
                message
                nextToken
                data{
                    _id
                    status
                    paypal{
                        verified
                        paypalId
                        paypalEmailId
                    }
                    createdAt
                    updatedAt
                }
                }
            }
        `
        const  {data} = await client.query({
            query: UserPaymentMethodsQuery
        })
        handleAuthResponse(data.getAllUserPaymentMethods)
        const {success} = data.getAllUserPaymentMethods
        if (success) {
            const paymentMethods = getFieldValue(data, 'getAllUserPaymentMethods.data')
            dispatch({
                type: SET_USERS_PAYMENT_METHODS,
                payload: paymentMethods
            })
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        
    } catch (error) {
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const removeAllUserPaymentMethods = () => async dispatch => {
    dispatch({
        type: SET_USERS_PAYMENT_METHODS,
        payload:[]
    })
}

export const getUserTransactions = (limit, page, searchString) => async dispatch => {
    console.log('limit, page, searchString: ', limit, page, searchString)
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const UsersTransactionsQuery = gql`
            query getPaginatedTransactions($limit: Int, $skip: Int, $searchString: String){
                getPaginatedTransactions(limit: $limit, skip: $skip, searchString: $searchString){
                    statusCode
                    success
                    message
                    nextToken
                    data {
                        totalPages
                        skip
                        limit
                        data {
                            txnId
                            amount
                            closingBalance
                            type
                            transactionType
                            reason
                        }
                    }
                }
            }
        `
        const  {data} = await client.query({
            query: UsersTransactionsQuery,
            variables: {
                limit, 
                skip: (page * limit),
                searchString
            }
        })
        handleAuthResponse(data.getPaginatedTransactions)
        const {success} = data.getPaginatedTransactions
        console.log('data.getPaginatedTransactions: ', data.getPaginatedTransactions)
        if (success) {
            const transactions = getFieldValue(data, 'getPaginatedTransactions.data')
            dispatch({
                type: SET_USERS_TRANSACTIONS,
                payload: transactions.data
            })
            console.log('transactions: ', transactions)
            console.log('transactions.totalPages: ', transactions.totalPages)
            dispatch({
                type: SET_TOTAL,
                payload: transactions.totalPages || 1
            })
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        
    } catch (error) {
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const removeUserTrasaction = () => async dispatch => {
    dispatch({
        type: SET_USERS_TRANSACTIONS,
        payload: []
    })
}

export const getTransaction = (txnId) => async dispatch => {
    console.log('txnId: ', txnId)
    const {SET_TRANSACTION, SET_LOADER} = require('../../types')
    dispatch({
        type: SET_LOADER,
        payload: true
    })
    
    try {
        const TransactionQuery = gql`
           query getTransactionsByTxnId($txnId: String){
                getTransactionsByTxnId(txnId: $txnId){
                    statusCode
                    success
                    message
                    nextToken
                    data{
                        _id
                        amount
                        type
                        transactionType
                        reason
                    }
                }
                }
        `
        const  {data} = await client.query({
            query: TransactionQuery,
            variables: {
                txnId
            }
        })
        handleAuthResponse(data.getTransactionsByTxnId)
        const {success} = data.getTransactionsByTxnId
        if (success) {
            console.log('data: ', data)
            const transaction = getFieldValue(data, 'getTransactionsByTxnId.data')
            console.log('transaction: ', transaction)
            dispatch({
                type: SET_TRANSACTION,
                payload: transaction
            })
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    } catch (error) {
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const removeTransaction = () => dispatch => {
    const {SET_TRANSACTION} = require('../../types')
    dispatch({
        type: SET_TRANSACTION,
        payload: {}
    })
    
}