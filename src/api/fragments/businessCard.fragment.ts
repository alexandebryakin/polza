import gql from 'graphql-tag';

export const BUSINESS_CARD_FRAGMENT = gql`
  fragment BusinessCardFields on BusinessCard {
    id
    userId
    title
    subtitle
    description
    address
    status
    phones {
      ...PhoneFields
    }
    emails {
      ...EmailFields
    }
  }
`;
