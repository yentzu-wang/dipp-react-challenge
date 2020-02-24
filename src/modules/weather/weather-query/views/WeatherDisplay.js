import React, { useEffect } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const WeatherDisplay = () => {
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

  console.log(weatherData)

  return (
    <Card>
      <CardHeader>Weather Forecast</CardHeader>
      <CardBody></CardBody>
    </Card>
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
          dt
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
