import gql from 'graphql-tag';

export const SIGNIN_USER = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
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
