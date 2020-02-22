import React from "react"
import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
        <li>
          <Link to="/image-ad">Image Ad</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
