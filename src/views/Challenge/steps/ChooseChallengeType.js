import { Fragment, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form } from 'reactstrap'

import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setAddEditPopupData } from '@src/redux/actions/layout'
import { createUpdateChallenge } from '../../../redux/actions/challenges'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import { useHistory } from 'react-router-dom'

const ChooseChallengeType = ({ stepper, type }) => {

  const challengeType = [
    // {
    //   label: "FREE Play 1vs1",
    //   value: "free-play-1vs1"
    // },
    {
      label: "FUT 1vs1",
      value: "fut-1vs1"
    },
    {
      label: "Real Team 1vs1",
      value: "real-team-1vs1"
    }
  ]

  const { register, errors, handleSubmit, trigger } = useForm()
  
  const [selectedChallengeType, setSelectedChallengeType] = useState(challengeType[0])
  const {addEditPopupData} = useSelector(state => state.layout)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = () => {
    if (addEditPopupData) {
      const dataToSend = {
        type: "public",
        status: "active",
        gameId: addEditPopupData?.gameId,
        consoleId: addEditPopupData.consoleId
      }
      dispatch(setAddEditPopupData({}))
      dispatch(createUpdateChallenge(dataToSend))
      history.push('/')
    } else {
      dispatch(showToastMessage("Please contact admin if error persist!", 'error'))
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>One step closer to create challenge, Hurrey!</h5>
        {/* <small>some text.</small> */}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`challenge–type-${type}`}>
              Select Challenge Type
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`challenge–type-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={challengeType}
              onChange={(value) => setSelectedChallengeType(value)}
              defaultValue={challengeType[0]}
              value={selectedChallengeType}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Create Challenge</span>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default ChooseChallengeType
