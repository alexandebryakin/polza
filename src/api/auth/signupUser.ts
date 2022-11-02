import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      user {
        id
        emails {
          id
          email
        }
      }
      token
      errors
    }
  }
`;
