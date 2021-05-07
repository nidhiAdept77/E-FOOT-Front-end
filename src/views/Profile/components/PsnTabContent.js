import { useState, Fragment } from 'react'
import { Form, Label, Input, Button, Row, Col, FormGroup, FormFeedback } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserProfile} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'


const PsnTabContent = ({ user, showToastMessage, updateUserProfile }) => {
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
            <Label for='playStationId'>Playstation Id</Label>
            <Input
              id='playStationId'
              name='playStationId'
              defaultValue={user.playStationId || ''}
              placeholder='Playstation Id'
              className={classnames({
                'is-invalid': errors.playStationId
              })}
              onChange={e => setValue('playStationId', e.target.value)}
              innerRef={register({ required: true })}
            />
              {errors && errors.playStationId && <FormFeedback>{errors.playStationId.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='xBoxId'>Xbox Id</Label>
            <Input
              id='xBoxId'
              name='xBoxId'
              defaultValue={user.xBoxId || ''}
              placeholder='X-box Id'
              className={classnames({
                'is-invalid': errors.xBoxId
              })}
              onChange={e => setValue('xBoxId', e.target.value)}
              innerRef={register({ required: true })}
            />
              {errors && errors.xBoxId && <FormFeedback>{errors.xBoxId.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='epicGamesId'>Epic Games Id</Label>
            <Input
              id='epicGamesId'
              name='epicGamesId'
              defaultValue={user.epicGamesId || ''}
              placeholder="Epic Games Id"
              className={classnames({
                'is-invalid': errors.epicGamesId
              })}
              onChange={e => setValue('epicGamesId', e.target.value)}
              innerRef={register({ required: true })}
            />
            {errors && errors.epicGamesId && <FormFeedback>{errors.epicGamesId.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple className='mr-1'  type="submit" color='primary'>
            Save changes
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  ) : null
}

PsnTabContent.propTypes = {
  showToastMessage: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, {updateUserProfile, showToastMessage})(PsnTabContent)
