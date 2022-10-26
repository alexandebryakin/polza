import gql from 'graphql-tag';

export const GET_BUSINESS_CARDS = gql`
  query GetBusinessCards($userId: ID!) {
    businessCards(userId: $userId) {
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
  }
`;
