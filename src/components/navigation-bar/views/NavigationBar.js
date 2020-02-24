import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import classnames from "classnames"

const NavigationBar = () => {
  const location = useLocation()
  const history = useHistory()

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
              "navigation__link--active": location.pathname.includes("/weather")
            })}
            to="/weather"
          >
            Weather
          </Link>
        </li>
        <li>
          <Link
            className={classnames("navigation__link", {
              "navigation__link--active": location.pathname.includes(
                "/image-ad"
              )
            })}
            to="/image-ad"
          >
            Image Ad
          </Link>
        </li>
      </ul>
      {localStorage.getItem("currentUser") && (
        <div
          className="navigation__logout"
          onClick={() => {
            localStorage.removeItem("currentUser")
            history.push("/weather/login")
          }}
        >
          Log out
        </div>
      )}
    </div>
  )
}

export default NavigationBar
