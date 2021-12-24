import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_LOADER, BELL_NOTIFICATIONS} = require('../../types')

export const getBellNotifications = () => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const bellNotificationQuery = gql`
           query getBellNotification{
                getBellNotification{
                    statusCode
                    success
                    nextToken
                    data {
                    _id
                    userId
                    title
                    message
                    color
                    createdAt
                    }
                }
            }
        `
        const {data} = await client.query({
            query: bellNotificationQuery
        })
        handleAuthResponse(data.getBellNotification)
        const {success} = data.getBellNotification
        if (success) {
            const notifications = getFieldValue(data, 'getBellNotification.data')
            if (!_.isEmpty(notifications)) {
                dispatch({
                    type: BELL_NOTIFICATIONS,
                    payload: notifications
                })
            } else {
                dispatch({
                    type: BELL_NOTIFICATIONS,
                    payload: []
                })
            }
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: BELL_NOTIFICATIONS,
            payload: []
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}