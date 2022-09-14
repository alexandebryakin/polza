import { ObservableQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GetPassportQuery, GetPassportQueryVariables, useGetPassportQuery } from '../graphql.types';

export const GET_PASSPORT = gql`
  query GetPassport($userId: ID!) {
    passport(userId: $userId) {
      id
      userId
      firstName
      lastName
      middleName
      code
      number
      verificationStatus
      image {
        url
      }
    }
  }
`;

export interface IUsePassport {
  loading: boolean;
  passport?: GetPassportQuery['passport'];
  refetch: ObservableQuery['refetch'];
}
export const usePassport = (variables: GetPassportQueryVariables): IUsePassport => {
  const { loading, data, refetch } = useGetPassportQuery({ variables });

  return {
    loading,
    passport: data?.passport,
    refetch,
  };
};
