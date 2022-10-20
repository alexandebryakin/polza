import gql from 'graphql-tag';

export const CREATE_PHONE = gql`
  mutation CreatePhone($number: String!) {
    createPhone(number: $number) {
      phone {
        id
        number
      }
      status
      errors
    }
  }
`;
