import React from 'react';
import { useLayout } from '../Layout/LayoutProvider';

import styles from './Logo.module.scss';

function Logo() {
  const { collapse } = useLayout();

  if (collapse.isOn) return <b>LG</b>;

  return <b>TODO: Polza logo</b>;
}

export default Logo;
