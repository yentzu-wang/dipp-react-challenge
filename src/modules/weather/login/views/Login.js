import React from "react"
import weather from "../../../../video/weather.mp4"

const Login = () => {
  return (
    <div className="login">
      <div className="login__video">
        <video autoPlay loop muted={true} playsInline>
          <source src={weather} type="video/mp4" />
        </video>
      </div>
      <button className="login__btn">Ready to experience</button>
    </div>
  )
}

export default Login
