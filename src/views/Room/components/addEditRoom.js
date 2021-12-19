// ** Third Party Components
import { User, X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Form, FormFeedback } from "reactstrap"

import { selectThemeColors } from "@utils"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import _ from 'underscore'

import { getAllUsers, removeAllUsers } from "@store/actions/auth"
import { useSelector, useDispatch } from "react-redux"
import { setAddEditPopup, setAddEditPopupData } from "@src/redux/actions/layout"
import { updateRoom } from "@src/redux/actions/rooms"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import classnames from 'classnames'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToastMessage } from "../../../redux/actions/toastNotification"

const AddEditRoom = () => {
  const { allUsers } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { addEditPopup, addEditPopupData } = useSelector((state) => state.layout)
  const [selectedUsers, setSelectedUsers] = useState([])
  const {_id} = addEditPopupData

  useEffect(() => {
    const userList = []
    if (addEditPopupData && addEditPopupData.userIds && addEditPopupData.userIds.length) {
      _.each(addEditPopupData.userIds, (id) => {
        const user = _.findWhere(allUsers, { _id: id })
        if (user) {
          userList.push({
            value: user._id,
            label: `${user.firstName} ${user.lastName}`
          })
        }
      })
    }
    setSelectedUsers(userList)
    return () => {
      setSelectedUsers([])
    }
  }, [addEditPopupData.userIds])

  useEffect(() => {
    dispatch(getAllUsers())
    return () => {
      dispatch(removeAllUsers())
      dispatch(setAddEditPopupData({}))
    }
  }, [])

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={e => { dispatch(setAddEditPopup(false)) }} />
  )
  
  const roomSchema = yup.object().shape({
    name: yup.string().required()
    //selectedUsers: yup.array().required('Please select users')
  })

  const { register, errors, handleSubmit, setValue, control } = useForm({ mode: 'onBlur', resolver: yupResolver(roomSchema) })

  const onSubmit = async (data) => {
    const userIds = selectedUsers.map(user => user.value)
    data = {...data, userIds, id: _id || "", type: 'private'}
    if (_.isEmpty(errors)) {
        try {
            dispatch(updateRoom(data))
            dispatch(setAddEditPopup(false))
            // const result = await dispatch(updateRoom(data))
            // if (result.success) {
            //   showToastMessage(result.message, 'success')
            //   dispatch(setAddEditPopup(false))
            // } else {
            //     showToastMessage(result.message, 'error')
            // }
        } catch (error) {
            console.error('error: ', error)
            showToastMessage(error.message, 'error')
        }
    }
}

  const handleModal = () => {
    dispatch(setAddEditPopup(!addEditPopup))
  }
  const animatedComponents = makeAnimated()

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
        <h5 className="modal-title">Room</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup>
            <Label for="name">Room Name</Label>
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
          <FormGroup>
            <Label>Select Users</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={allUsers.map((user) => {
                return {
                  value: user._id,
                  label: `${user.firstName} ${user.lastName}`
                }
              })}
              defaultValue={selectedUsers}
              classNamePrefix='select'
              onChange={(value) => setSelectedUsers(value)} 
              innerRef={register({ required: true })}
              className={classnames('react-select', { 'is-invalid': errors.selectedUsers })}  
              name="select-users"     
            />
            {errors && errors.selectedUsers && <FormFeedback>{errors.selectedUsers.message}</FormFeedback>}
          </FormGroup>

          <Button.Ripple className="mr-1" color="primary" type='submit'>
            Submit
          </Button.Ripple>
          <Button color="secondary" onClick={e => { dispatch(setAddEditPopup(false)) }} outline>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddEditRoom
