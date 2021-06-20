import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_LAYOUT_SETTINGS, SET_LOADER, SET_TOTAL} = require('../../types')

export const getLayoutSettings = (limit, page, searchString) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const layoutSettingsQuery = gql`
             query getLayoutSettings($limit: Int, $skip: Int, $searchString:String){
                getLayoutSettings(limit: $limit, skip: $skip, searchString:$searchString ){
                statusCode
                success
                message
                data{
                    totalPages
                    skip
                    limit
                    data{
                    _id
                    page
                    position
                    html
                    }
                }
                nextToken
            }
          }`
        const {data} = await client.query({
            query: layoutSettingsQuery,
            variables: {
                limit, 
                skip: (page * limit),
                searchString
            }
        })
        handleAuthResponse(data.getLayoutSettings)
        const {success} = data.getLayoutSettings
        if (success) {
            const layoutSettings = getFieldValue(data, 'getLayoutSettings.data.data')
            if (!_.isEmpty(layoutSettings)) {
                dispatch({
                    type: SET_LAYOUT_SETTINGS,
                    payload: layoutSettings
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getLayoutSettings.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_LAYOUT_SETTINGS,
                    payload: []
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: 0
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
            type: SET_LAYOUT_SETTINGS,
            payload: []
        })
        dispatch({
            type: SET_TOTAL,
            payload: 0
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const removeLayoutSettings = () => async dispatch => {
    dispatch({
        type: SET_LAYOUT_SETTINGS,
        payload: []
    })
    dispatch({
        type: SET_TOTAL,
        payload: 0
    })
}