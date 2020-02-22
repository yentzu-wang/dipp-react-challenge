import React from "react"
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

const Setting = () => {
  const user = localStorage.getItem("currentUser")
  const { data: cityData } = useQuery(Setting.query.cities)
  const { data: usersData } = useQuery(Setting.query.users, {
    variables: {
      account: user
    }
  })
  const [updateUserCity] = useMutation(Setting.mutation.UpdateUserCity, {
    refetchQueries: [
      {
        query: Setting.query.users,
        variables: {
          account: user
        }
      }
    ]
  })

  // console.log(data)
  console.log(usersData?.user?.city)

  return (
    <Card>
      <CardHeader>Setting</CardHeader>
      <CardBody>
        <Row>
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
                value={usersData?.user?.city || "taipei,tw"}
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

Setting.query = {
  users: gql`
    query Users($account: String!) {
      user(account: $account)
        @rest(type: "User", path: "users/{args.account}", endpoint: "v2") {
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

Setting.mutation = {
  UpdateUserCity: gql`
    mutation UpdateUserCity($account: String!, $city: String!) {
      users(input: { id: $account, account: $account, city: $city })
        @rest(method: "PUT", path: "users/{args.input.id}", endpoint: "v2") {
        NoResponse
      }
    }
  `
}

export default Setting
