import { useLayout } from '../../LayoutProvider';

import styles from './Collapser.module.scss';
import css from 'classnames';

interface ArrowProps {
  direction: 'up' | 'down' | 'left' | 'right';
}

const Arrow = ({ direction }: ArrowProps) => {
  return (
    <span
      className={css(styles.arrow, {
        [styles.up]: direction === 'up',
        [styles.down]: direction === 'down',
        [styles.left]: direction === 'left',
        [styles.right]: direction === 'right',
      })}
    />
  );
};

function Collapser() {
  const { collapse } = useLayout();

  return (
    <div
      className={css(styles.collapser, {
        [styles.collapserCollapsed]: collapse.isOn,
      })}
      onClick={collapse.toggle}
    >
      <Arrow direction={collapse.isOn ? 'right' : 'left'} />
    </div>
  );

  // const Icon = collapse.isOn ? RightOutlined : LeftOutlined;

  // const Icon = collapse.isOn ? RightCircleOutlined : LeftCircleOutlined;

  // return (
  //   <Icon
  //     className={css(styles.collapser, {
  //       [styles.collapserCollapsed]: collapse.isOn,
  //     })}
  //     onClick={collapse.toggle}
  //     width={30}
  //     height={30}
  //   />
  // );
}
export default Collapser;
