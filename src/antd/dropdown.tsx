import React from 'react';
import { Dropdown as AntDropdown, DropdownProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';
import { DropdownButtonProps } from 'antd/lib/dropdown';

export function Dropdown(props: DropdownProps) {
  return <AntDropdown {...props} overlayClassName={css(styles.dropdownOverlay, props.overlayClassName)} />;
}

const DropdownButton = (props: DropdownButtonProps) => {
  // Didn't check if that works
  return <AntDropdown.Button {...props} className={css(props.className, styles.dropdownButton)} />;
};

Dropdown.Button = DropdownButton;
