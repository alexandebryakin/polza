import gql from 'graphql-tag';

export const ADD_BUSINESS_CARDS_TO_COLLECTION = gql`
  mutation AddToCollection($collectionId: ID!, $businessCardIds: [ID!]!) {
    addBusinessCardsToCollection(collectionId: $collectionId, businessCardIds: $businessCardIds)
  }
`;
