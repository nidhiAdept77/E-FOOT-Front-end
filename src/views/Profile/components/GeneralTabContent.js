import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, FormFeedback, Form } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserProfile, uploadProfilePhoto} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'

const GeneralTabs = ({ user, showToastMessage, updateUserProfile, uploadProfilePhoto }) => {
  const [avatar, setAvatar] = useState(user.profilePicture ? user.profilePicture : '')
  
  const genralTabSchema = yup.object().shape({
    userName: yup.string().min(6).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required()
  })
  
  useEffect(() => {
    if (!_.isEmpty(user)) {
      setAvatar(user.profilePicture)
    }
  }, [user])
  const { register, errors, handleSubmit, control, setValue } = useForm({ mode: 'onBlur', resolver: yupResolver(genralTabSchema) })
  
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = async function () {
      setAvatar(reader.result)
      try {
        const result = await uploadProfilePhoto(files[0])
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        delete data['email']
        const result = await updateUserProfile(data)
        const resultType = result.success ? "success" : "error"
        showToastMessage(result.message, resultType)
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  return !_.isEmpty(user) ? (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='userName'>Username</Label>
              <Controller
                defaultValue={user.userName}
                control={control}
                as={Input}
                id='userName'
                name='userName'
                placeholder='Username'
                innerRef={register({ required: true })}
                onChange={e => setValue('userName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.userName
                })}
              />
              {errors && errors.userName && <FormFeedback>{errors.userName.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Controller
                defaultValue={user.email}
                control={control}
                as={Input}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                innerRef={register({ required: true })}
                onChange={e => setValue('email', e.target.value)}
                className={classnames({
                  'is-invalid': errors.email
                })}
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>First Name</Label>
              <Controller
                defaultValue={user.firstName}
                control={control}
                as={Input}
                id='name'
                name='firstName'
                placeholder='Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('firstName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.firstName
                })}
              />
              {errors && errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Last Name</Label>
              <Controller
                defaultValue={user.lastName}
                control={control}
                as={Input}
                id='name'
                name='lastName'
                placeholder='Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('lastName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.lastName
                })}
              />
              {errors && errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  ) : null
}

GeneralTabs.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  uploadProfilePhoto: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user
})
export default connect(mapStateToProps, {uploadProfilePhoto, updateUserProfile, showToastMessage})(GeneralTabs)
