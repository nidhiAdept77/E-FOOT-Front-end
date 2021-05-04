import jwtDecode from 'jwt-decode'

const accessTokenKey = 'accessToken'

const  getUserFromToken = (token) => {
  return jwtDecode(token).sub
}

export const  getAccessToken = () => {
  return localStorage.getItem(accessTokenKey)
}

export const  getLoggedInUser = () => {
  const token = getAccessToken()
  if (!token) return null
  return getUserFromToken(token)
}