import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import { SET_LOADER, SET_CHALLENGES, SET_TOTAL } from '../../types'
import { showToastMessage } from '../toastNotification'


export const createUpdateChallenge = ({type, status, gameId, consoleId}) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const createUpdateChallengeMutation = gql`
            mutation createUpdateChallenge($input: ChallengeInput){
                createUpdateChallenge(input: $input){
                    statusCode
                    success
                    message
                    nextToken
                    data {
                        _id
                    }
                }
            }
        `
        const {data} = await client.mutate({
            mutation: createUpdateChallengeMutation,
            variables: {
                input: {
                    status,
                    gameId,
                    consoleId,
                    type
                }
            }
        })
        handleAuthResponse(data.createUpdateChallenge)
        const {success} = data.createUpdateChallenge
        if (success) {
            dispatch({
                type: SET_LOADER,
                payload: false
            })
            if (data.createUpdateChallenge.data._id) {
                dispatch(showToastMessage("Challenge created!", 'success'))
            }
            return data.createUpdateChallenge
        } else {
            dispatch(showToastMessage(data.createUpdateChallenge.message, 'error'))
        }
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const getPaginatedChallenges = (limit = -1, page = -1, searchString = "", type = "public") => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const ChallengeQuery = gql`
        query getChallenges($limit:Int, $skip: Int, $searchString: String, $type: String) {
            getChallenges(limit: $limit, skip: $skip, searchString: $searchString, type: $type) {
              statusCode
              success
              message
              nextToken
              data {
                totalPages
                skip
                limit
                  data {
                  _id
                  status
                  type
                  consoleId
                  gameId
                  challenger
                  acceptor
                  createdAt
                  gameImage
                  gameName
                  consoleName
                  challengerName
                }
              }
            }
          }`
        const {data} = await client.query({
            query: ChallengeQuery,
            variables: {
                limit, 
                skip: (page * limit),
                searchString,
                type
            }
        })
        handleAuthResponse(data.getChallenges)
        const {success} = data.getChallenges
        console.log('data.getChallenges: ', data.getChallenges)
        if (success) {
            const challenges = getFieldValue(data, 'getChallenges.data.data')
            if (!_.isEmpty(challenges)) {
                dispatch({
                    type: SET_CHALLENGES,
                    payload: challenges
                })
                dispatch({
                    type: SET_TOTAL,
                    payload: getFieldValue(data, 'getChallenges.data.totalPages')
                })
            } else {
                dispatch({
                    type: SET_CHALLENGES,
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
            type: SET_CHALLENGES,
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

export const removeChallenges = () => dispatch => {
    dispatch({
        type: SET_CHALLENGES,
        payload: []
    })
}