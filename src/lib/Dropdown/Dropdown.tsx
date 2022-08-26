import React from 'react';
import useToggler from '../../hooks/useToggler';
import styles from './Dropdown.module.scss';
import css from 'classnames';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { DropdownContext } from './DropdownContext';
import Item from './Item';

type DivElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface DropdownProps extends DivElement {
  children: React.ReactNode;
  toggler: React.ReactNode;
}
function Dropdown({ children, toggler, className, ...rest }: DropdownProps) {
  const dropdown = useToggler(false);

  const ref = useOnClickOutside<HTMLDivElement>(dropdown.off);

  return (
    <DropdownContext.Provider value={{ dropdown }}>
      <div
        {...rest}
        ref={ref}
        className={css(styles.dropdown, className, {
          [styles.dropdownExpanded]: dropdown.isOn,
        })}
        onClick={dropdown.toggle}
      >
        <div className={styles.toggler}>{toggler}</div>

        <div className={css(styles.items, { [styles.visible]: dropdown.isOn })}>
          {children}
        </div>
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Item = Item;

export default Dropdown;
