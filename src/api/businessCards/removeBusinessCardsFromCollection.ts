import gql from 'graphql-tag';

export const REMOVE_BUSINESS_CARDS_FROM_COLLECTION = gql`
  mutation RemoveFromCollection($collectionId: ID!, $businessCardIds: [ID!]!) {
    removeBusinessCardsFromCollection(collectionId: $collectionId, businessCardIds: $businessCardIds)
  }
`;
