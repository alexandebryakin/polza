import React from 'react';
import { Alert as AntAlert, AlertProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';

export function Alert(props: AlertProps) {
  return <AntAlert {...props} className={css(props.className, styles.alert)} />;
}
