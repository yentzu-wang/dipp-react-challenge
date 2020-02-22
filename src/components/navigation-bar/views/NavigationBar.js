import React from "react"
import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link className="navigation__link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navigation__link" to="/weather">
            Weather
          </Link>
        </li>
        <li>
          <Link className="navigation__link" to="/image-ad">
            Image Ad
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
