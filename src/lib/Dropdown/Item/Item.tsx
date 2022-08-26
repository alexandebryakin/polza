import React from 'react';
import styles from './Item.module.scss';
import css from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import { useDropdown } from '../DropdownContext';

export interface ItemProps extends Omit<LinkProps, 'to'> {
  icon?: React.ReactNode;
  label: React.ReactNode;

  to?: LinkProps['to'];
}

function Item({
  icon = '',
  label,
  to = '#',
  className,
  onClick: onClickItem,
  ...rest
}: ItemProps) {
  const { dropdown } = useDropdown();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    dropdown.off();
    if (typeof onClickItem === 'function') onClickItem(e);
  };

  return (
    <Link
      {...rest}
      to={to}
      className={css(styles.item, className)}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>

      <span className={styles.label}>{label}</span>
    </Link>
  );
}

export default Item;
