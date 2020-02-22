import React from "react"
import { Alert } from "reactstrap"
import PropTypes from "prop-types"

const GeneralAlert = ({ alerts }) => (
  <div className="general-alert">
    {alerts.map((alert, index) => (
      <Alert key={index} color={alert?.color || "danger"} fade={true}>
        {alert?.message || alert}
      </Alert>
    ))}
  </div>
)

GeneralAlert.propType = {
  alerts: PropTypes.array.isRequired
}

export default GeneralAlert
