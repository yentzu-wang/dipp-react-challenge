import React, { useState } from "react"
import AdminSetting from "./AdminSetting"
import Setting from "./Setting"
import WeatherDisplay from "./WeatherDisplay"
import WeatherContext from "../WeatherContext"

const WeatherQuery = () => {
  const user = localStorage.getItem("currentUser")
  const [hourlyData, setHourlyData] = useState()

  const renderSettingSection = user => {
    if (user === "admin") {
      return <AdminSetting />
    }

    return <Setting />
  }

  if (!user) {
    return null
  }

  return (
    <WeatherContext.Provider value={{ hourlyData, setHourlyData }}>
      <div className="weather">
        {renderSettingSection(user)}
        <br />
        <WeatherDisplay />
      </div>
    </WeatherContext.Provider>
  )
}

export default WeatherQuery
