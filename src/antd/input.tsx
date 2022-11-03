import React from 'react';
import { Input as AntInput, InputProps } from 'antd';
import { PasswordProps, TextAreaProps } from 'antd/lib/input';
import css from 'classnames';

import styles from './antd.module.scss';
import MaskedInput, { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';

export function Input(props: InputProps) {
  return <AntInput {...props} className={css(props.className, styles.input)} />;
}

function Password(props: PasswordProps) {
  return <AntInput.Password {...props} className={css(props.className, styles.input)} />;
}

function TextArea(props: TextAreaProps) {
  return <AntInput.TextArea {...props} className={css(props.className, styles.bordered)} />;
}

function Masked(props: MaskedInputProps) {
  return <MaskedInput {...props} className={css(props.className, styles.input)} />;
}

Input.Password = Password;
Input.TextArea = TextArea;
Input.Masked = Masked;
Input.Group = AntInput.Group;
