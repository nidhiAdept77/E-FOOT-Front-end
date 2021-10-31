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

const SubmitScoreButton = ({data}) => {
  const dispatch = useDispatch()
  const { addEditPopup, disputePopup } = useSelector((state) => state.layout)
  const handleOpen = (setData) => {
    if (data.status === CONSTANTS.STATUS.ACCEPTED) {
      dispatch(setAddEditPopup(!addEditPopup))
      if (setData) {
        dispatch(setAddEditPopupData(data))
      } else {
        dispatch(setAddEditPopupData({}))
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

  return (
    <div className="demo-inline-spacing">
      {data.status === CONSTANTS.STATUS.DISPUTE ? (
        <Button
          className="btn-icon m-0"
          color="flat-primary"
          onClick={(e) => handleOpen(true)}
        >
          Resolve Dispute
        </Button>
      ) : (
        <Button
          className="btn-icon m-0"
          color="flat-primary"
          onClick={(e) => handleOpen(true)}
        >
          Submit Score
        </Button>
      )}
    </div>
  )
}

const WLStatus = ({data}) => {

  const {user} = useSelector(state => state.auth)
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
  
  return (<div>
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
    name: "Type",
    selector: "type",
    sortable: true,
    cell: (row) => row.type
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <SubmitScoreButton data={row} />
    )
  }
]
