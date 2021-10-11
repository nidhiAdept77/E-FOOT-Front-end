import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_CONSOLES, SET_LOADER, SET_TOTAL, SET_UPDATED_CONSOLE, REMOVE_DELETED_CONSOLE} = require('../../types')
import {request} from '../../../utils/apiService'
import { CONSTANTS } from '@src/utils/CONSTANTS'


export const getConsolesPaginated = (limit, skip, searchString) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const ConsolesQuery = gql`
            query getPaginatedConsoles($limit: Int, $skip: Int, $searchString: String) {
                getPaginatedConsoles(limit: $limit, skip: $skip, searchString: $searchString){
                    statusCode
                    success
                    nextToken
                    message
                    data{
                    totalPages
                    skip
                    limit
                    data{
                        _id
                        name
                        status
                        image_url
                        createdAt
                    }
                    }
                }
            }
        `
        const {data} = await client.query({
            query: ConsolesQuery,
            variables: {
                limit,
                skip,
                searchString
            }
        })
        handleAuthResponse(data.getPaginatedConsoles)
        const {success} = data.getPaginatedConsoles
        if (success) {
            const rooms = getFieldValue(data, 'getPaginatedConsoles.data.data')
            if (!_.isEmpty(rooms)) {
                dispatch({
                    type: SET_CONSOLES,
                    payload: rooms
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getPaginatedConsoles.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_CONSOLES,
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
            type: SET_CONSOLES,
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

export const removePaginatedConsoles = () => dispatch => {
    dispatch({ 
        type: SET_CONSOLES,
        payload: []
    })
}

export const createUpdateConsoles = ({name, imageData, currentObj, isUpdate}) => async dispatch => {
    const authtoken = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const {getFieldValue} = require('../../../utils')
    const _ = require('underscore')

    const headers = {
        "x-auth-token": authtoken,
        "x-user-id": userId
    }
    const formData = new FormData()
    formData.append('document', imageData)
    formData.append('name', name)
    if (isUpdate) {
        formData.append('status', currentObj.status)
        formData.append('id', currentObj._id)
    }
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/console`,
            'post',
            headers,
            formData
        )
        const consoleData = getFieldValue(result, 'data.consoles')
        if (!_.isEmpty(consoleData)) {
            handleAuthResponse(result.data)
            if (!_.isEmpty(consoleData)) {
                dispatch({
                    type: SET_UPDATED_CONSOLE,
                    payload: consoleData
                })
            }
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}

export const getConsoles = () => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const ConsolesQuery = gql`
        query getConsoles {
            getConsoles {
              statusCode
              success
              nextToken
              message
              data {
                _id
                name
                image_url
                createdAt
                status
              }
            }  
          }
        `
        const {data} = await client.query({
            query: ConsolesQuery
        })
        handleAuthResponse(data.getConsoles)
        const {success} = data.getConsoles
        if (success) {
            const consoles = getFieldValue(data, 'getConsoles.data')
            if (!_.isEmpty(consoles)) {
                dispatch({
                    type: SET_CONSOLES,
                    payload: consoles
                })
            } else {
                dispatch({
                    type: SET_CONSOLES,
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
            type: SET_CONSOLES,
            payload: []
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const deleteConsoles = (_id) => async dispatch => {
    const authtoken = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const {getFieldValue} = require('../../../utils')
    const _ = require('underscore')

    const headers = {
        "x-auth-token": authtoken,
        "x-user-id": userId
    }
    const formData = new FormData()
    formData.append('id', _id)
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const result = await request(
            `${CONSTANTS.BACKEND_BASE_URL}/console`,
            'put',
            headers,
            formData
        )
        const consoleData = getFieldValue(result, 'data.id')
        if (!_.isEmpty(consoleData)) {
            handleAuthResponse(result.data)
            if (!_.isEmpty(consoleData)) {
                dispatch({
                    type: REMOVE_DELETED_CONSOLE,
                    payload: consoleData
                })
            }
        }
        dispatch({
            type: SET_LOADER,
            payload: false
        })
        return result.data
    } catch (error) {
        console.error('error: ', error)
        return {success:false, message:[error.message]}
    }
}