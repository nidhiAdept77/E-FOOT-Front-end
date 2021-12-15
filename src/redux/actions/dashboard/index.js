import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_LOADER, SET_USER_DASHBOARD} = require('../../types')

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
            const stats = getFieldValue(data, 'getDashboardDetails.data.data')
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