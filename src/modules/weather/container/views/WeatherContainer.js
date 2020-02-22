import React from "react"
import { Switch, Route } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Login from "../../login"

const WeatherContainer = () => {
  // const { data } = useQuery(WeatherContainer.query.weather, {
  //   variables: {
  //     city: "taipei",
  //     country: "tw"
  //   }
  // })
  // console.log(data)

  return (
    <div>
      <Switch>
        <Route exact path="/weather">
          test
        </Route>
        <Route path="/weather/login">
          <Login />
        </Route>
      </Switch>
    </div>
  )
}

WeatherContainer.query = {
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

export default WeatherContainer
