import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_LOADER, SET_USER_DASHBOARD, SET_DASHBOARD_USER_ID, USER_ACTIVITIES} = require('../../types')

export const getDashboardDetails = (userId) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const DashboardQuery = gql`
            query getDashboardDetails($id: String) {
                getDashboardDetails(id: $id) {
                    statusCode
                    success
                    message
                    nextToken
                    data {
                        totalChallenges
                        wins
                        loss
                        lastMatches {
                            challengerName
                            winLoseScore
                            opponentName
                        }
                        position
                        totalPlayers 
                        points
                    }
                }
            }
        `
        const {data} = await client.query({
            query: DashboardQuery,
            variables: {
                id: userId
            }
        })
        handleAuthResponse(data.getDashboardDetails)
        const {success} = data.getDashboardDetails
        if (success) {
            const stats = getFieldValue(data, 'getDashboardDetails.data')
            if (!_.isEmpty(stats)) {
                dispatch({
                    type: SET_USER_DASHBOARD,
                    payload: stats
                })
            } else {
                dispatch({
                    type: SET_USER_DASHBOARD,
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
            type: SET_USER_DASHBOARD,
            payload: []
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const getUserActivities = () => async dispatch => {
    console.log("Called...........")
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const DashboardQuery = gql`
            query getPaginatedUserActivities {
                getPaginatedUserActivities {
                    statusCode
                    success
                    message
                    nextToken
                    data {
                        totalPages
                        skip
                        limit
                        data {
                            userId
                            activityType
                            title
                            message
                            color
                            createdAt
                        }
                    }
                }
            }
        `
        const {data} = await client.query({
            query: DashboardQuery
        })
        handleAuthResponse(data.getPaginatedUserActivities)
        const {success} = data.getPaginatedUserActivities
        if (success) {
            const stats = getFieldValue(data, 'getPaginatedUserActivities.data.data')
            if (!_.isEmpty(stats)) {
                dispatch({
                    type: USER_ACTIVITIES,
                    payload: stats
                })
            } else {
                dispatch({
                    type: USER_ACTIVITIES,
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
            type: USER_ACTIVITIES,
            payload: []
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const setDashboardUserId = value => dispatch => {
    dispatch({ 
        type: SET_DASHBOARD_USER_ID,
        value
    })
}