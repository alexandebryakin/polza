import gql from 'graphql-tag';

export const EMAIL_FRAGMENT = gql`
  fragment EmailFields on Email {
    id
    email
    isPrimary
    verificationStatus
  }
`;
