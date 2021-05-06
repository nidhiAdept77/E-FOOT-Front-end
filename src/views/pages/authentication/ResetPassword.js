import { useSkin } from '@hooks/useSkin'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button, FormFeedback, Input } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { resetPassUser } from '../../../redux/actions/auth'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import LoaderComponent from '../../components/Loader'
import _ from 'underscore'


const ResetPassword = ({loading, showToastMessage, resetPassUser}) => {
  const [skin, setSkin] = useSkin()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const history = useHistory()

  const illustration = skin === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const ResetPasswordSchema = yup.object().shape({
    password: yup.string().min(5).required('Required'),
    confirmPassword: yup.string()
      .min(5)
      .oneOf([yup.ref('password'), null], "Passwords don't match!")
      .required('Required')
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onBlur', resolver: yupResolver(ResetPasswordSchema) })

  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        const result = await resetPassUser(token, data.password)
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
        if (result.success) history.push('/login')
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }
  return (
    <div className='auth-wrapper auth-v2'>
      <LoaderComponent loading={loading} />
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='password'>
                  Password
                </Label>
                <Input
                  autoFocus
                  type='password'
                  value={password}
                  id='password'
                  name='password'
                  placeholder='john@example.com'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  invalid={errors.password && true}              
                />
                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirmPassword'>
                Confirm Password
                </Label>
                <Input
                  autoFocus
                  type='confirmPassword'
                  value={confirmPassword}
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='john@example.com'
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['confirmPassword'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  invalid={errors.confirmPassword && true}              
                />
                {errors && errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
              </FormGroup>
              {/* <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </FormGroup> */}
              <Button.Ripple color='primary' block type='submit'>
                Set New Password
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-v2'>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

ResetPassword.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  resetPassUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  loading: state.auth.loading
})
export default connect(mapStateToProps, {showToastMessage, resetPassUser})(ResetPassword)
