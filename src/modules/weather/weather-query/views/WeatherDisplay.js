import React from "react"
import { Card, CardHeader, CardBody } from "reactstrap"

const WeatherDisplay = () => {
  const selectedCity = localStorage.getItem("city")
  return (
    <Card>
      <CardHeader>Weather Forecast</CardHeader>
      <CardBody>{selectedCity}</CardBody>
    </Card>
  )
}

export default WeatherDisplay
