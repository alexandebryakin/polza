import gql from 'graphql-tag';

export const GET_BUSINESS_CARDS = gql`
  query GetBusinessCards($userId: ID!) {
    businessCards(userId: $userId) {
      ...BusinessCardFields
    }
  }
`;
