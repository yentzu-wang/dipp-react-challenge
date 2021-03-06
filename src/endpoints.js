const API_KEY = "76b7dbc07624d1b882b9450253cc3635"
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
const FIND_CITY_URL =
  "https://openweathermap.org/data/2.5/find?type=like&sort=population&appid=b6907d289e10d714a6e88b30761fae22"

const endpoints = {
  v1: ROOT_URL,
  v2: "http://localhost:4000/",
  v3: FIND_CITY_URL
}

export default endpoints
