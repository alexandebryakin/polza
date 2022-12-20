import { LayoutProps } from '..';
import Flex from '../../Flex';
import MobileBottomMenu from '../MobileBottomMenu';
import SiderDesktop from '../Sider/SiderDesktop';
import TopNav from '../TopNav';

import styles from './LayoutMobile.module.scss';

interface LayoutMobileProps extends LayoutProps {}

function LayoutMobile({ children }: LayoutMobileProps) {
  return (
    <Flex
      r-elem="LayoutMobile"
      direction="column"
      // className={styles.container}
    >
      <div className={styles.children}>
        {/*  */}
        {children}
      </div>

      <MobileBottomMenu />
    </Flex>
  );
}

export default LayoutMobile;
