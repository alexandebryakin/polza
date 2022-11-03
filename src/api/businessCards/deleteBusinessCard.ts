import gql from 'graphql-tag';

export const DELETE_BUSINESS_CARD = gql`
  mutation DeleteBusinessCard($id: ID!) {
    deleteBusinessCard(id: $id) {
      businessCard {
        ...BusinessCardFields
      }
      status
      errors
    }
  }
`;
