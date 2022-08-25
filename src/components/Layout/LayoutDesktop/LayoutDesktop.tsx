import { LayoutProps } from '..';
import Flex from '../../Flex';
import SiderDesktop from '../Sider/SiderDesktop';
import TopNav from '../TopNav';

import styles from './LayoutDesktop.module.scss';

interface LayoutDesktopProps extends LayoutProps {}

function LayoutDesktop({ children }: LayoutDesktopProps) {
  return (
    <Flex r-elem="LayoutDesktop" direction="row" className={styles.container}>
      <SiderDesktop />

      <Flex direction="column" r-elem="LayoutDesktop.Content" grow={1}>
        <TopNav />

        <Flex grow={1}>{children}</Flex>
      </Flex>
    </Flex>
  );
}

export default LayoutDesktop;
