import React from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import CloseButton from "./CloseButton"
import FormInput from "./FormInput"
import { useFormInput } from "../hooks"
import GeneralAlert, { useAlerts } from "../../../../components/general-alert"

const LoginModal = ({ setShow }) => {
  const user = useFormInput()
  const password = useFormInput()
  const { alerts, addAlert } = useAlerts()
  const history = useHistory()

  const [login] = useLazyQuery(LoginModal.query.login, {
    onCompleted: data => {
      if (data?.login?.account) {
        localStorage.setItem("currentUser", data.login.account)
        history.push("/weather")
      } else {
        addAlert("Login error!")
      }
    }
  })

  const onLogin = () => {
    try {
      login({
        variables: {
          account: user.value
        }
      })
    } catch (err) {
      addAlert(err.message)
    }
  }

  return (
    <>
      <GeneralAlert alerts={alerts} />
      <div className="login-modal">
        <CloseButton onClick={() => setShow(false)} />
        <div className="login-modal__description">
          Use admin/user1/user2 to login
        </div>
        <div className="login-modal__form">
          <FormInput
            {...user}
            placeholder="Enter your account"
            account
            login={onLogin}
          />
          <FormInput
            {...password}
            placeholder="Enter your password"
            password
            login={onLogin}
          />
          <button className="login-modal__login-btn" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  )
}

LoginModal.query = {
  login: gql`
    query Login($account: String) {
      login(id: $account) @rest(path: "users/{args.id}", endpoint: "v2") {
        id
        account
        city
      }
    }
  `
}

LoginModal.propTypes = {
  setShow: PropTypes.func.isRequired
}

export default LoginModal
