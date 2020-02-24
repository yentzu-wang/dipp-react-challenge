import React from "react"
import { Switch, Route } from "react-router-dom"
import { gql } from "apollo-boost"
import requireAuth from "./requireAuth"
import Login from "../../login"
import WeatherQuery from "../../weather-query"

const WeatherContainer = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/weather">
          <WeatherQuery />
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
        @rest(type: "Weather", path: "&q=:city,:country", endpoint: "v1") {
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

export default requireAuth(WeatherContainer)
