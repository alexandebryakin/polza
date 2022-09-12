import gql from 'graphql-tag';

export const UPSERT_PASSPORT = gql`
  mutation UpsertPassport(
    $firstName: String!
    $lastName: String!
    $middleName: String!
    $code: String!
    $number: String!
    $image: Upload!
  ) {
    upsertPassport(
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      code: $code
      number: $number
      image: $image
    ) {
      passport {
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
      status
      errors
    }
  }
`;
