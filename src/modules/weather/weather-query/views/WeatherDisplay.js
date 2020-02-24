import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import moment from "moment"
import _ from "lodash"
import WeatherBlock from "./WeatherBlock"
import HourlyDisplay from "./HourlyDisplay"
import WeatherContext from "../WeatherContext"

const WeatherDisplay = () => {
  const [hourlyData, setHourlyData] = useState()
  const user = localStorage.getItem("currentUser")
  const [weather, { data: weatherData }] = useLazyQuery(
    WeatherDisplay.query.weather,
    {
      fetchPolicy: "cache-and-network"
    }
  )
  const { data: userData } = useQuery(WeatherDisplay.query.user, {
    variables: {
      account: user
    },
    fetchPolicy: "cache-and-network"
  })

  useWeatherData(weather, userData)

  const data = weatherData?.weather?.list?.map(weather => {
    return {
      ...weather,
      parsedDt: moment(weather.dt_txt).format("YYYY/MM/DD")
    }
  })

  const filteredData = _.uniqBy(data, "parsedDt")

  return (
    <WeatherContext.Provider value={{ hourlyData, setHourlyData }}>
      <Card>
        <CardHeader>Weather Forecast</CardHeader>
        <CardBody>
          <div className="forecast">
            {filteredData?.map((weather, index) => (
              <WeatherBlock key={index} weather={weather} data={data} />
            ))}
          </div>
        </CardBody>
      </Card>
      {hourlyData && (
        <>
          <br />
          <HourlyDisplay />
        </>
      )}
    </WeatherContext.Provider>
  )
}

WeatherDisplay.query = {
  user: gql`
    query User($account: String!) {
      user(account: $account)
        @rest(type: "User", path: "users/{args.account}", endpoint: "v2") {
        city
      }
    }
  `,
  weather: gql`
    query Weather($city: String!) {
      weather(city: $city)
        @rest(type: "Weather", path: "&q={args.city}", endpoint: "v1") {
        list {
          dt_txt
          main {
            temp_min
            temp_max
          }
          weather {
            icon
          }
        }
      }
    }
  `
}

const useWeatherData = (weather, userData) => {
  useEffect(() => {
    if (userData?.user?.city) {
      weather({
        variables: {
          city: userData.user.city
        }
      })
    }
    return () => {}
  }, [weather, userData])
}

export default WeatherDisplay
