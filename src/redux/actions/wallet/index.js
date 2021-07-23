import {request} from '../../../utils/apiService'
import {getFieldValue, handleAuthResponse} from '../../../utils'
import { CONSTANTS } from '@src/utils/CONSTANTS'
import {SET_LOADER, SET_USERS_PAYMENT_METHODS} from '../../types'
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