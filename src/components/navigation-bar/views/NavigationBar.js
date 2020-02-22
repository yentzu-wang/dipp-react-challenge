import React from "react"
import { Link, useLocation } from "react-router-dom"
import classnames from "classnames"

const NavigationBar = () => {
  const location = useLocation()

  return (
    <div className="navigation">
      <ul>
        <li>
          <Link
            className={classnames("navigation__link", {
              "navigation__link--active": location.pathname === "/"
            })}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={classnames("navigation__link", {
              "navigation__link--active": location.pathname === "/weather"
            })}
            to="/weather"
          >
            Weather
          </Link>
        </li>
        <li>
          <Link
            className={classnames("navigation__link", {
              "navigation__link--active": location.pathname === "/image-ad"
            })}
            to="/image-ad"
          >
            Image Ad
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
