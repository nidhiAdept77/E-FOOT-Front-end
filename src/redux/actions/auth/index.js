import {SET_USER_DETAIL, REMOVE_USER_DETAIL} from '../../actions/types'
import client from '../../../graphql/client'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import {getFieldValue} from '../../../utils'
import {request} from '../../../utils/apiService'


export const gerUserDetails = async userId => dispatch => {

}

export const loginUser =  (data) => async dispatch => {
    console.log('data: ', data)
    const headers = {
        'Content-Type': 'application/json'
    }
    try {
        console.log(`${CONSTANTS.BACKEND_BASE_URL}/user/login`)
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/login`,
            'post',
            {
                'Content-Type': 'application/json'
            },
            data
        )
        localStorage.setItem('authToken', getFieldValue(result, 'data.token'))
        localStorage.setItem('userId', getFieldValue(result, 'data.userId'))
    } catch (error) {
        console.log('error: ', error)
        
    }
}

export const registerUser = async (email, password, username) => dispatch => {

}