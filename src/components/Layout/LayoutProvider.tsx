import React from 'react';
import useToggler, { Toggler } from '../../hooks/useToggler';

interface ILayoutContext {
  collapse: Toggler;
}
const LayoutContext = React.createContext({} as ILayoutContext);

export function useLayout(): ILayoutContext {
  return React.useContext(LayoutContext);
}

export interface LayoutProvideProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: LayoutProvideProps) {
  const collapse = useToggler(false);

  const value: ILayoutContext = {
    collapse,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export default LayoutProvider;
