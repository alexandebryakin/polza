import { InboxOutlined } from '@ant-design/icons';
import css from 'classnames';
import { DivProps } from '../BusinessCard';

import styles from './NoData.module.scss';

interface NoDataProps extends DivProps {
  text: string;
}

const NoData = ({ text, ...rest }: NoDataProps) => {
  return (
    <div {...rest} className={css(styles.noData, rest.className)}>
      <InboxOutlined />

      <span>{text}</span>
    </div>
  );
};

export default NoData;
