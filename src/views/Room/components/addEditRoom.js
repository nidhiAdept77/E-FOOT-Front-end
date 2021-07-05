// ** Third Party Components
import { User, X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, Col
} from "reactstrap"

import { selectThemeColors } from "@utils"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { FiEdit, FiTrash2, FiPlusSquare } from "react-icons/fi"

import { getAllUsers, removeAllUsers } from "@store/actions/auth"
import { useSelector, useDispatch } from "react-redux"
import {setAddEditPopup} from '@src/redux/actions/layout'


// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useEffect, useState } from "react"

const AddEditRoom = (props) => {
  const { allUsers } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {addEditPopup} = useSelector(state => state.layout)
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    dispatch(getAllUsers())
    return () => {
      dispatch(removeAllUsers())
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

const AddEditBtn = ({data, isAdd}) => {
  const dispatch = useDispatch()
  const {addEditPopup} = useSelector(state => state.layout)
  const handleOpen = () => {
    dispatch(setAddEditPopup(!addEditPopup))
  }
  return isAdd ? 
        <Col className="w-100 text-right">
            <Button className='ml-2' color='primary' onClick={e => handleOpen()}>
            <FiPlusSquare size={15} />
            <span className='align-middle ml-50'>Add Room</span>
            </Button>
            <AddEditRoom />
        </Col>
      :
      <div className='demo-inline-spacing'>
        <Button.Ripple className='btn-icon' color='flat-success'>
          <FiEdit size={16} />
        </Button.Ripple>
        <Button.Ripple className='btn-icon' color='flat-danger'>
          <FiTrash2 size={16} />
        </Button.Ripple>
        <AddEditRoom data={data} />

      </div>
}

export default AddEditBtn
