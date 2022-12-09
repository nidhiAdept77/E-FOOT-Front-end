import { useState, Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, Row, Col, FormFeedback } from 'reactstrap'
import { loginUser, loginWithFacebook, loginWithgoogle, getUserDetails } from '../../../redux/actions/auth'
import { getLayoutSettingsBypagePostion, removeLayourSetting } from '@src/redux/actions/layoutSettings'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoaderComponent from '../../components/Loader'
// import { Facebook, Mail } from 'react-feather'
import { GoogleLogin } from 'react-google-login'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import '@styles/base/pages/page-auth.scss'

const Login = (props) => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [headerHtml, setHeaderHtml] = useState(`
    <CardTitle tag='h4' className='mb-1'>
      Welcome to E-Foot.Nl! 👋
      </CardTitle>
    <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>`)
  const { loginUser, showToastMessage, loading, loginWithgoogle, loginWithFacebook, getUserDetails, getLayoutSettingsBypagePostion, removeLayourSetting, layoutLoading, layoutSetting } = props
  const history = useHistory()
  useEffect(() => {
    getLayoutSettingsBypagePostion('login', 'header')
    return () => {
      removeLayourSetting()
    }
  }, [])

  useEffect(() => {
    if (layoutSetting) {
      setHeaderHtml(layoutSetting.html)
    } else {

    }
  }, [layoutSetting])

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
          await getUserDetails()
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

    const { googleId, tokenId } = response
    if (tokenId) {
      try {
        const result = await loginWithgoogle(tokenId, googleId)
        if (result.success) {
          await getUserDetails()
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
    const { userID, accessToken } = response
    if (accessToken) {
      try {
        const result = await loginWithFacebook(accessToken, userID)
        if (result.success) {
          await getUserDetails()
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

  const getGoogleSvg = () => {
    return (<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>)
  }

  const getFbSvg = () => {
    return (<svg aria-hidden="true" className="svg-icon iconFacebook" width="18" height="18" viewBox="0 0 18 18"><path d="M3 1a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2V3a2 2 0 00-2-2H3zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5z" fill="#fff"></path></svg>)
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <LoaderComponent loading={loading || layoutLoading} />
      <div className='login_main_div d-flex mt-1'>

        <div className='auth-inner py-2' >
          <Card className='mb-0'>
            <CardBody>
              <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
              <div className='divider mt-0 mb-0'>
                {/* <div className='divider-text'>or</div> */}
                <h2 className='mt-0 mb-0'>LOGIN HERE</h2>

              </div>
              <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label className='form-label' for='email'>
                        Email
                      </Label>
                      <Input

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
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <div className='d-flex justify-content-between'>
                        <Label className='form-label' for='password'>
                          Password
                        </Label>
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
                      <div className='d-flex justify-content-end'>
                        <Link to='/forgot-password'>
                          <small>Forgot Password?</small>
                        </Link>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
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
              <Row className='auth-footer-btn mt-1'>
                <Col md="6">
                  {CONSTANTS.FACEBOOK_APP_ID && <FacebookLogin
                    appId={CONSTANTS.FACEBOOK_APP_ID}
                    callback={responseFacebook}
                    render={renderProps => (
                      <Button.Ripple color='facebook' style={{ boxShadow: "0 4px 8px 0 rgb(34 41 47 / 50%)", border: "1px" }} className="w-100" block onClick={renderProps.onClick}>
                        {getFbSvg()}
                        <span className='align-middle ml-25'>Login with facebook</span>
                      </Button.Ripple>
                    )}
                  />}
                </Col>
                <Col md="6">
                  {CONSTANTS.GOOLE_CLIENT_ID && <GoogleLogin
                    clientId={CONSTANTS.GOOLE_CLIENT_ID}
                    render={renderProps => (
                      <Button.Ripple color='white' onClick={renderProps.onClick} className="w-100 box-shadow-google" disabled={renderProps.disabled}>
                        {getGoogleSvg()}
                        <span className='align-middle ml-25'>Login with Google</span>
                      </Button.Ripple>
                    )}
                    buttonText="Login With Google"
                    className="w-100"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>

    </div>

  )
}

Login.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginWithgoogle: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getLayoutSettingsBypagePostion: PropTypes.func.isRequired,
  layoutLoading: PropTypes.bool.isRequired,
  removeLayourSetting: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  loading: state.auth.loading,
  layoutLoading: state.layoutSettings.loading,
  layoutSetting: state.layoutSettings.layoutSetting
})

export default connect(mapStateToProps, { showToastMessage, loginUser, loginWithgoogle, loginWithFacebook, getUserDetails, getLayoutSettingsBypagePostion, removeLayourSetting })(Login)