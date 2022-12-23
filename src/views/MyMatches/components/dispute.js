// ** Third Party Components
import { X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Media, Row, Col, Input } from "reactstrap"
import _ from 'underscore'

import { useSelector, useDispatch } from "react-redux"
import { setAddEditPopupData, setDisputePopup } from "@src/redux/actions/layout"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"

import { showToastMessage } from '../../../redux/actions/toastNotification'
import Alert from "reactstrap/lib/Alert"

import { uploadProof } from "../../../redux/actions/challenges"

const DisputeModal = () => {
  const dispatch = useDispatch()

  const { disputePopup, addEditPopupData } = useSelector((state) => state.layout)
  const { user } = useSelector(state => state.auth)
  const [avatar, setAvatar] = useState("")
  const [file, setFile] = useState(null)
  const { _id } = addEditPopupData
  const [disabled, setDisabled] = useState(false)
  const fullUrlOfImg = `https://ef-nl.s3.amazonaws.com/${_id + user._id}`
  useEffect(() => {
    if (!_.isEmpty(addEditPopupData)) {
      if (user._id === addEditPopupData.challenger) {
        const img = addEditPopupData?.challengerScore?.proof
        setAvatar(fullUrlOfImg)

        setDisabled(img)
      } else {
        const img = addEditPopupData?.opponentScore?.proof
        setAvatar(img)
        setDisabled(img)
      }
    }
  }, [addEditPopupData])

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={e => { dispatch(setDisputePopup(false)) }} />
  )


  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
    setFile(files[0])
  }

  const handleModal = () => {
    dispatch(setDisputePopup(!disputePopup))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      if (!file && !_id) {
        dispatch(showToastMessage("Please include image", 'error'))
      }
      const { success, message } = await dispatch(uploadProof({ imageData: file, _id }))
      handleModal()
      if (success) {
        dispatch(showToastMessage(message, 'success'))
      } else {
        dispatch(showToastMessage(message, 'error'))
      }
    } catch (error) {
      console.error('error: ', error)
      dispatch(showToastMessage(error.message, 'error'))
    }
  }

  return (
    <Modal
      isOpen={disputePopup}
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
        <h5 className="modal-title">Proof Submission</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Alert color="info">
          <h4 className="alert-heading">
            Note:
            <br />
            Upload screenshot or score image of game to resolve dispute.
          </h4>
          <p></p>
        </Alert>
        <Form
          className="auth-login-form mt-2"
          onSubmit={onSubmit}
        >
          <FormGroup>
            <Label for="name">Upload Proof</Label>
          </FormGroup>
          <Media>
            <Row>
              <Col md={12} className="text-center">
                {avatar &&
                  <Media className='mr-25' left>
                    <Media object className='rounded mr-50' src={fullUrlOfImg} alt='Proof Image' height='80' width='80' />
                  </Media>
                }
              </Col>
              <Col md={12} className="text-center">
                <Media className='mt-75 ml-1' body>
                  <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                    Upload
                    <Input type='file' onChange={onChange} hidden accept='image/png' />
                  </Button.Ripple>
                  <p className="m-0">Make sure scores are visible properly</p>
                  <p className='text-muted'>Uploaded image will be used for inspecting scores. Once uploaded you can't reupload it again</p>
                </Media>
              </Col>
            </Row>
          </Media>

          <Button.Ripple
            className="mr-1"
            color="primary"
            type="submit"

          >
            Submit
          </Button.Ripple>
          <Button
            color="secondary"
            onClick={(e) => {
              dispatch(setDisputePopup(false))
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

export default DisputeModal
