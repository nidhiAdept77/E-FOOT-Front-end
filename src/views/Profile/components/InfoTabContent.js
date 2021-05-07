import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import Cleave from 'cleave.js/react'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import CountryDropdown from '../../components/CountryDropdown'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserProfile} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'
import 'cleave.js/dist/addons/cleave-phone.us'

const InfoTabContent = ({ user, showToastMessage, updateUserProfile, loading }) => {
  const { register, errors, handleSubmit, control, setValue } = useForm({ 
    mode: 'onBlur', 
    defaultValues: {birthDate: user.birthDate ? new Date(parseInt(user.birthDate)) : new Date()}
  })
  

  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        const {birthDate, country, phone, bio} = data
        const result = await updateUserProfile({
          birthDate: birthDate[0],
          country: country.label,
          phone,
          bio
        })
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  return !_.isEmpty(user) ? (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label for='bio'>Bio</Label>
            <Controller
              id='bio'
              rows='4'
              as={Input}
              name='bio'
              type='textarea'
              control={control}
              defaultValue={user.bio || ''}
              placeholder='Your Bio data here...'
              onChange={e => setValue('bio', e.target.value)}
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors.bio })}
            />
              {errors && errors.bio && <FormFeedback>{errors.bio.message}</FormFeedback>}

          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='birth-date'>Birth Date</Label>
            <Controller
              name='birthDate'
              as={Flatpickr}
              id='birth-date'
              control={control}
              placeholder='Birth Date'
              defaultValue={user.birthDate}
              onChange={e => setValue('birthDate', e.target.value)}
              className={classnames('form-control', {
                'is-invalid': errors.birthDate
              })}
            />
              {errors && errors.birthDate && <FormFeedback>{errors.birthDate.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col sm='6'>
          <CountryDropdown errors={errors} register={register} control={control} value={user.country} setValue={setValue} />
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='phone-number'>Phone</Label>
              <Controller
                as={Cleave}
                id='phone'
                name='phone'
                defaultValue={user.phone || ''}
                placeholder='Phone Number'
                className={classnames('form-control', {
                  'is-invalid': errors.phone
                })}
                control={control}
                onChange={e => setValue('phone', e.target.value)}
                innerRef={register({ required: true })}
                placeholder='123456 7890'
                options={{ 
                  phone: true
                }}
              />
            {errors && errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple className='mr-1' type="submit" color='primary'>
            Save changes
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  ) : null
}
InfoTabContent.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, {updateUserProfile, showToastMessage})(InfoTabContent)
