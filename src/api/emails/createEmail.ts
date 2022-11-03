import gql from 'graphql-tag';

export const CREATE_EMAIL = gql`
  mutation CreateEmail($email: String!) {
    createEmail(email: $email) {
      email {
        ...EmailFields
      }
      status
      errors
    }
  }
`;
