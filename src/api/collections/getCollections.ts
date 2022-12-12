import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql`
  query GetCollections($userId: ID!, $kind: CollectionKindEnum) {
    collections(userId: $userId, kind: $kind) {
      ...CollectionFields
    }
  }
`;
