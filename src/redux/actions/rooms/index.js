import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_USERS_ROOMS, SET_LOADER} = require('../../actions/types')

export const getUsersRoom = () => async dispatch => {
    try {
        const RoomQuery = gql`
            query{
                roomByUserId{
                    statusCode
                    success
                    data{
                        _id
                        name
                        type
                        default
                    }
                }
            }
        `
        const {data} = await client.query({
            query: RoomQuery
        })
        handleAuthResponse(data.roomByUserId)
        const {success} = data.roomByUserId
        if (success) {
            const roomData = getFieldValue(data, 'roomByUserId.data')
            if (!_.isEmpty(roomData)) {
                dispatch({
                    type: SET_USERS_ROOMS,
                    payload: roomData
                })
            }
        }
    } catch (error) {
        console.error('error: ', error)
    }
}
export const removeUsersRoom = () => dispatch => {
    dispatch({
        type: SET_USERS_ROOMS,
        payload: []
    })
}