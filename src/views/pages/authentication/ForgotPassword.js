import { isUserLoggedIn } from '../../../utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '@configs/themeConfig'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { showToastMessage } from '../../../redux/actions/toastNotification'
import { connect } from 'react-redux'
import LoaderComponent from '../../components/Loader'
import { forgotPassUser } from '../../../redux/actions/auth'
import _ from 'underscore'


const ForgotPassword = ({ showToastMessage, loading, forgotPassUser }) => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')
  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const ForgotPassSchema = yup.object().shape({
    email: yup.string().email().required()
  })
  const history = useHistory()

  const { register, errors, handleSubmit } = useForm({ mode: 'onBlur', resolver: yupResolver(ForgotPassSchema) })
  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        const result = await forgotPassUser(data.email)
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
        if (result.success) history.push('/login')
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  if (!isUserLoggedIn()) {
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
                Forgot Password? 🔒
              </CardTitle>
              <CardText className='mb-2'>
                Enter your email and we'll send you instructions to reset your password
              </CardText>
              <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
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
                <Button.Ripple type='submit' color='primary' block>
                  Send reset link
                </Button.Ripple>
              </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'>Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

ForgotPassword.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  forgotPassUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  loading: state.auth.loading
})

export default connect(mapStateToProps, { showToastMessage, forgotPassUser })(ForgotPassword)
