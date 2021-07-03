import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_LAYOUT_SETTINGS, SET_LOADER, SET_TOTAL, SET_LAYOUT_SETTING} = require('../../types')

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

export const getLayoutSettingById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const layoutSettingsQuery = gql`
             query getLayoutSettingById($id: ID){
                getLayoutSettingById(id: $id){
                statusCode
                success
                message
                data{
                    _id
                    page
                    position
                    html
                }
                nextToken
            }
          }`
        const {data} = await client.query({
            query: layoutSettingsQuery,
            variables: {
                id
            }
        })
        handleAuthResponse(data.getLayoutSettingById)
        const {success} = data.getLayoutSettingById
        if (success) {
            const layoutSetting = getFieldValue(data, 'getLayoutSettingById.data')
            if (!_.isEmpty(layoutSetting)) {
                dispatch({
                    type: SET_LAYOUT_SETTING,
                    payload: layoutSetting
                })
            } else {
                dispatch({
                    type: SET_LAYOUT_SETTING,
                    payload: {}
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
            type: SET_LOADER,
            payload: false
        })
        dispatch({
            type: SET_LAYOUT_SETTING,
            payload: {}
        })
    }
}

export const removeLayourSetting = () => dispatch => {
    dispatch({
        type: SET_LAYOUT_SETTING,
        payload: {}
    })
}
export const updateLayourSetting = ({page, position, html, id, isProdVisible, isQaVisible, isLiveVisible}) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const layoutSettingsMutation = gql`
            mutation layoutSettingsMutation($input: LayoutSettingsInput){
                layoutSettingsMutation(input: $input){
                    statusCode
                    success
                    message
                    nextToken
                    data{
                        page
                        position
                        html
                        createdBy
                        createdAt
                        updatedBy
                        updatedAt
                    }
                }
            }`
        const {data} = await client.mutate({
            mutation: layoutSettingsMutation,
            variables: {
                input: {
                    page,
                    position,
                    html,
                    isProdVisible,
                    isQaVisible,
                    isLiveVisible,
                    _id: id
                }
            }
        })
        handleAuthResponse(data.layoutSettingsMutation)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return data.layoutSettingsMutation
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const getLayoutSettingsBypagePostion = (page, position) => async (dispatch) => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const layoutSettingsQuery = gql`
             query getLayoutSettingsBypagePostion($page: String, $position: String){
                getLayoutSettingsBypagePostion(page: $page, position: $position){
                statusCode
                success
                message
                data{
                    _id
                    page
                    position
                    html
                }
                nextToken
            }
          }`
        const {data} = await client.query({
            query: layoutSettingsQuery,
            variables: {
                page,
                position
            }
        })
        const {success} = data.getLayoutSettingsBypagePostion
        if (success) {
            const layoutSetting = getFieldValue(data, 'getLayoutSettingsBypagePostion.data')
            if (!_.isEmpty(layoutSetting)) {
                dispatch({
                    type: SET_LAYOUT_SETTING,
                    payload: layoutSetting
                })
            } else {
                dispatch({
                    type: SET_LAYOUT_SETTING,
                    payload: {}
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
            type: SET_LOADER,
            payload: false
        })
        dispatch({
            type: SET_LAYOUT_SETTING,
            payload: {}
        })
    }
}
