import { Fragment, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Card } from 'reactstrap'
import Avatar from '@components/avatar'

import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setAddEditPopupData } from '@src/redux/actions/layout'
import { createUpdateChallenge } from '../../../redux/actions/challenges'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import { useHistory } from 'react-router-dom'
import { CONSTANTS } from '../../../utils/CONSTANTS'

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
      const { label: name, value: id } = selectedChallengeType
      const dataToSend = {
        type: CONSTANTS.STATUS.PUBLIC,
        status: CONSTANTS.STATUS.ACTIVE,
        mode: {id, name},
        gameId: addEditPopupData?.gameId,
        consoleId: addEditPopupData.consoleId
      }
      if (addEditPopupData.acceptor) {
        dataToSend['type'] = CONSTANTS.STATUS.PRIVATE
        dataToSend['status'] = CONSTANTS.STATUS.PENDING
        dataToSend['acceptor'] = addEditPopupData.acceptor
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
      <div className="content-header">
        <h5 className="mb-0">One step closer to create challenge, Hurrey!</h5>
        {addEditPopupData?.acceptor && (
          <Card className="mt-1">
            <Row className="p-1 pb-2">
              {addEditPopupData?.acceptorPic && (
                <Col className="d-flex mt-1" md="1" sm="1">
                  <Avatar size='md' img={addEditPopupData?.acceptorPic}  imgHeight='40' imgWidth='40'></Avatar>
                </Col>
              )}
              {addEditPopupData?.acceptorUserName && (
                <Col className="d-flex mt-2" md="11" sm="11">
                  <h5>
                    Challenging to <b>{addEditPopupData?.acceptorUserName}</b>
                  </h5>
                </Col>
              )}
            </Row>
          </Card>
        )}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-2">
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`challenge–type-${type}`}>
              Select Challenge Type
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`challenge–type-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={challengeType}
              onChange={(value) => setSelectedChallengeType(value)}
              defaultValue={challengeType[0]}
              value={selectedChallengeType}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Row>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-25 mr-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button.Ripple>
          <Button.Ripple type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              Create Challenge
            </span>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default ChooseChallengeType
