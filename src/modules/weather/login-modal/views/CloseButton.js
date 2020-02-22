import React from "react"
import PropTypes from "prop-types"

const CloseButton = ({ onClick }) => {
  return (
    <div className="login-modal__close-btn" onClick={onClick}>
      <i className="fas fa-times" />
    </div>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CloseButton
