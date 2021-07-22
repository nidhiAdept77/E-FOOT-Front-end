import {request} from '../../../utils/apiService'
import {getFieldValue, handleAuthResponse, removeSigninUserDetails} from '../../../utils'
import { CONSTANTS } from '@src/utils/CONSTANTS'

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