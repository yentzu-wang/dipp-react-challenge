import { useState } from "react"

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([])

  const addAlert = alert => {
    setAlerts(prevAlerts => prevAlerts.concat(alert))

    setTimeout(() => {
      setAlerts(prevAlerts => prevAlerts.slice(1))
    }, 3000)
  }

  return { alerts, addAlert }
}
