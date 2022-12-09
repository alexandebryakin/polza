import { jwt } from '../../api/jwt';
import LayoutDesktop from './LayoutDesktop';
import LayoutProvider from './LayoutProvider';
import PublicLayoutDesktop from './PublicLayoutDesktop';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const Component = jwt.isExpired() ? PublicLayoutDesktop : LayoutDesktop;

  return <Component>{children}</Component>;
}

export default Layout;
