import { useSelector, useDispatch } from "react-redux"
import {
  toggleAdminDisputeModal,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { Button } from "reactstrap"

const ResolveDisputeButton = ({data}) => {

  const dispatch = useDispatch()

  const handleOpen = (toggle, data) => {
    console.log('data: ', data)
    dispatch(setAddEditPopupData(data))
    dispatch(toggleAdminDisputeModal(toggle))
  }
  
  return (<Button
    className="btn-icon m-0"
    color="flat-primary"
    onClick={(e) => handleOpen(true, data)}
  >
    Resolve
  </Button>)
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
    name: "Challenger",
    selector: "challenger",
    sortable: true,
    cell: (row) => row?.challengerName
  },
  {
    name: "Acceptor",
    selector: "acceptor",
    sortable: true,
    cell: (row) => row?.acceptorName
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <ResolveDisputeButton data={row} />
    )
  }
]