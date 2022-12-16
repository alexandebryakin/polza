import { InboxOutlined } from '@ant-design/icons';
import css from 'classnames';
import { DivProps } from '../BusinessCard';

import styles from './NoData.module.scss';

interface WrapperProps extends DivProps {}
const Wrapper = (props: DivProps) => {
  return <div {...props} className={css(styles.wrapper, props.className)} />;
};

interface NoDataProps extends DivProps {
  text: React.ReactNode;
  // content?: React.ReactNode;
}

const NoData = ({ text, ...rest }: NoDataProps) => {
  return (
    <div {...rest} className={css(styles.noData, rest.className)}>
      <InboxOutlined />

      <span>{text}</span>
    </div>
  );
};

NoData.Wrapper = Wrapper;

export default NoData;
