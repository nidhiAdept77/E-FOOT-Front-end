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