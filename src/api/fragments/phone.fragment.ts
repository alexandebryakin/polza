import gql from 'graphql-tag';

export const PHONE_FRAGMENT = gql`
  fragment PhoneFields on Phone {
    id
    number
    isPrimary
    verificationStatus
  }
`;
