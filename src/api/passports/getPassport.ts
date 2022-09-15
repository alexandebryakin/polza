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

export interface IUsePassport extends Omit<ReturnType<typeof useGetPassportQuery>, 'data'> {
  passport?: GetPassportQuery['passport'];
}
export const usePassport = (variables: GetPassportQueryVariables): IUsePassport => {
  const { data, ...rest } = useGetPassportQuery({ variables });

  return {
    passport: data?.passport,
    ...rest,
  };
};
