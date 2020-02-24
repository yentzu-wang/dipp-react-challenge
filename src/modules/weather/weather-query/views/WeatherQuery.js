import React from "react"
import AdminSetting from "./AdminSetting"
import Setting from "./Setting"
import WeatherDisplay from "./WeatherDisplay"

const WeatherQuery = () => {
  const user = localStorage.getItem("currentUser")

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
    <div className="weather">
      {renderSettingSection(user)}
      <br />
      <WeatherDisplay />
    </div>
  )
}

export default WeatherQuery
