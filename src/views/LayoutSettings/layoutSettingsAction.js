import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, FileText, Archive, Trash, Edit } from "react-feather"
import { CONSTANTS } from "../../utils/CONSTANTS"

import { updateLayourSetting, updateLayoutSettingStore } from "@src/redux/actions/layoutSettings"
import { showToastMessage } from "@src/redux/actions/toastNotification"
import _ from "underscore"

const LayoutSettingActions = ({ row, updateLayourSetting, showToastMessage, updateLayoutSettingStore,  layoutSettings }) => {
  const updateConfig = {
    testing: "isQaVisible",
    staging: "isProdVisible",
    live: "isLiveVisible"
  }
  const handleClick = async (environment, data) => {
    const dataToUpdate = {}
    if (typeof data[updateConfig[environment]] === "boolean") {
      dataToUpdate[[updateConfig[environment]]] = !data[updateConfig[environment]]
    } else {
      dataToUpdate[[updateConfig[environment]]] = true 
    }
    data = { ...data, id: data._id, ...dataToUpdate }
    delete data._id
    try {
      const result = await updateLayourSetting(data)
      if (result.success) {
        const updateLayoutRedux =  _.map(layoutSettings, (settings) => {
          if (settings._id === data.id) {
            delete data.id
            return _.extend(settings, data)
          }
          return settings
        })
        updateLayoutSettingStore(updateLayoutRedux)
        showToastMessage(result.message, "success")
      } else {
        showToastMessage(result.message, "error")
      }
    } catch (error) {
      showToastMessage(error.message, "error")
    }
  }

  return (
    <div className="d-flex">
      <UncontrolledDropdown>
        <DropdownToggle className="pr-1" tag="span">
          <MoreVertical size={15} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            className="w-100"
            onClick={() => handleClick(CONSTANTS.ENV_TYPE.LIVE, row)}
          >
            <Trash size={15} />
            <span className="align-middle ml-50">{row.isLiveVisible ? "Live (unpublish)" : "Live (publish)"}</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => handleClick(CONSTANTS.ENV_TYPE.STAGING, row)}
          >
            <Archive size={15} />
            <span className="align-middle ml-50">{row.isProdVisible ? "Staging (unpublish)" : "Staging (publish)"}</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => handleClick(CONSTANTS.ENV_TYPE.TESTING, row)}
          >
            <FileText size={15} />
            <span className="align-middle ml-50">{row.isQaVisible ? "Development (unpublish)" : "Development (publish)"}</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <a href={`/layout-settings/${row._id}`}>
        <Edit size={15} />
      </a>
    </div>
  )
}

LayoutSettingActions.propTypes = {
  updateLayourSetting: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired,
  updateLayoutSettingStore: PropTypes.func.isRequired,
  layoutSettings: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.layoutSettings.loading,
  layoutSettings: state.layoutSettings.layoutSettings
})

export default connect(mapStateToProps, { updateLayourSetting, updateLayoutSettingStore, showToastMessage })(LayoutSettingActions)
