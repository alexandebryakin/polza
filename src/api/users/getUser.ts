import gql from 'graphql-tag';
import { useGetUserQuery, GetUserQuery, GetUserQueryVariables } from '../graphql.types';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      emails {
        ...EmailFields
      }
      phones {
        ...PhoneFields
      }
      passport {
        ...PassportFields
      }
    }
  }
`;

export interface IUseUser extends ReturnType<typeof useGetUserQuery> {
  user?: GetUserQuery['user'];
}
export const useUser = (variables: GetUserQueryVariables): IUseUser => {
  const response = useGetUserQuery({ variables, fetchPolicy: 'cache-and-network' });

  return {
    ...response,
    user: response.data?.user,
  };
};
