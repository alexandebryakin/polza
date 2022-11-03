import React from 'react';
import { Select as AntSelect, SelectProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';

export function Select<ValueType>(props: SelectProps) {
  return <AntSelect<ValueType> {...props} className={css(props.className, styles.select)} />;
}

Select.Option = AntSelect.Option;
