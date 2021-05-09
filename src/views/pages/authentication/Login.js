import { useState, Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  FormFeedback
} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import { loginUser, loginWithFacebook, loginWithgoogle } from '../../../redux/actions/auth'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoaderComponent from '../../components/Loader'
import { Facebook, Mail } from 'react-feather'
import { GoogleLogin } from 'react-google-login'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const Login = props => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loginUser, showToastMessage, loading, loginWithgoogle, loginWithFacebook} = props
  const history = useHistory()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  
  const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })
  
  const { register, errors, handleSubmit } = useForm({ mode: 'onBlur', resolver: yupResolver(LoginSchema) })
  const onSubmit = async data => {
    if (isObjEmpty(errors)) {
      try {
        const result = await loginUser(data)
        if (result.success) {
          showToastMessage("Welcome to Efoot-nl", 'success')
          history.push("/dashboard")
        } else {
          let message = "Unable to Login"
          if (result.message && result.message.length) {
            message = result.message[0]
          }
          showToastMessage(message, 'error')
        }
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  const responseGoogle = async (response) => {

    const {googleId, tokenId} = response
    if (tokenId) {
      try {
        const result = await loginWithgoogle(tokenId, googleId)
        if (result.success) {
          showToastMessage("Welcome to Efoot-nl", 'success')
          history.push("/dashboard")
        } else {
          let message = "Unable to Login"
          if (result.message && result.message.length) {
            message = result.message[0]
          }
          showToastMessage(message, 'error')
        }
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  const responseFacebook = async (response) => {
    const {userID, accessToken} = response
    if (accessToken) {
      try {
        const result = await loginWithFacebook(accessToken, userID)
        if (result.success) {
          showToastMessage("Welcome to Efoot-nl", 'success')
          history.push("/dashboard")
        } else {
          let message = "Unable to Login"
          if (result.message && result.message.length) {
            message = result.message[0]
          }
          showToastMessage(message, 'error')
        }
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
              Welcome to E-FOOT.NL! 👋
            </CardTitle>
            <div className='auth-footer-btn d-flex justify-content-center'>
              {CONSTANTS.FACEBOOK_APP_ID && <FacebookLogin
                appId={CONSTANTS.FACEBOOK_APP_ID}
                callback={responseFacebook}
                render={renderProps => (
                  <Button.Ripple color='facebook' onClick={renderProps.onClick}>
                    <Facebook size={14} />
                  </Button.Ripple>
                )}
              />}
              {CONSTANTS.GOOLE_CLIENT_ID && <GoogleLogin
                clientId={CONSTANTS.GOOLE_CLIENT_ID}
                render={renderProps => (
                  <Button.Ripple color='google' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <Mail size={14} />
                  </Button.Ripple>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />}
            </div>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='email'
                  name='email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  invalid={errors.email && true}              
                />
                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true })}
                  invalid={errors.password && true}
                />
                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
           </Col>
        </Col>
      </Row>
    </div>
  )
}

Login.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginWithgoogle: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  loading: state.auth.loading
})

export default connect(mapStateToProps, {showToastMessage, loginUser, loginWithgoogle, loginWithFacebook})(Login)
