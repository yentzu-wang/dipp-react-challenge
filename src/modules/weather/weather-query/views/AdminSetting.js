import React, { useState, useEffect, useContext } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from "reactstrap"
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import WeatherDisplay from "./WeatherDisplay"
import WeatherContext from "../WeatherContext"

const AdminSetting = () => {
  const [user, setUser] = useState("admin")
  const [city, setCity] = useState("")
  const { setHourlyData } = useContext(WeatherContext)

  const [getCities, { data: cityData }] = useLazyQuery(
    AdminSetting.query.cities,
    {
      fetchPolicy: "cache-and-network"
    }
  )
  const { data: usersData } = useQuery(AdminSetting.query.users, {
    fetchPolicy: "cache-and-network"
  })
  const [updateUserCity] = useMutation(AdminSetting.mutation.UpdateUserCity, {
    refetchQueries: [
      {
        query: AdminSetting.query.users,
        variables: {
          account: user
        }
      },
      {
        query: WeatherDisplay.query.user,
        variables: {
          account: user
        }
      }
    ]
  })
  const [putCity] = useMutation(AdminSetting.mutation.putCity)
  const [findCity] = useLazyQuery(AdminSetting.query.findCity, {
    fetchPolicy: "cache-and-network",
    onCompleted: async ({ findCity: { list } }) => {
      const firstElement = list[0]

      if (firstElement) {
        const {
          name,
          sys: { country }
        } = firstElement
        await putCity({
          variables: {
            id: name,
            name,
            value: `${name},${country}`
          }
        })

        getCities()
      }
    }
  })

  useCitiesData(getCities)

  return (
    <Card>
      <CardHeader>Admin Setting</CardHeader>
      <CardBody>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label for="user">Select User</Label>
              <Input
                type="select"
                name="user"
                onChange={e => setUser(e.target.value)}
                value={user}
              >
                {usersData?.users?.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.account}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label for="city">Select City</Label>
              <Input
                type="select"
                name="city"
                onChange={e => {
                  setHourlyData(null)
                  updateUserCity({
                    variables: {
                      account: user,
                      city: e.target.value
                    }
                  })
                }}
                value={
                  usersData?.users?.find(u => u.account === user)?.city || ""
                }
              >
                {cityData?.cities?.map((city, index) => (
                  <option key={index} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label for="findcity">Find and Add a City</Label>
              <div className="weather__find-city">
                <Input
                  type="text"
                  name="findcity"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <Button
                  color="primary"
                  onClick={() => findCity({ variables: { city } })}
                >
                  Find and Add!
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col sm={6}>
            Due to json-server's abnormal behaviors of put and post, find and
            add functionality causes wierd results. (I think it's a bug of
            json-server. UI manipulations for finding city and call api to
            update/refetch are ok and logically correct.)
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

AdminSetting.query = {
  users: gql`
    query Users {
      users @rest(type: "User", path: "users", endpoint: "v2") {
        id
        account
        city
      }
    }
  `,
  cities: gql`
    query Cities {
      cities @rest(type: "City", path: "cities", endpoint: "v2") {
        name
        value
      }
    }
  `,
  findCity: gql`
    query FindCity($city: String!) {
      findCity(city: $city)
        @rest(type: "City", path: "&q={args.city}", endpoint: "v3") {
        list {
          name
          sys {
            country
          }
        }
      }
    }
  `
}

AdminSetting.mutation = {
  UpdateUserCity: gql`
    mutation UpdateUserCity($account: String!, $city: String!) {
      users(input: { id: $account, account: $account, city: $city })
        @rest(method: "PUT", path: "users/{args.input.id}", endpoint: "v2") {
        NoResponse
      }
    }
  `,
  putCity: gql`
    mutation PutCity($name: String!, $value: String!) {
      putCity(input: { id: $name, name: $name, value: $value })
        @rest(method: "PUT", path: "cities/{args.input.name}", endpoint: "v2") {
        NoResponse
      }
    }
  `
}

// For apollo-rest-link abnormal behavior:
const useCitiesData = getCities => {
  useEffect(() => {
    getCities()

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default AdminSetting
