// ** Third Party Components
import { X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Form, FormFeedback, Media, Row, Col } from "reactstrap"

import _ from 'underscore'

import { useSelector, useDispatch } from "react-redux"
import { setAddEditPopup, setAddEditPopupData } from "@src/redux/actions/layout"
import {createUpdateConsoles} from "@src/redux/actions/consoles"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import classnames from 'classnames'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToastMessage } from "../../../redux/actions/toastNotification"

const AddEditConsoles = () => {
  const dispatch = useDispatch()
  const { addEditPopup, addEditPopupData } = useSelector((state) => state.layout)
  const [avatar, setAvatar] = useState("")
  const [file, setFile] = useState(null)
  const {_id} = addEditPopupData

  useEffect(() => {
    return () => {
      dispatch(setAddEditPopupData({}))
    }
  }, [])

  useEffect(() => {
    if (!_.isEmpty(addEditPopupData)) {
      setAvatar(addEditPopupData.image_url)
    }
  }, [addEditPopupData])

  // ** Custom close btn
  const CloseBtn = (
    <X 
      className="cursor-pointer" 
      size={15} 
      onClick={e => { 
        dispatch(setAddEditPopup(false)) 
        setAvatar("")
        setFile(null) 
      }} />
  )
  
  const consolesSchema = yup.object().shape({
    name: yup.string().required()
  })

  const { register, errors, handleSubmit, setValue, control } = useForm({ mode: 'onBlur', resolver: yupResolver(consolesSchema) })

  const handleModal = () => {
    dispatch(setAddEditPopup(!addEditPopup))
    setAvatar("")
    setFile(null)
  }
  
  const onSubmit = async (data) => {
    if (_.isEmpty(errors)) {
      try {
        if (!file && !_id) {
          dispatch(showToastMessage("Please include image too", 'error'))
        }
        const isUpdate = !!_id
        data = {...data, imageData:file, currentObj:addEditPopupData, isUpdate}
        const {success, message} = await dispatch(createUpdateConsoles(data))
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
  }
  
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
    setFile(files[0])
  }
  
  return (
    <Modal
      isOpen={addEditPopup}
      toggle={e => handleModal()}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-3"
        toggle={e => handleModal()}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">{_id ? "Update " : "Add "}Consoles</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup>
            <Label for="name">Console Name</Label>
            <Controller
              defaultValue={addEditPopupData ? addEditPopupData.name : ""}
              control={control}
              as={Input}
              id='name'
              name='name'
              placeholder='Name'
              innerRef={register({ required: true })}
              onChange={e => setValue('name', e.target.value)}
              className={classnames({
                'is-invalid': errors.name
              })} />
            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>
          <Media>
            <Row>
              <Col md={12} className="text-center">
                {avatar &&
                  <Media className='mr-25' left>
                    <Media object className='rounded mr-50' src={avatar} alt='Console Image' height='80' width='80' />
                  </Media>
                }

              </Col>
                <Col md={12} className="text-center">
                  <Media className='mt-75 ml-1' body>
                    <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                      Upload
                      <Input type='file' onChange={onChange} hidden accept='image/png' />
                    </Button.Ripple>
                    <p className="m-0">Allowed image type is PNG</p>
                    <p className='text-muted'>Transparent background preffered</p>
                  </Media>
                </Col>              
            </Row>
          </Media>
          <Row>
            <Col md="6" className="text-center mb-2">
              <Button.Ripple className="mr-1" color="primary" type='submit' block>
                Submit
              </Button.Ripple>
            </Col>
            <Col md="6" className="text-center">
              <Button 
                color="secondary" 
                onClick={e => { dispatch(setAddEditPopup(false)); setAvatar(""); setFile(null) }} 
                outline 
                block>
                  Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddEditConsoles
