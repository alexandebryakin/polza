import React from 'react';
import { jwt } from '../../api/jwt';
import { IUsePassport, usePassport } from '../../api/passports';

export interface IUserInfoContext {
  loading: boolean;
  passport: IUsePassport['passport'];
}

export const UserInfoContext = React.createContext({} as IUserInfoContext);

const userIdFromJwt = (): string => {
  return jwt.decoded()?.data.user.id || '';
};

export const UserInfoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    loading: loadingPassoword,
    passport,
    refetch: refetchPassport,
  } = usePassport({
    userId: userIdFromJwt(),
  });

  const token = jwt.get();

  React.useEffect(() => {
    refetchPassport({ userId: userIdFromJwt() });
  }, [refetchPassport, token]);

  const loading = loadingPassoword;

  return <UserInfoContext.Provider value={{ passport, loading }} children={children} />;
};

export const useUserInfoContext = () => {
  return React.useContext(UserInfoContext);
};
