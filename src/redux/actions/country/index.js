import {SET_LOADER, SET_COUNTRY_DETAILS, REMOVE_COUNTRY_DETAILS} from '../../types'
import client from '../../../graphql/client'
import gql from 'graphql-tag'

export const getAllCountries = () => async dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: true
    })
    const CountryQuery = gql`
        query countries{
            countries{
                statusCode
                success
                data{
                    countryName
                    isoCode
                }
            }
        }
    `
    const {data} = await client.query({
        query: CountryQuery
    })
    if (data.countries.success) {
        dispatch({
            type: SET_COUNTRY_DETAILS,
            payload: data.countries.data
        })
    }
    dispatch({
        type: SET_LOADER,
        payload: false
    })
    
}

export const removeCountryData = () => dispatch => {
    dispatch({
        type: REMOVE_COUNTRY_DETAILS,
        payload: {}
    })
}