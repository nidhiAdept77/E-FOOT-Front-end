import { FiEdit, FiTrash2, FiPlusSquare } from "react-icons/fi"
import { Button, Col } from "reactstrap"

import { useSelector, useDispatch } from "react-redux"
import {setAddEditPopup, setAddEditPopupData} from '@src/redux/actions/layout'

const AddEditBtn = ({isAdd, data}) => {
    const dispatch = useDispatch()
    const {addEditPopup, addEditPopupData} = useSelector(state => state.layout)
    const handleOpen = (setData) => {
      dispatch(setAddEditPopup(!addEditPopup))
      if (setData) {
          dispatch(setAddEditPopupData(data))
      } else {
          dispatch(setAddEditPopupData({}))
      }
    }
    return isAdd ? (
      <Col className="w-100 text-right">
        <Button className="ml-2" color="primary" onClick={(e) => handleOpen(false)}>
          <FiPlusSquare size={15} />
          <span className="align-middle ml-50">Add Room</span>
        </Button>
      </Col>
    ) : (
      <div className="demo-inline-spacing">
        <Button.Ripple
          className="btn-icon"
          color="flat-success"
          onClick={(e) => handleOpen(true)}
        >
          <FiEdit size={16} />
        </Button.Ripple>
        <Button.Ripple className="btn-icon" color="flat-danger">
          <FiTrash2 size={16} />
        </Button.Ripple>
      </div>
    )
  }
  
  export default AddEditBtn
  