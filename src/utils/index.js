import { CONSTANTS } from "./CONSTANTS"

export const getFieldValue = (obj, key) => {
    return key.split(".").reduce((o, x) => {
        return (typeof o === "undefined" || o === null) ? o : o[x]
    }, obj)
}

export const isUserLoggedIn = () => {
    const userId = localStorage.getItem('userId')
    const authToken = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    console.log('userData: ', userData)
    console.log('!!(userId && authToken): ', !!(userId && authToken))
    return !!(userId && authToken)
}


export const isUserAdmin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData && userData.roles.includes(CONSTANTS.USERS_ROLES.ADMIN)
}