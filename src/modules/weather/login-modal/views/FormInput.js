import React from "react"
import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap"
import classnames from "classnames"
import PropTypes from "prop-types"

const FormInput = ({ placeholder, account, password, ...formInput }) => {
  return (
    <>
      <InputGroup>
        <InputGroupAddon addonType="prepend" className="d-flex">
          <InputGroupText>
            <i
              className={classnames("fas", {
                "fa-user": account,
                "fa-key": password
              })}
              style={{ width: 16, heigh: 16 }}
            />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type={password ? "password" : "text"}
          {...formInput}
        />
      </InputGroup>
    </>
  )
}

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  account: PropTypes.bool,
  password: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default FormInput
