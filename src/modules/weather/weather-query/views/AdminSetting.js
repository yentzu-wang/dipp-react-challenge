import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const AdminSetting = () => {
  const [user, setUser] = useState("admin")
  const { data: cityData } = useQuery(AdminSetting.query.cities)
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
      }
    ]
  })

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
                onChange={e =>
                  updateUserCity({
                    variables: {
                      account: user,
                      city: e.target.value
                    }
                  })
                }
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
  `
}

export default AdminSetting
