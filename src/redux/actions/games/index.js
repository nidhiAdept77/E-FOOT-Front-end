import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
const {SET_GAMES, SET_LOADER, SET_UPDATED_GAMES, SET_TOTAL, REMOVE_DELETED_GAMES} = require('../../types')
import {request} from '../../../utils/apiService'
import { CONSTANTS } from '@src/utils/CONSTANTS'


export const getGamesPaginated = (limit, skip, searchString) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const GamesQuery = gql`
            query getPaginatedGames($limit: Int, $skip: Int, $searchString: String){
                getPaginatedGames(limit: $limit, skip: $skip, searchString: $searchString) {
                statusCode
                success
                nextToken
                message
                data {
                    totalPages
                    skip
                    limit
                    data {
                    _id
                    name
                    image_url
                    consoles
                    status
                    createdAt
                    updatedAt
                    }
                }
                }
            }
        `
        const {data} = await client.query({
            query: GamesQuery,
            variables: {
                limit,
                skip,
                searchString
            }
        })
        handleAuthResponse(data.getPaginatedGames)
        const {success} = data.getPaginatedGames
        if (success) {
            const games = getFieldValue(data, 'getPaginatedGames.data.data')
            if (!_.isEmpty(games)) {
                dispatch({
                    type: SET_GAMES,
                    payload: games
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getPaginatedGames.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_GAMES,
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
            type: SET_GAMES,
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

export const getGamesByConsoleId = (consoleId) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const GamesQuery = gql`
            query getGamesByConsoleId($consoleId:ID) {
                getGamesByConsoleId(consoleId: $consoleId) {
                statusCode
                success
                message
                nextToken
                data {
                    _id
                    name
                    image_url
                    status
                    createdAt
                }
                }
            }
        `
        const {data} = await client.query({
            query: GamesQuery,
            variables: {
                consoleId
            }
        })
        handleAuthResponse(data.getGamesByConsoleId)
        const {success} = data.getGamesByConsoleId
        if (success) {
            const games = getFieldValue(data, 'getGamesByConsoleId.data')
            if (!_.isEmpty(games)) {
                dispatch({
                    type: SET_GAMES,
                    payload: games
                })
            } else {
                dispatch({
                    type: SET_GAMES,
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
            type: SET_GAMES,
            payload: []
        })
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}


export const removePaginatedGames = () => dispatch => {
    dispatch({ 
        type: SET_GAMES,
        payload: []
    })
}

export const createUpdateGames = ({name, consoles, imageData, currentObj, isUpdate}) => async dispatch => {
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
    consoles.forEach(console => formData.append("consoles[]", console))
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
            `${CONSTANTS.BACKEND_BASE_URL}/game`,
            'post',
            headers,
            formData
        )
        const gameData = getFieldValue(result, 'data.games')
        if (!_.isEmpty(gameData)) {
            handleAuthResponse(result.data)
            if (!_.isEmpty(gameData)) {
                dispatch({
                    type: SET_UPDATED_GAMES,
                    payload: gameData
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

export const deleteGames = (_id) => async dispatch => {
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
            `${CONSTANTS.BACKEND_BASE_URL}/game`,
            'put',
            headers,
            formData
        )
        const gameData = getFieldValue(result, 'data.id')
        if (!_.isEmpty(gameData)) {
            handleAuthResponse(result.data)
            if (!_.isEmpty(gameData)) {
                dispatch({
                    type: REMOVE_DELETED_GAMES,
                    payload: gameData
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