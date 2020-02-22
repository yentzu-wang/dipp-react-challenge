import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const Weather = () => {
  const { data } = useQuery(Weather.query.weather, {
    variables: {
      city: "taipei",
      country: "tw"
    }
  })
  console.log(data)

  return <div>Weather</div>
}

Weather.query = {
  weather: gql`
    query Weather($city: String!, $country: String!) {
      weather(city: $city, country: $country)
        @rest(type: "test", path: "&q=city,country") {
        list {
          dt
          dt_txt
          main {
            temp
            feels_like
          }
          weather {
            main
            description
          }
        }
      }
    }
  `
}

export default Weather
