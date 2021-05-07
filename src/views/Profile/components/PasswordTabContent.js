import * as yup from 'yup'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, FormFeedback } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {changeUserPass} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'


const PasswordTabContent = ({changeUserPass, showToastMessage}) => {
  const SignupSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    retypeNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {
    if (_.isEmpty(errors)) {
      try {
        const result = await changeUserPass(data.newPassword, data.oldPassword)
        const resultType = result.success ? "success" : "error"
        setValue('oldPassword', '')
        setValue('newPassword', '')
        setValue('retypeNewPassword', '')
        showToastMessage(result.message, resultType)
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Old Password'
              htmlFor='oldPassword'
              name='oldPassword'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['oldPassword']
              })}
            />
            {errors && errors.oldPassword && <FormFeedback>{errors.oldPassword.message}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='New Password'
              htmlFor='newPassword'
              name='newPassword'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['newPassword']
              })}
            />
            {errors && errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Retype New Password'
              htmlFor='retypeNewPassword'
              name='retypeNewPassword'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['retypeNewPassword']
              })}
            />
            {errors && errors.retypeNewPassword && <FormFeedback>{errors.retypeNewPassword.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  )
}

PasswordTabContent.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  changeUserPass: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, {changeUserPass, showToastMessage})(PasswordTabContent)
