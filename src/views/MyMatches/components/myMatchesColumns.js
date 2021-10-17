import { useSelector, useDispatch } from "react-redux"
import {
  setAddEditPopup,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { Button } from "reactstrap"
import { showToastMessage } from "../../../redux/actions/toastNotification"
import { CONSTANTS } from "../../../utils/CONSTANTS"

const SubmitScoreButton = ({data}) => {
  const dispatch = useDispatch()
  const { addEditPopup } = useSelector((state) => state.layout)
  const handleOpen = (setData) => {
    if (data.status === CONSTANTS.STATUS.ACCEPTED) {
      dispatch(setAddEditPopup(!addEditPopup))
      if (setData) {
        dispatch(setAddEditPopupData(data))
      } else {
        dispatch(setAddEditPopupData({}))
      }
    } else {
      dispatch(showToastMessage("You can only upload score withing 2 hours after match is accepted!", "error"))
    }
  }

  return (
    <div className="demo-inline-spacing">
      <Button
        className="btn-icon m-0"
        color="flat-primary"
        onClick={(e) => handleOpen(true)}
      >Submit Score</Button>
    </div>
  )
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
    cell: (row) => row.status
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
