import React from 'react';
import { Toggler } from '../../hooks/useToggler';

interface IDropdownContext {
  dropdown: Toggler;
}

export const DropdownContext = React.createContext({} as IDropdownContext);

export const useDropdown = (): IDropdownContext => {
  return React.useContext(DropdownContext);
};
