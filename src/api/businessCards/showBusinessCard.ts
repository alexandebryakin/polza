import gql from 'graphql-tag';
import { ShowBusinessCardQuery, ShowBusinessCardQueryVariables, useShowBusinessCardQuery } from '../graphql.types';

export const SHOW_BUSINESS_CARD = gql`
  query ShowBusinessCard($id: ID!) {
    businessCard(id: $id) {
      ...BusinessCardFields
    }
  }
`;

export interface IUseBusinessCard extends Omit<ReturnType<typeof useShowBusinessCardQuery>, 'data'> {
  businessCard?: ShowBusinessCardQuery['businessCard'];
}
export const useBusinessCard = (variables: ShowBusinessCardQueryVariables): IUseBusinessCard => {
  const { data, ...rest } = useShowBusinessCardQuery({ variables });

  return {
    businessCard: data?.businessCard,
    ...rest,
  };
};
