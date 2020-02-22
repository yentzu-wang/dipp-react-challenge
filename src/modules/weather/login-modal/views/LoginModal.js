import React from "react"
import PropTypes from "prop-types"
import CloseButton from "./CloseButton"
import FormInput from "./FormInput"
import { useFormInput } from "../hooks"

const LoginModal = ({ setShow }) => {
  const user = useFormInput()
  const password = useFormInput()

  return (
    <div className="login-modal">
      <CloseButton onClick={() => setShow(false)} />
      <div className="login-modal__description">
        Use admin/user1/user2 to login
      </div>
      <div className="login-modal__form">
        <FormInput {...user} placeholder="Enter your account" account />
        <FormInput {...password} placeholder="Enter your password" password />
        <button className="login-modal__login-btn">Login</button>
      </div>
    </div>
  )
}

LoginModal.propTypes = {
  setShow: PropTypes.func.isRequired
}

export default LoginModal
