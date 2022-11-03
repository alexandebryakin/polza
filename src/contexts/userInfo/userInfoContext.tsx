import React from 'react';
import { PassportFieldsFragment } from '../../api/graphql.types';
import { jwt } from '../../api/jwt';
import { IUseUser, useUser } from '../../api/users';

export interface IUserInfoContext {
  loading: boolean;
  user: IUseUser['user'];
  passport?: PassportFieldsFragment | null;
  refetchUser: IUseUser['refetch'];
}

export const UserInfoContext = React.createContext({} as IUserInfoContext);

const userIdFromJwt = (): string => {
  return jwt.decoded()?.data.user.id || '';
};

export const UserInfoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    loading,
    user,
    refetch: refetchUser,
  } = useUser({
    userId: userIdFromJwt(),
  });

  const { passport } = user || {};

  const token = jwt.get();

  React.useEffect(() => {
    refetchUser({ userId: userIdFromJwt() });
  }, [refetchUser, token]);

  return <UserInfoContext.Provider value={{ user, passport, loading, refetchUser }} children={children} />;
};

export const useUserInfoContext = () => {
  return React.useContext(UserInfoContext);
};
