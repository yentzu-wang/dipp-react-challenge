const API_KEY = "76b7dbc07624d1b882b9450253cc3635"
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

const endpoints = {
  v1: ROOT_URL,
  v2: "http://localhost:4000/"
}

export default endpoints
