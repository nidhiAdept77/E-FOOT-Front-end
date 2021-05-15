import {SET_USER_DETAIL, REMOVE_USER_DETAIL, SET_ONLINE_USERS, REMOVE_ONLINE_USERS, UPDATE_ONLINE_USERS, SET_LOADER, UPDATE_OFFLINE_USERS} from '../../actions/types'
import client from '../../../graphql/client'
import gql from 'graphql-tag'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import {getFieldValue, handleAuthResponse, removeSigninUserDetails} from '../../../utils'
import {request} from '../../../utils/apiService'
import _ from 'underscore'

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
    try {
        if (userId) {
            const userQuery = gql`
                query userById($id: ID!){
                    userById(id: $id){
                        statusCode
                        success
                        nextToken
                        message
                        user{
                            ...UserDetail
                        }
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
            handleAuthResponse(data.userById)
            if (getFieldValue(data, 'userById.success')) {
                const userData = getFieldValue(data, 'userById.user')
                return userData
            }
            return {}
        }
        return {}
    } catch (error) {
        console.error('error: ', error)
        return {}
    }
}

export const getUserDetails = () => async dispatch => {
    const userData = await getUserData()
    if (!_.isEmpty(userData)) {
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

export const loginUser =  ({email, password}) => async dispatch => {

    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const loginMutation = gql`
            mutation userLogin($input: LoginInput){
                userLogin(input:$input){
                    success
                    statusCode
                    token
                    user{
                        ...UserDetail
                    }
                }
            }
            ${UserFragemnt}`
        const {data} = await client.mutate({
            mutation: loginMutation,
            variables: {
                input: {
                    email,
                    password
                }
            }
        })
        if (data.userLogin.success) {
            localStorage.setItem('authToken', getFieldValue(data, 'userLogin.token'))
            localStorage.setItem('userId', getFieldValue(data, 'userLogin.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(data, 'userLogin.user')))
            await getUserDetails(getFieldValue(data, 'userLogin.userId'))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.userLogin
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const loginWithgoogle = (tokenId, googleId) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const loginGoogleMutation = gql`
            mutation userGoogleLogin($input: LoginGoogleInput){
                userGoogleLogin(input: $input){
                    success
                    statusCode
                    token
                    user{
                        ...UserDetail
                    }
                }
            }
            ${UserFragemnt}`
        const {data} = await client.mutate({
            mutation: loginGoogleMutation,
            variables: {
                input: {
                    tokenId, 
                    googleId
                }
            }
        })
        if (data.userGoogleLogin.success) {
            localStorage.setItem('authToken', getFieldValue(data, 'userGoogleLogin.token'))
            localStorage.setItem('userId', getFieldValue(data, 'userGoogleLogin.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(data, 'userGoogleLogin.user')))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.userGoogleLogin
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
} 

export const loginWithFacebook = (accessToken, userId) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const loginFacebookMutation = gql`
            mutation userFacebookLogin($input: LoginFbInput){
                userFacebookLogin(input:$input){
                    success
                    statusCode
                    token
                    user{
                        ...UserDetail
                    }
                }
            }
            ${UserFragemnt}`
        const {data} = await client.mutate({
            mutation: loginFacebookMutation,
            variables: {
                input: {
                    accessToken, 
                    userId
                }
            }
        })
        if (data.userFacebookLogin.success) {
            localStorage.setItem('authToken', getFieldValue(data, 'userFacebookLogin.token'))
            localStorage.setItem('userId', getFieldValue(data, 'userFacebookLogin.user._id'))
            localStorage.setItem('userData', JSON.stringify(getFieldValue(data, 'userFacebookLogin.user')))
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.userFacebookLogin
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

export const logoutUser = () => async dispatch => {
    const logoutMutate = gql`
        mutation {
            logOutUser{
                statusCode
                success
                message
            }
        }
    `
    const {data} = await client.mutate({
        mutation: logoutMutate
    })
    if (data.logOutUser.success) {
        removeSigninUserDetails()
        dispatch({
            type: REMOVE_USER_DETAIL,
            payload: {}
        })
    }
    return data.logOutUser
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
                    statusCode
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
                    statusCode
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
                    statusCode
                    success
                    message
                    nextToken
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
        handleAuthResponse(data.updateProfile)
        const {success} = data.updateProfile
        if (success) {
            const userData = getFieldValue(data, 'updateProfile.user')
            if (!_.isEmpty(userData)) {
                localStorage.setItem('userData', JSON.stringify(userData))
                dispatch({
                    type: SET_USER_DETAIL,
                    payload: userData
                })
            }
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
                    statusCode
                    success
                    message
                    nextToken
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
        handleAuthResponse(data.addFireBasetoken)
        const {success} = data.addFireBasetoken
        if (success) {
            const userData = getFieldValue(data, 'updateProfile.user')
            if (!_.isEmpty(userDetails)) {
                localStorage.setItem('userData', JSON.stringify(userData))
                dispatch({
                    type: SET_USER_DETAIL,
                    payload: userData
                })
            }
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
                    statusCode
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
    const {getFieldValue} = require('../../../utils')
    const _ = require('underscore')

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
        const userData = await getUserData(getFieldValue(result, 'data.user'))
        if (!_.isEmpty(userData)) {
            handleAuthResponse(result.data)
            if (!_.isEmpty(userData)) {
                dispatch({
                    type: SET_USER_DETAIL,
                    payload: userData
                })
            }
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

export const setLoader = value => dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: value
    }, 4000)
}

export const getAllOnlineUserSubs = (handleUserAdded) => dispatch => {
    try {
        const onlineSubscription = gql`
           subscription{
                onlineUsers{
                    _id
                    firstName
                    lastName
                    profilePicture
                    profileBg
                    isOnline
                }
            }
        `
        const observable = client.subscribe({query:  onlineSubscription})
        return observable.subscribe(({data}) =>  handleUserAdded(data.onlineUsers))
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }

}

export const updateOnlineUsers = (user) => dispatch => {
    if (user.isOnline) {
        dispatch({
            type: UPDATE_ONLINE_USERS,
            payload: {user}
        })
    } else {
        dispatch({
            type: UPDATE_OFFLINE_USERS,
            payload: {user}
        })
    }
}

export const getInitOnlineUsers = () => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const InitOnlineUser = gql`
            mutation{
            getOnlineUsers{
                statusCode
                success
                nextToken
                data{
                    _id
                    firstName
                    lastName
                    lastName 
                    profilePicture 
                    isImageOns3 
                    profileBg 
                    updatedAt
                    isOnline
                }
            }
            }
        `
        const result = await client.mutate({
            mutation:InitOnlineUser
        })
        const data = result.data
        handleAuthResponse(data.getOnlineUsers)
        dispatch({
            type: SET_ONLINE_USERS,
            payload: data.getOnlineUsers.data
        })

        dispatch({
            type: SET_LOADER,
            payload: false
        })
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const removeOnlineUsers = () => dispatch => {
    dispatch({
        type: REMOVE_ONLINE_USERS
    })
}