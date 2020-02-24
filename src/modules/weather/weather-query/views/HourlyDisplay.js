import React, { useContext } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"
import moment from "moment"
import WeatherContext from "../WeatherContext"

const HourlyDisplay = () => {
  const { hourlyData } = useContext(WeatherContext)

  return (
    <Card>
      <CardHeader>Hourly Forecast</CardHeader>
      <CardBody>
        <div className="forecast">
          {hourlyData?.map((weather, index) => (
            <div key={index} className="forecast__weather">
              <div className="forecast__weather__day">
                {moment(weather.dt_txt).format("h:mm A")}
              </div>
              <img
                className="forecast__weather__img"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather_icon"
              />
              <div className="forecast__weather__temp">{`${weather.main.temp_max}° ${weather.main.temp_min}°`}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default HourlyDisplay
