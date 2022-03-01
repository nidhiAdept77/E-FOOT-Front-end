import { Fragment, useState } from 'react'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
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
import LoaderComponent from '../../components/Loader'
import { CONSTANTS } from '../../../utils/CONSTANTS'
import Select from 'react-select'

import {registerUser} from '../../../redux/actions/auth'
const Register = (props) => {
  const {showToastMessage, loading, registerUser} = props
  const [skin, setSkin] = useSkin()
  const history = useHistory()
  // const { register, errors, handleSubmit, trigger } = useForm()
  const [selectedRank, setSelectedRank] = useState(CONSTANTS.GAME_RANK[0])

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
    userName: yup.string().min(6).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required()
  })
  
  const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onBlur', resolver: yupResolver(LoginSchema) })
  
  const onSubmit = async data => {
    try {
      const currentUrl = window.location.href
      const url = new URL(currentUrl)
      const referralId = url.searchParams.get("referral-id")
      data = { ...data, rank: selectedRank.value}
      if (referralId) {
        data = {...data, referralId}
      }
      const result = await registerUser(data)
      if (result) {
        showToastMessage("User Registered", "success")
        history.push("/login")
      } else {
        showToastMessage("User Registration Failed", "error")
      }
    } catch (error) {
      showToastMessage("User Registration Failed", "error")
    }
  }
  
  return (
    <div className='auth-wrapper auth-v2'>
      <LoaderComponent loading={loading} />
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Play FIFA win Prizes 🎁
            </CardTitle>
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='userName'>
                  Username
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={userName}
                  placeholder='johndoe'
                  id='userName'
                  name='userName'
                  onChange={e => setUsername(e.target.value)}
                  className={classnames({ 'is-invalid': errors['userName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.userName && <FormFeedback>{errors.userName.message}</FormFeedback>}
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
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Input
                  type='text'
                  value={firstName}
                  placeholder='john'
                  id='firstName'
                  name='firstName'
                  onChange={e => setFirstName(e.target.value)}
                  className={classnames({ 'is-invalid': errors['firstName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='lastName'>
                  last Name
                </Label>
                <Input
                  type='text'
                  value={lastName}
                  placeholder='doe'
                  id='lastName'
                  name='lastName'
                  onChange={e => setLastName(e.target.value)}
                  className={classnames({ 'is-invalid': errors['lastName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors && errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for='rank'>WL Rank</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id="rank–type"
                  className='react-select'
                  classNamePrefix='select'
                  options={CONSTANTS.GAME_RANK}
                  onChange={(value) => { setSelectedRank(value) } }
                  defaultValue={CONSTANTS.GAME_RANK[0]}
                  value={selectedRank}
                  placeholder="Select WL Rank"
                  innerRef={register({ required: true })}
                />
                  {errors && errors.rank && <FormFeedback>{errors.rank.message}</FormFeedback>}
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
  showToastMessage: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading
})
export default connect(mapStateToProps, {showToastMessage, registerUser})(Register)
