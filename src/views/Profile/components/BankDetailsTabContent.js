import { Form, Label, Input, Button, Row, Col, FormGroup } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserProfile} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'


const BankDetailsTabContent = ({ user, showToastMessage, updateUserProfile }) => {
  const { register, errors, handleSubmit, control, setValue } = useForm({ mode: 'onBlur' })

  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        // const {birthDate, country, phone, bio} = data
        const result = await updateUserProfile(data)
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  return user ? (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Label for='accountNumber'>Account Benficiary</Label>
            <Input
              id='accountNumber'
              name='accountNumber'
              defaultValue={user.accountNumber || ''}
              placeholder='Account Benficiary'
              className={classnames({
                'is-invalid': errors.accountNumber
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='ibanNumber'>IBAN Number</Label>
            <Input
              id='ibanNumber'
              name='ibanNumber'
              defaultValue={user.ibanNumber || ''}
              placeholder='X-box Id'
              className={classnames({
                'is-invalid': errors.ibanNumber
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='paypalEmail'>Paypal Email</Label>
            <Input
              id='paypalEmail'
              name='paypalEmail'
              defaultValue={user.paypalEmail || ''}
              placeholder="Paypal Email"
              className={classnames({
                'is-invalid': errors.paypalEmail
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  ) : null
}

BankDetailsTabContent.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, {updateUserProfile, showToastMessage})(BankDetailsTabContent)
