// ** Third Party Components
import { User, X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Col
} from "reactstrap"

import { selectThemeColors } from "@utils"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import _ from 'underscore'

import { getAllUsers, removeAllUsers } from "@store/actions/auth"
import { useSelector, useDispatch } from "react-redux"
import {setAddEditPopup, setAddEditPopupData} from '@src/redux/actions/layout'


// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"

const AddEditRoom = () => {
  const { allUsers } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {addEditPopup, addEditPopupData} = useSelector(state => state.layout)
  const userList = []
  if (addEditPopupData && addEditPopupData.userIds && addEditPopupData.userIds.length) {
    _.each(addEditPopupData.userIds, id => {
      const user = _.findWhere(allUsers, { _id: id })
      if (user) {
        userList.push({
          value: user._id,
          label: `${user.firstName} ${user.lastName}`
        })
      }
    })
  }
  const [selectedUsers, setSelectedUsers] = useState(userList)

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
        <FormGroup>
          <Label for="name">Room Name</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id="name" value={addEditPopupData ? addEditPopupData.name : ""} placeholder="Football Group" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Select Users</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={allUsers.map(user => {
              return {
                value: user._id,
                label: `${user.firstName} ${user.lastName}`
              }
            })}
            value={selectedUsers}
            defaultValue=""
            className="react-select"
            classNamePrefix="select"
            onChange={(value) => { 
              setSelectedUsers(value)
            }}
          />
        </FormGroup>
        <Button className="mr-1" color="primary" onClick="">
          Submit
        </Button>
        <Button color="secondary" onClick="" outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddEditRoom