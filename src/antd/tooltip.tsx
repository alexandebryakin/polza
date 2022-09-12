import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';

export function Tooltip(props: TooltipProps) {
  return (
    <AntTooltip
      {...props}
      overlayClassName={css(props.overlayClassName, styles.tooltipOverlay)}
      color={props.color || 'white'}
    />
  );
}
