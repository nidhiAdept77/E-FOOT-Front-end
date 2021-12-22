import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Button, Col } from "reactstrap"

import { useSelector, useDispatch } from "react-redux"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddEditBtn = ({isAdd, data}) => {
    const dispatch = useDispatch()
    const handleOpen = (setData) => {
      if (setData) {
        console.log('setData: ', setData)
      } else {
      }
    }

    const handleDelete = async () => {
        const MySwal = withReactContent(Swal)
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        })
        if (result.value) {
            const { _id } = data
            // update request to reject
        }
      }

    return (
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
  