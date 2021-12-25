import { useState, useEffect } from 'react'
import { Form, Label, Input, Button, Row, Col, FormGroup, FormFeedback } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import _ from 'underscore'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserProfile} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'
import { selectThemeColors } from '@utils'
import {CONSTANTS} from '../../../utils/CONSTANTS'
import Select from 'react-select'


const PsnTabContent = ({ user, showToastMessage, updateUserProfile }) => {
  const { register, errors, handleSubmit, setValue } = useForm({ mode: 'onBlur' })

  const [selectedRank, setSelectedRank] = useState(CONSTANTS.GAME_RANK[0])

  useEffect(() => {
    const rank = user?.rank
    if (rank) {
      setSelectedRank(CONSTANTS.GAME_RANK.filter(rk => rk.value === rank))
    }
    return () => {
    }
  }, [user])

  const onSubmit = async data => {
    if (_.isEmpty(errors)) {
      try {
        const {playStationId = "", xboxId = ""} = data
        if (playStationId || xboxId) {
          const result = await updateUserProfile({...data, rank: selectedRank.value})
          const resultType = result.success ? "success" : "error"
          showToastMessage(result.message, resultType)
        } else {
          showToastMessage("You need to provide either both Playstation/XBox id or any one of them", "error")
        }
      } catch (error) {
        console.error('error: ', error)
        showToastMessage(error.message, 'error')
      }
    }
  }

  return !_.isEmpty(user) ? (
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
              innerRef={register({ required: false })}
            />
              {errors && errors.playStationId && <FormFeedback>{errors.playStationId.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='xboxId'>Xbox Id</Label>
            <Input
              id='xboxId'
              name='xboxId'
              defaultValue={user.xboxId || ''}
              placeholder='X-box Id'
              className={classnames({
                'is-invalid': errors.xboxId
              })}
              onChange={e => setValue('xboxId', e.target.value)}
              innerRef={register({ required: false })}
            />
              {errors && errors.xboxId && <FormFeedback>{errors.xboxId.message}</FormFeedback>}
          </FormGroup>
        </Col>
        {/* <Col sm='6'>
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
        </Col> */}
        <Col sm='6'>
          <FormGroup>
            <Label for='rank'>WL Rank</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`rank–type`}
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
