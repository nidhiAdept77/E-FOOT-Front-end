import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_LOADER} from '../../actions/types'
import client from '../../../graphql/client'
import gql from 'graphql-tag'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import {getFieldValue} from '../../../utils'
import {request} from '../../../utils/apiService'


const UserFragemnt = gql`
    fragment UserDetail on Users{
        _id
        firstName
        lastName
        email
        method
        googleId
        facebookId
        firebase{
            web
        }
        roles
        userName
        profilePicture
        isImageOns3
        profileBg
        ability{
            action
            subject
        }
        verificationToken
        status
        isOnline
        bio
        birthDate
        country
        phone
        playStationId
        xboxId
        epicGamesId
        accountNumber
        ibanNumber
        paypalEmail
        createdAt
        updatedAt
    }
`


const getUserData = async () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
        const userQuery = gql`
            query userById($id: ID!){
                userById(id: $id){
                    ...UserDetail
                }
            }
        ${UserFragemnt}
        `
        const {data} = await client.query({
            query: userQuery,
            variables: {
                id: userId
            }
        })
        const userData = getFieldValue(data, 'userById')
        return userData
    }
    return {}
}

export const getUserDetails = () => async dispatch => {
    const userData = await getUserData()
    if (userData) {
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
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/login`,
            'post',
            headers,
            data
        )
        if (result.data.success) {
            localStorage.setItem('authToken', getFieldValue(result, 'data.token'))
            localStorage.setItem('userId', getFieldValue(result, 'data.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(result, 'data.user')))
            await getUserDetails(getFieldValue(result, 'data.userId'))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const loginWithgoogle = (tokenId, googleId) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json'
    }
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/oauth/google`,
            'post',
            headers,
            {
                tokenId,
                googleId
            }
        )
        if (result.data.success) {
            localStorage.setItem('authToken', getFieldValue(result, 'data.token'))
            localStorage.setItem('userId', getFieldValue(result, 'data.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(result, 'data.user')))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
} 

export const loginWithFacebook = (accessToken, userId) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json'
    }
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/oauth/facebook`,
            'post',
            headers,
            {
                accessToken,
                userId
            }
        )
        if (result.data.success) {
            localStorage.setItem('authToken', getFieldValue(result, 'data.token'))
            localStorage.setItem('userId', getFieldValue(result, 'data.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(result, 'data.user')))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
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

export const forgotPassUser = email => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const forgotPassMutation = gql`
            mutation forgotPassword($email:String){
                forgotPassword(email:$email){
                    success
            
                    message
                }
            }
        `
        const {data} = await client.mutate({
            mutation: forgotPassMutation,
            variables: {
                email
            }
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.forgotPassword
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return {success:false, message: error.message}
    }
}

export const resetPassUser = (resetToken, password) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const resetPassMutation = gql`
            mutation resetPassword($input:ResetPasswordInput){
                resetPassword(input:$input){
                    success
                    message
                }
            }
        `
        const {data} = await client.mutate({
            mutation: resetPassMutation,
            variables: {
                input: {
                    resetToken,
                    password
                }
            }
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.resetPassword
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return {success:false, message: error.message}
    }
}

export const updateUserProfile = (userProfileData) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const updateProfileMutation = gql`
           mutation updateProfile($input: ProfileInput){
                updateProfile(input: $input){
                    success
                    message
                    user{
                        ...UserDetail
                    }
                }
            }
            ${UserFragemnt}
        `
        const {data} = await client.mutate({
            mutation: updateProfileMutation,
            variables: {
                input: userProfileData
            }
        })
        const {success} = data.updateProfile
        if (success) {
            const userData = getFieldValue(data, 'updateProfile.user')
            localStorage.setItem('userData', JSON.stringify(userData))
            dispatch({
                type: SET_USER_DETAIL,
                payload: userData
            })
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.updateProfile
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return {success:false, message: error.message}
    }
}

export const addUserFireBaseToken = (token) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const addFireBaseTokenMutation = gql`
           mutation addFireBasetoken($token: String){
                addFireBasetoken(token: $token){
                    success
                    message
                    user{
                        ...UserDetail
                    }
                }
            }
            ${UserFragemnt}
        `
        const {data} = await client.mutate({
            mutation: addFireBaseTokenMutation,
            variables: {
                token
            }
        })
        const {success} = data.addFireBasetoken
        if (success) {
            const userData = getFieldValue(data, 'updateProfile.user')
            localStorage.setItem('userData', JSON.stringify(userData))
            dispatch({
                type: SET_USER_DETAIL,
                payload: userData
            })
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.addFireBasetoken
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return {success:false, message: error.message}
    }
}

export const changeUserPass = (password, oldPassword) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const changePassMutation = gql`
            mutation changePassword($input: ChangePasswordInput){
                changePassword(input:$input){
                    success
                    message
                }
            }
        `
        const {data} = await client.mutate({
            mutation: changePassMutation,
            variables: {
                input: {
                    password,
                    oldPassword
                }
            }
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.changePassword
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return {success:false, message: error.message}
    }
}

export const uploadProfilePhoto = (imageData) => async dispatch => {
    const authtoken = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')

    const headers = {
        // 'Content-Type':'multipart/form-data',
        "x-auth-token": authtoken,
        "x-user-id": userId
    }
    const formData = new FormData()
    formData.append('document', imageData)
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/users/profile-photo`,
            'post',
            headers,
            formData
        )
        const userData = await getUserData()
        dispatch({
            type: SET_USER_DETAIL,
            payload: userData
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
} 

export const setLoader = value => dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: value
    }, 4000)
}