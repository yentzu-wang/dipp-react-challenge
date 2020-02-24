/* eslint-disable camelcase */
import React, { useContext } from "react"
import moment from "moment"
import PropTypes from "prop-types"
import WeatherContext from "../WeatherContext"

const WeatherBlock = ({ weather, data }) => {
  const { setHourlyData } = useContext(WeatherContext)

  function getDayString(date) {
    switch (moment(date).day()) {
      case 1:
        return "Mon"
      case 2:
        return "Tue"
      case 3:
        return "Wed"
      case 4:
        return "Thu"
      case 5:
        return "Fri"
      case 6:
        return "Sat"
      case 7:
        return "Sun"
      default:
        return ""
    }
  }

  return (
    <div
      className="forecast__weather"
      onClick={() => {
        setHourlyData(data.filter(d => d.parsedDt === weather.parsedDt))
      }}
    >
      <div className="forecast__weather__day">
        {getDayString(weather.dt_txt)}
      </div>
      <img
        className="forecast__weather__img"
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather_icon"
      />
      <div className="forecast__weather__temp">{`${weather.main.temp_max}° ${weather.main.temp_min}°`}</div>
    </div>
  )
}

WeatherBlock.propTypes = {
  weather: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default WeatherBlock
