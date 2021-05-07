import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import { connect } from 'react-redux'
import {getAllCountries, removeCountryData} from '../../../redux/actions/country'
import LoaderComponent from '../Loader'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import {Controller} from 'react-hook-form'


function CountryDropdown({country, loading, getAllCountries, removeCountryData, value, errors, register, control, setValue }) {
    useEffect(() => {
        getAllCountries()
        return () => removeCountryData()
    }, [])
    
    const countryOptions = countryOp => {
        return countryOp ? countryOp.map(c => ({ value:c.isoCode, label:c.countryName })) : []
    }
    const getDefaultValue = value => {
        const countryOp = country.find(c => c.countryName === value)
        return  countryOp ? {value: countryOp.isoCode, label: countryOp.countryName} : null
    }
    return (
        <div>
            <LoaderComponent loading={loading} />
            <FormGroup>
                <Label for='country'>Country</Label>
                <Controller
                    isClearable
                    as={Select}
                    id='country'
                    control={control}
                    name='country'
                    defaultValue={getDefaultValue(value)}
                    options={country && countryOptions(country)}
                    className={classnames('country', {
                        'is-invalid': errors.country
                    })}
                    // onChange={data => { console.log(data) }}
                    innerRef={register({ required: true })}
                    classNamePrefix='select'
                    theme={selectThemeColors} />
                {errors && errors.country && <FormFeedback>{errors.country.message}</FormFeedback>}
            </FormGroup>    
        </div>
    )
}

CountryDropdown.propTypes = {
    getAllCountries: PropTypes.func.isRequired,
    removeCountryData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    country: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    loading: state.country.loading,
    country: state.country.country
})
export default connect(mapStateToProps, {getAllCountries, removeCountryData})(CountryDropdown)

