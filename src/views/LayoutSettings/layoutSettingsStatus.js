import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { CustomInput } from 'reactstrap'

const LayoutSettingsStatus = ({ row }) => {
  return (
    <div className="mt-5">
      <div className="mb-1">
        <CustomInput
          type="radio"
          className={
            row.isLiveVisible
              ? "custom-control-success"
              : "custom-control-danger"
          }
          id="success"
          label="Live"
          defaultChecked
          inline
        />
      </div>
      <div className="mb-1">
        <CustomInput
          type="radio"
          className={
            row.isProdVisible
              ? "custom-control-success"
              : "custom-control-danger"
          }
          id="success"
          label="Staging"
          defaultChecked
          inline
        />
      </div>
      <div className="mb-1">
        <CustomInput
          type="radio"
          className={
            row.isQaVisible
              ? "custom-control-success"
              : "custom-control-danger"
          }
          id="danger"
          label="Development"
          defaultChecked
          inline
        />
      </div>
    </div>
  )
}

LayoutSettingsStatus.propTypes = {
    layoutSettings: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    loading: state.layoutSettings.loading,
    layoutSettings: state.layoutSettings.layoutSettings
})
export default connect(mapStateToProps)(LayoutSettingsStatus)
