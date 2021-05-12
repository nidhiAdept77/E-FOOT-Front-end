import moment from "moment"
import { CONSTANTS } from "./CONSTANTS"
import {history} from '@src/history'
import {logoutUser } from '@src/redux/actions/auth'
import { callShowTostMessage } from "../redux/actions/toastNotification"


export const getFieldValue = (obj, key) => {
    return key.split(".").reduce((o, x) => {
        return (typeof o === "undefined" || o === null) ? o : o[x]
    }, obj)
}

export const isUserLoggedIn = () => {
    const userId = localStorage.getItem('userId')
    const authToken = localStorage.getItem('authToken')
    return !!(userId && authToken)
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
    return userData && userData.roles.includes(CONSTANTS.USERS_ROLES.ADMIN)
}

export const getTimeString = (date) => {
    date = parseInt(date)
    const currentData = moment(date)
    const endDate = moment()
    return currentData.to(endDate, true)
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
            localStorage.removeItem('authToken')
            localStorage.removeItem('userId')
            localStorage.removeItem('userData')
            window.location = "/login"
            callShowTostMessage(data.message, 'error')
        }
        return false
    }
    
}