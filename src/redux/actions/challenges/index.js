import gql from 'graphql-tag'
import _ from 'underscore'
import client from '../../../graphql/client'
import { getFieldValue, handleAuthResponse } from '../../../utils'
import { SET_LOADER } from '../../types'
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