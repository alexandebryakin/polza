import React from 'react';
import { Input as AntInput, InputProps } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import css from 'classnames';

import styles from './antd.module.scss';

export function Input(props: InputProps) {
  return <AntInput {...props} className={css(props.className, styles.input)} />;
}

function Password(props: PasswordProps) {
  return <AntInput.Password {...props} className={css(props.className, styles.input)} />;
}

Input.Password = Password;
Input.Group = AntInput.Group;
