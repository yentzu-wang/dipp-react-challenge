import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

const requireAuth = Component => props => {
  const user = localStorage.getItem("currentUser")
  const history = useHistory()

  useRedirect(user, history)

  return <Component {...props} />
}

const useRedirect = (user, history) => {
  useEffect(() => {
    if (!user) {
      history.push("/weather/login")
    } else {
      history.push("/weather")
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default requireAuth
