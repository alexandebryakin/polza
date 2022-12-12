import gql from 'graphql-tag';

export const ADD_BUSINESS_CARDS_TO_COLLECTIONS = gql`
  mutation addToCollection($collectionId: ID!, $businessCardIds: [ID!]!) {
    addBusinessCardsToCollection(collectionId: $collectionId, businessCardIds: $businessCardIds)
  }
`;
