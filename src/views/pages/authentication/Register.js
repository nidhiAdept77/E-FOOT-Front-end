import { Fragment, useState } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/page-auth.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Register = (props) => {
  const {showToastMessage} = props
  const [skin, setSkin] = useSkin()

  // const { register, errors, handleSubmit, trigger } = useForm()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    username: yup.string().min(6).required()
  })
  
  const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(LoginSchema) })
  
  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      // Provide Registration Logic here.
    }
  }
  // useEffect(() => {
  // }, [])
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='johndoe'
                  id='username'
                  name='username'
                  onChange={e => setUsername(e.target.value)}
                  className={classnames({ 'is-invalid': errors['username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='email'
                  name='email'
                  onChange={e => setEmail(e.target.value)}
                  placeholder='john@example.com'
                  className={classnames({ 'is-invalid': errors['email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

Register.propTypes = {
  showToastMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  
})
export default connect(mapStateToProps, {showToastMessage})(Register)
