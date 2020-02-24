/* eslint-disable camelcase */
import React from "react"

const Logo = ({
  data: {
    ad: {
      logo: { logo_resource }
    }
  }
}) => {
  return <img className="ad__logo" src={logo_resource} alt="logo" />
}

export default Logo
