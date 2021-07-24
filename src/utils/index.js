import moment from "moment"
import { CONSTANTS } from "./CONSTANTS"
import { callShowTostMessage } from "../redux/actions/toastNotification"
import _ from 'underscore'

export const getFieldValue = (obj, key) => {
    return key.split(".").reduce((o, x) => {
        return (typeof o === "undefined" || o === null) ? o : o[x]
    }, obj)
}

export const removeSigninUserDetails = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userData')
}

export const isUserLoggedIn = () => {
    const userId = localStorage.getItem('userId')
    const authToken = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    const result = !!(userId && 
        authToken && 
        (!!(userData && (!(userData === 'undefined') && !(userData === 'null') && !(userData === '') && !_.isEmpty(userData)))))
    if (!result) {
        removeSigninUserDetails()
    }
    return result
}


export const getFullNameFromUser = user => {
    const _ = require('underscore')
    if (_.isEmpty(user)) {
        return ""
    } if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`
    } if (user.firstName && !user.lastName) {
        return `${user.firstName}`
    } else {
        return `${user.lastName}`
    } 
}

export const getAccessToken = () => {
    const authToken = localStorage.getItem('authToken')
    return authToken
}

export const isUserAdmin = () => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
    return userData && userData.roles && userData.roles.includes(CONSTANTS.USERS_ROLES.ADMIN)
}

export const isUserAdminFromUser = (userData) => {
    return userData && userData.roles && userData.roles.includes(CONSTANTS.USERS_ROLES.ADMIN)
}

export const getTimeString = (date, isNumeric = true) => {
    if (isNumeric) {
        date = parseInt(date)
    }
    const currentData = moment(date)
    const endDate = moment()
    return currentData.to(endDate, true)
}

export const getChatTime = date => {
    return moment(date).format("DD-MM-YYYY hh:mm a")
}

const isANumber = str => {
    return !/\D/.test(str)
}

export const getFormattedDate = date => {
    if (isANumber(date)) {
        date = parseInt(date)
    }
    return moment(date).format("DD-MM-YY")
}

export const handleAuthResponse = (data) => {
    const {success, statusCode, nextToken} = data
    if (success && statusCode === 200) {
        if (nextToken) {
            localStorage.setItem('authToken', nextToken)
        }
        return true
    } else {
        if (data.statusCode === 443) {
            removeSigninUserDetails()
            window.location = "/login"
            callShowTostMessage(data.message, 'error')
        }
        return false
    }
    
}