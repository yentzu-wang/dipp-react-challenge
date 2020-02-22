import React from "react"
import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap"
import classnames from "classnames"

const FormInput = ({
  id,
  placeholder,
  account,
  password,
  appendButton,
  ...formInput
}) => {
  return (
    <>
      <InputGroup id={id}>
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
        {appendButton}
      </InputGroup>
    </>
  )
}

export default FormInput
