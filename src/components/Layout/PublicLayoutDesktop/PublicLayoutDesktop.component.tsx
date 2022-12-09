import { LayoutProps } from '..';
import Flex from '../../Flex';
import SiderDesktop from '../Sider/SiderDesktop';
import TopNav from '../TopNav';

interface LayoutDesktopProps extends LayoutProps {}

function PublicLayoutDesktop({ children }: LayoutDesktopProps) {
  return (
    <Flex r-elem="PublicLayoutDesktop" direction="row">
      <Flex direction="column" r-elem="PublicLayoutDesktop.Content" grow={1}>
        <TopNav />

        <Flex grow={1}>{children}</Flex>
      </Flex>
    </Flex>
  );
}

export default PublicLayoutDesktop;
