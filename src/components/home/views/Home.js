import React from "react"
import { useHistory } from "react-router-dom"

const Home = () => {
  const history = useHistory()

  return (
    <>
      <div className="home">
        <div className="heading-primary">
          <div className="heading-primary--main">Select your app</div>
        </div>
        <div className="heading-secondary">
          <div className="home__link" onClick={() => history.push("/weather")}>
            Weather
          </div>
        </div>
        <div className="heading-secondary">
          <div className="home__link" onClick={() => history.push("/image-ad")}>
            Image Ad
          </div>
        </div>
      </div>
      <div className="home__info">
        by Frank Wang
        <div>
          Feel free to send me any feedback through{" "}
          <a href="mailto:frank7300228@hotmail.com">email</a>
        </div>
      </div>
    </>
  )
}

export default Home
