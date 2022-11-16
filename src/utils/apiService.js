// import { history } from '../App'
import { history } from '../history'
const axios = require('axios')

/**
 * [request description]
 * @param  {[string]} url       URL of the API which needs to be consumed by client
 * @param  {[string]} method    Method type of the API call currently GET,POST,PUT,DELETE is supported in order suport to more methods add method name to the array -> allowedMethodTypes
 * @param  {[JSON]} payload     Payload to be provided to server for sending data
 * @param  {[string]} headers   Request Headers required by the server side to process the API call
 * @return {[JSON]}             Response provided by the server side code
 */

export function request(url, method, headers, payload) {
  return new Promise((resolve, reject) => {
    const allowedMethodTypes = ['get', 'post', 'put', 'delete']
    if (allowedMethodTypes.indexOf(method.toLowerCase()) < 0) {
      throw new Error(
        `Invalid method type please provide one of these methods... \n ${allowedMethodTypes}`
      )
    } else {

      axios({
        method,
        url,
        data: payload,
        headers
      })
        .then((response) => {
          // response fetched successfully
          resolve(response)
          /* response.headers['x-auth-token'] && localStorage.setItem('token', response.headers['x-auth-token'])  */
        })
        .catch((error) => {
          // error from api
          if (error.response && error.response.status === 440) {
            localStorage.removeItem('token')
            localStorage.removeItem('areMapTermsAgreed')
            localStorage.removeItem('mapType')
            localStorage.removeItem('mapCenter')
            localStorage.removeItem('mapZoom')
            localStorage.removeItem('selectedMapArea')
            history.push('/login')
          }
          reject(error)
        })
    }
  })
}
