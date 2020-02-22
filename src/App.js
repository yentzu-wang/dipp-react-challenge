import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { RestLink } from "apollo-link-rest"
import { ApolloProvider } from "react-apollo"
import uri from "./uri"
import Home from "./components/home"
import Weather from "./components/weather"
import ImageAd from "./components/image-ad"

import "./css/style.min.css"

const restLink = new RestLink({ uri })

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({ addTypename: false })
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/image-ad">Image Ad</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/weather">
              <Weather />
            </Route>
            <Route path="/image-ad">
              <ImageAd />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
