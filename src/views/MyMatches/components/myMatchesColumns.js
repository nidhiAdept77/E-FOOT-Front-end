import { useSelector, useDispatch } from "react-redux"
import {
  setAddEditPopup,
  setDisputePopup,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { Button } from "reactstrap"
import { showToastMessage } from "../../../redux/actions/toastNotification"
import { CONSTANTS } from "../../../utils/CONSTANTS"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { acceptChallenge } from '../../../redux/actions/challenges'

const SubmitScoreButton = ({ data }) => {
  const dispatch = useDispatch()
  const { addEditPopup, disputePopup } = useSelector((state) => state.layout)

  const handleOpen = async (setData) => {

    if (data.status === CONSTANTS.STATUS.ACCEPTED) {
      dispatch(setAddEditPopup(!addEditPopup))
      if (setData) {
        dispatch(setAddEditPopupData(data))
      } else {
        dispatch(setAddEditPopupData({}))
      }
    } else if (data.status === CONSTANTS.STATUS.PENDING && data.type === CONSTANTS.STATUS.PRIVATE) {
      const MySwal = withReactContent(Swal)
      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You want to accept this?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      })
      if (result.value) {
        dispatch(acceptChallenge({ _id: data._id, status: CONSTANTS.STATUS.ACCEPTED, opponent: data.acceptor }))
      }
    } else if (data.status === CONSTANTS.STATUS.DISPUTE) {
      dispatch(setDisputePopup(!disputePopup))
      if (setData) {
        dispatch(setAddEditPopupData(data))
      } else {
        dispatch(setAddEditPopupData({}))
      }
    } else {
      dispatch(showToastMessage("You can only upload score within 2 hours after match is accepted!", "error"))
    }
  }
  const declineChallenge = async () => {
    const MySwal = withReactContent(Swal)
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You want to decline this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    })
    if (result.value) {
      dispatch(acceptChallenge({ _id: data._id, status: "expired", opponent: data.acceptor }))
      alert("ok")
    }
  }
  const deleteChallenge = async () => {
    const MySwal = withReactContent(Swal)
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You want to delete this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    })
    if (result.value) {
      dispatch(acceptChallenge({ _id: data._id, status: "expired", opponent: data.acceptor }))
      alert("ok")
    }
  }

  const btnBasedOnStatusAndType = () => {

    if (data?.status === CONSTANTS.STATUS.PENDING && data?.type === CONSTANTS.STATUS.PRIVATE) {
      return (
        <>
          <Button
            className="btn-icon m-0"
            color="flat-danger"
            onClick={declineChallenge}
          >
            Decline
          </Button>
          <Button
            className="btn-icon m-0"
            color="flat-primary"
            onClick={(e) => handleOpen(true)}
          >
            Accept
          </Button>
        </>

      )
    } else if (data.status === CONSTANTS.STATUS.DISPUTE) {
      return (
        <Button
          className="btn-icon m-0"
          color="flat-primary"
          onClick={(e) => handleOpen(true)}
        >
          Resolve Dispute
        </Button>
      )
    } else if (data.status === CONSTANTS.STATUS.ACCEPTED) {
      return (
        <Button
          className="btn-icon m-0"
          color="flat-primary"
          onClick={(e) => handleOpen(true)}
        >
          Submit Score
        </Button>
      )
    }
  }

  return (
    <div className="demo-inline-spacing">
      {btnBasedOnStatusAndType()}
    </div>
  )
}

const WLStatus = ({ data }) => {

  const { user } = useSelector(state => state.auth)
  const [status, setStatus] = useState(data.status)

  useEffect(() => {
    if (data.status === CONSTANTS.STATUS.FINISHED) {
      if (data.challenger === user._id && data.challengerScore) {
        setStatus(data.challengerScore?.status)
      } else if (data.acceptor === user._id && data.opponentScore) {
        setStatus(data.opponentScore?.status)
      } else {
        setStatus(data.status)
      }
    } else {
      setStatus(data.status)
    }
    return () => {
    }
  }, [data])

  return (<div className="text-capitalize">
    {status}
  </div>)
}

export const columns = [
  {
    name: "Game",
    selector: "game",
    sortable: true,
    cell: (row) => (
      <div className="row text-left">
        <div className="col">
          <img height="40" width="40" src={row.gameImage} />
        </div>
        <div className="col">
          <span>{row.gameName}</span>
        </div>
      </div>
    )
  },
  {
    name: "Console",
    selector: "console",
    sortable: true,
    cell: (row) => row.consoleName
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: (row) => (<WLStatus data={row} />)
  },
  {
    name: "Mode",
    selector: "type",
    sortable: true,
    cell: (row) => (<span className="text-capitalize">{row.type}</span>)
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
    cell: (row) => row?.mode?.name
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <SubmitScoreButton data={row} />
    )
  }
]
