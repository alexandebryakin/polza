import gql from 'graphql-tag';

export const COLLECTION_FRAGMENT = gql`
  fragment CollectionFields on Collection {
    id
    userId
    name
    kind
  }
`;
