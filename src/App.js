import React from "react"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { RestLink } from "apollo-link-rest"
import { ApolloProvider } from "react-apollo"

import logo from "./logo.svg"
import "./App.css"
import uri from "./uri"
import Weather from "./Weather"

const restLink = new RestLink({ uri })

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({ addTypename: false })
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Weather />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloProvider>
  )
}

export default App
