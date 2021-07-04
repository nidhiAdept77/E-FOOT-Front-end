// ** Third Party Components
import { User, X } from "react-feather"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from "reactstrap"

import { selectThemeColors } from "@utils"
import Select from "react-select"
import makeAnimated from "react-select/animated"

import { getAllUsers, removeAllUsers } from "@store/actions/auth"
import { useSelector, useDispatch } from "react-redux"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"

const AddEditRoom = ({ open, handleModal }) => {
  const { allUsers } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    dispatch(getAllUsers())
    return () => {
      dispatch(removeAllUsers())
    }
  }, [])
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  )

  const animatedComponents = makeAnimated()

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-3"
        toggle={handleModal}
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
            <Input id="name" placeholder="Football Group" />
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
            className="react-select"
            classNamePrefix="select"
            onChange={(value) => setSelectedUsers(value)}
          />
        </FormGroup>
        <Button className="mr-1" color="primary" onClick={handleModal}>
          Submit
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddEditRoom
