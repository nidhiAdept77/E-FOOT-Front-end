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
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <div></div>
    )
  }
]