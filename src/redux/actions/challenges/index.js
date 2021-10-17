import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import { SET_LOADER, SET_CHALLENGES, SET_TOTAL, UPDATE_CHALLENGES, REMOVE_CHALLENGES } from '../../types'
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
                        challengerScore {
                            my
                            opponent
                        }
                        opponentScore {
                            my
                            opponent
                        }
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
                dispatch({
                    type: UPDATE_CHALLENGES,
                    payload: data.createUpdateChallenge.data
                })
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

export const acceptChallenge = ({status, opponent, _id}) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const acceptChallengeMutation = gql`
            mutation challengeAccept($input: ChallengeAcceptInput){
                challengeAccept(input: $input){
                    statusCode
                    success
                    message
                    nextToken
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
                        challengerScore {
                            my
                            opponent
                        }
                        opponentScore {
                            my
                            opponent
                        }
                    }
                }
            }
        `
        const {data} = await client.mutate({
            mutation: acceptChallengeMutation,
            variables: {
                input: {
                    status,
                    acceptor: opponent,
                    _id
                }
            }
        })
        handleAuthResponse(data.challengeAccept)
        const {success} = data.challengeAccept
        if (success) {
            dispatch({
                type: SET_LOADER,
                payload: false
            })
            if (data.challengeAccept.data._id) {
                dispatch(showToastMessage("Challenge accepted!", 'success'))
                // dispatch({
                //     type: REMOVE_CHALLENGES,
                //     payload: data.challengeAccept.data
                // })
            }
            return data.challengeAccept
        } else {
            dispatch(showToastMessage(data.challengeAccept.message, 'error'))
        }
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}

export const getPaginatedChallenges = (limit = -1, page = 0, searchString = "", type = "public", status, userId) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const ChallengeQuery = gql`
        query getChallenges($limit:Int, $skip: Int, $searchString: String, $type: String, $status: String, $userId: String) {
            getChallenges(limit: $limit, skip: $skip, searchString: $searchString, type: $type, status: $status, userId: $userId) {
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
                  challengerScore {
                    my
                    opponent
                  }
                  opponentScore {
                    my
                    opponent
                  }
                }
              }
            }
          }`
        const { data } = await client.query({
          query: ChallengeQuery,
          variables: {
            limit,
            skip: page * limit,
            searchString,
            type,
            status,
            userId
          }
        })
        handleAuthResponse(data.getChallenges)
        const {success} = data.getChallenges
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

export const updateScore = (_id, scorces) => async dispatch => {
    console.log('_id: ', _id)
    console.log('scorces: ', scorces)
    try {
        dispatch({
            type: SET_LOADER,
            payload: true
        })
        const updateScoresMutation = gql`
            mutation updateScores($input: ChallengeScoreInput){
                updateScores(input: $input){
                    statusCode
                    success
                    message
                    nextToken
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
                        challengerScore {
                          my
                          opponent
                        }
                        opponentScore {
                          my
                          opponent
                        }
                      }
                }
            }
        `
        const {data} = await client.mutate({
            mutation: updateScoresMutation,
            variables: {
                input: {...scorces, _id}
            }
        })
        handleAuthResponse(data.updateScores)
        const {success} = data.updateScores
        if (success) {
            dispatch({
                type: SET_LOADER,
                payload: false
            })
            if (data.updateScores.data._id) {
                dispatch(showToastMessage("Score submitted!", 'success'))
                dispatch({
                    type: UPDATE_CHALLENGES,
                    payload: data.updateScores.data
                })
            }
            return data.updateScores
        } else {
            dispatch(showToastMessage(data.updateScores.message, 'error'))
        }
    } catch (error) {
        console.error('error: ', error)
        dispatch({
            type: SET_LOADER,
            payload: false
        })
    }
}