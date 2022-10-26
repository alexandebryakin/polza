import gql from 'graphql-tag';

export const UPSERT_BUSINESS_CARD = gql`
  mutation UpsertBusinessCard(
    $id: ID
    $title: String!
    $subtitle: String!
    $description: String
    $address: String
    $status: PublicationStatusEnum
    $phones: [String!]!
    $emails: [String!]!
  ) {
    upsertBusinessCard(
      id: $id
      title: $title
      subtitle: $subtitle
      description: $description
      address: $address
      status: $status
      phones: $phones
      emails: $emails
    ) {
      businessCard {
        id
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
      status
      errors
    }
  }
`;
