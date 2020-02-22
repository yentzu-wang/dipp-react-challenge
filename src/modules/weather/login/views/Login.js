import React, { useState } from "react"
import LoginModal from "../../login-modal"
import TransitionContainer from "../../../../components/transition-container"

import weather from "../../../../video/weather.mp4"

const Login = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <div className="login">
        <div className="login__video">
          <video autoPlay loop muted={true} playsInline>
            <source src={weather} type="video/mp4" />
          </video>
        </div>
        <button className="login__btn" onClick={() => setShow(true)}>
          Ready to experience
        </button>
        <br />
      </div>
      <TransitionContainer show={show} setShow={setShow} childrenHeight={210}>
        <LoginModal setShow={setShow} />
      </TransitionContainer>
    </>
  )
}

export default Login
