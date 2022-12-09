// ** Third Party Components
import { X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Form, FormFeedback } from "reactstrap"
import _ from 'underscore'

import { useSelector, useDispatch } from "react-redux"
import { setAddEditPopup, setAddEditPopupData } from "@src/redux/actions/layout"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import classnames from 'classnames'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateScore } from "../../../redux/actions/challenges"
import { showToastMessage } from '../../../redux/actions/toastNotification'
import Alert from "reactstrap/lib/Alert"

const UploadScore = () => {
  const dispatch = useDispatch()

  const { addEditPopup, addEditPopupData } = useSelector((state) => state.layout)
  const { user } = useSelector(state => state.auth)

  const { _id } = addEditPopupData
  const [disabled, setDisabled] = useState(false)
  const [scores, setScores] = useState({})

  useEffect(() => {
    const { challenger, challengerScore, opponentScore, acceptor } = addEditPopupData
    if (challenger === user._id && challengerScore) {
      setDisabled(true)
      setScores(challengerScore)
    } else if (acceptor === user._id && opponentScore) {
      setDisabled(true)
      setScores(opponentScore)
    } else {
      setScores({})
      setDisabled(false)
    }
  }, [addEditPopup])

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={e => { dispatch(setAddEditPopup(false)) }} />
  )

  const scoreSchema = yup.object().shape({
    yourScore: yup.number().required(),
    opponentScore: yup.number().required()
  })

  const { register, errors, handleSubmit, setValue, control } = useForm({ mode: 'onBlur', resolver: yupResolver(scoreSchema) })

  const handleModal = () => {
    dispatch(setAddEditPopup(!addEditPopup))
  }

  const onSubmit = async (data) => {
    const { challenger } = addEditPopupData
    const scores = {
      my: data.yourScore,
      opponent: data.opponentScore
    }
    if (_.isEmpty(errors) && _id) {

      dispatch(updateScore(_id, {
        [(challenger === user._id) ? "challengerScore" : "opponentScore"]: scores
      }))
      handleModal()
      dispatch(setAddEditPopupData({}))
      //here reload
    } else {
      dispatch(showToastMessage("Please contact admin if this error persist!", "error"))
    }
  }

  return (
    <Modal
      isOpen={addEditPopup}
      toggle={(e) => handleModal()}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-3"
        toggle={(e) => handleModal()}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Score Submission</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Alert color="danger">
          <h4 className="alert-heading">
            Warning!
            <br />
            Once submitted, You can't edit it back so be careful. Check twice
            before submitting.
          </h4>
          <p></p>
        </Alert>
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup>
            <Label for="name">Your Score</Label>
            <Controller
              defaultValue={scores?.my || ""}
              control={control}
              as={Input}
              id="yourScore"
              name="yourScore"
              placeholder="Your Score"
              disabled={disabled}
              innerRef={register({ required: true })}
              onChange={(e) => setValue("yourScore", e.target.value)}
              className={classnames({
                "is-invalid": errors.name
              })}
            />
            {errors && errors.name && (
              <FormFeedback>{errors.yourScore.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Opponent Score</Label>
            <Controller
              defaultValue={scores?.opponent || ""}
              control={control}
              as={Input}
              id="opponentScore"
              name="opponentScore"
              placeholder="Opponent Score"
              innerRef={register({ required: true })}
              onChange={(e) => setValue("opponentScore", e.target.value)}
              disabled={disabled}
              className={classnames({
                "is-invalid": errors.name
              })}
            />
            {errors && errors.name && (
              <FormFeedback>{errors.opponentScore.message}</FormFeedback>
            )}
          </FormGroup>

          <Button.Ripple
            className="mr-1"
            color="primary"
            type="Submit Score"
            disabled={disabled}
          >
            Submit
          </Button.Ripple>
          <Button
            color="secondary"
            onClick={(e) => {
              dispatch(setAddEditPopup(false))
              dispatch(setAddEditPopupData({}))
            }}
            outline
          >
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default UploadScore
