import React from 'react';
import { CollectionKindEnum } from '../api/graphql.types';
import { useUserInfoContext } from '../contexts/userInfo/userInfoContext';

export const usePersonalCollection = () => {
  const { user } = useUserInfoContext();

  return React.useMemo(() => {
    return user?.collections.find((c) => c.kind === CollectionKindEnum.Personal);
  }, [user]);
};
