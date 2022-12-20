import React from 'react';
import { Toggler } from '../../hooks/useToggler';

type MobileMenuContextType = {
  toggler: Toggler;
};

export const MobileMenuContext = React.createContext({} as MobileMenuContextType);

export const useMobileMenuContext = () => React.useContext(MobileMenuContext);
