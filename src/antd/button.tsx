import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';

export function Button(props: ButtonProps) {
  return (
    <AntButton {...props} className={css(props.className, styles.button)} />
  );
}
