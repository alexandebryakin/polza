import React from 'react';
import { CollectionKindEnum, useGetBusinessCardsLazyQuery, useGetBusinessCardsQuery } from '../../api/graphql.types';
import { useUserInfoContext } from '../userInfo/userInfoContext';

const usePersonalCollectionBusinessCards = () => {
  const { user } = useUserInfoContext();

  const personalCollection = user?.collections.find((c) => c.kind === CollectionKindEnum.Personal);

  const { data, loading, refetch } = useGetBusinessCardsQuery({
    variables: {
      collectionIds: personalCollection && [personalCollection.id],
    },
  });

  return {
    businessCards: data?.businessCards || [],
    loading,
    refetch,
  };
};

const useOwnBusinessCards = () => {
  const { user } = useUserInfoContext();

  const [getBusinessCards, { data, loading, refetch }] = useGetBusinessCardsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    if (!user?.id) return;

    getBusinessCards({ variables: { userId: user.id } });
  }, [getBusinessCards, user?.id]);

  return {
    businessCards: data?.businessCards || [],
    loading,
    refetch,
  };
};

type BusinessCardContextType = {
  personalCollectionBusinessCards: ReturnType<typeof usePersonalCollectionBusinessCards>;
  ownBusinessCards: ReturnType<typeof useOwnBusinessCards>;
};

const BusinessCardsContext = React.createContext({} as BusinessCardContextType);

export const useBusinessCards = () => React.useContext(BusinessCardsContext);

export const BusinessCardsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const personalCollectionBusinessCards = usePersonalCollectionBusinessCards();
  const ownBusinessCards = useOwnBusinessCards();

  return (
    <BusinessCardsContext.Provider
      value={{
        personalCollectionBusinessCards,
        ownBusinessCards,
      }}
    >
      {children}
    </BusinessCardsContext.Provider>
  );
};
