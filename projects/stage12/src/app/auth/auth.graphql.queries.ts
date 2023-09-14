import { gql } from 'apollo-angular'

export const GET_ME = gql`
  query Me {
    me {
      address {
        line1
        line2
        city
        state
        zip
      }
      dateOfBirth
      email
      id
      level
      name {
        first
        middle
        last
      }
      phones {
        digits
        type
      }
      picture
      role
      userStatus
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`
