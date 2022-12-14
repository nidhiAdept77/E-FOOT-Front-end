import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Button, Col } from "reactstrap"

import { useSelector, useDispatch } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { updateChatRequests } from "../../../redux/actions/chatRequests"
import { useEffect, useState } from "react"

const AddEditBtn = ({data: {_id, createdBy, status}}) => {
    const dispatch = useDispatch()
    const {user: {_id: currentLoggedInUser = ""} = ""} = useSelector(state => state.auth)

    const handleApproval = () => {
      if (_id) {
        dispatch(updateChatRequests({_id, status: "accepted"}))
      }
    }

    const handleRejection = async () => {
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
        if (result.value && _id) {
            // update request to reject
            dispatch(updateChatRequests({_id, status: "rejected"}))
        }
      }

      const [hideButtons, setHideButtons] = useState("")

      useEffect(() => {
        setHideButtons(createdBy !== currentLoggedInUser && status === "pending")
        return () => {
        }
      }, [currentLoggedInUser, status])

    return (hideButtons ?
      <div className="demo-inline-spacing">
        <Button.Ripple
          className="btn-icon m-0"
          color="flat-success"
          onClick={handleApproval}
        >
          Accept
        </Button.Ripple>
        <Button.Ripple className="btn-icon m-0" onClick={handleRejection} color="flat-danger">
          Reject
        </Button.Ripple>
      </div> : ""
    )
  }
  
  export default AddEditBtn
  