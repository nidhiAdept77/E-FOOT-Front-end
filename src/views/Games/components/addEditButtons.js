import { FiEdit, FiTrash2, FiPlusSquare } from "react-icons/fi"
import { Button, Col } from "reactstrap"

import { useSelector, useDispatch } from "react-redux"
import {setAddEditPopup, setAddEditPopupData} from '@src/redux/actions/layout'
import {deleteGames} from '@src/redux/actions/games'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddEditBtn = ({isAdd, data}) => {
    const dispatch = useDispatch()
    const {addEditPopup} = useSelector(state => state.layout)
    const handleOpen = (setData) => {
      dispatch(setAddEditPopup(!addEditPopup))
      if (setData) {
          dispatch(setAddEditPopupData(data))
        } else {
          dispatch(setAddEditPopupData({}))
        }
      }
      
      const handleDelete = async () => {
        const MySwal = withReactContent(Swal)
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        })
        if (result.value) {
           dispatch(deleteGames(data._id))
        }
      }

    return isAdd ? (
      <Col className="w-100 text-right">
        <Button className="ml-2" color="primary" onClick={(e) => handleOpen(false)}>
          <FiPlusSquare size={15} />
          <span className="align-middle ml-50">Add Game</span>
        </Button>
      </Col>
    ) : (
      <div className="demo-inline-spacing">
        <Button.Ripple
          className="btn-icon m-0"
          color="flat-success"
          onClick={(e) => handleOpen(true)}
        >
          <FiEdit size={16} />
        </Button.Ripple>
        <Button.Ripple className="btn-icon m-0" onClick={(e) => handleDelete()} color="flat-danger">
          <FiTrash2 size={16} />
        </Button.Ripple>
      </div>
    )
  }
  
  export default AddEditBtn
  