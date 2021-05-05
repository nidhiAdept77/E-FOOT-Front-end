import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_LOADER} from '../../actions/types'
import client from '../../../graphql/client'
import gql from 'graphql-tag'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import {getFieldValue} from '../../../utils'
import {request} from '../../../utils/apiService'


export const getUserDetails = () => async dispatch => {
    const userId = localStorage.getItem('userId')
    if (userId) {
        const userQuery = gql`
            query userById($id: ID!){
                userById(id: $id){
                    _id
                    firstName
                    lastName
                    roles
                    email
                    isOnline
                    createdAt
                    updatedAt
                    status
                    isOnline
                    profileBg
                    profilePicture
                    userName
                    ability{
                    action
                    subject
                    }
                }
            }
        `
        const {data} = await client.query({
            query: userQuery,
            variables: {
                id: userId
            }
        })
        const userData = getFieldValue(data, 'userById')
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch({
            type: SET_USER_DETAIL,
            payload: userData
        })
        return userData
    }
    return false
}

export const removeUserDetails = () => dispatch => {
    dispatch({
        type: REMOVE_USER_DETAIL,
        payload: {}
    })
}

export const loginUser =  (data) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json'
    }
    try {
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/login`,
            'post',
            headers,
            data
        )
        localStorage.setItem('authToken', getFieldValue(result, 'data.token'))
        localStorage.setItem('userId', getFieldValue(result, 'data.userId'))
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const registerUser = (registerData) => async dispatch => {
    try {
        const {email, password, userName, firstName, lastName} = registerData
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const registerUserMutation = gql`
            mutation registerUser($input: RegisterInput){
                registerUser:registerUser(input: $input){
                    _id
                    firstName
                    lastName
                    email
                    passwordVerificationToken
                    createdAt
                    updatedAt
                    verificationToken
                    roles
                }
            }
        `
        const {data} = await client.mutate({
            mutation: registerUserMutation,
            variables: {
                input: {
                    email,
                    password,
                    userName,
                    firstName,
                    lastName
                }
            }
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return true
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return false
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userData')
    dispatch({
        type: REMOVE_USER_DETAIL,
        payload: {}
    })
}