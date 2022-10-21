import gql from 'graphql-tag';

export const PASSPORT_FRAGMENT = gql`
  fragment PassportFields on Passport {
    id
    userId
    firstName
    lastName
    middleName
    code
    number
    verificationStatus
    image {
      url
    }
  }
`;
