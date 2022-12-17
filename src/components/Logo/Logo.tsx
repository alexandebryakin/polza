import { DingdingOutlined } from '@ant-design/icons';
import React from 'react';
import Flex from '../Flex';
import { FlexProps } from '../Flex/Flex';
import { useLayout } from '../Layout/LayoutProvider';

import css from 'classnames';
import styles from './Logo.module.scss';

interface LogoIconProps extends FlexProps {
  size?: number;
}
const LogoIcon = ({ size = 14, ...props }: LogoIconProps) => {
  return (
    <Flex {...props} style={{ fontSize: size, ...props.style }} className={css(props.className)}>
      <DingdingOutlined />

      <DingdingOutlined className={styles.rotateY180} />
    </Flex>
  );
};

function Logo() {
  const { collapse } = useLayout();

  if (collapse.isOn) return <LogoIcon className={styles.cursorPointer} />;

  return (
    <div className={css(styles.logoUncollapsed, styles.cursorPointer, styles.logo)}>
      <LogoIcon />

      <span>Connection</span>
    </div>
  );
}

export default Logo;
