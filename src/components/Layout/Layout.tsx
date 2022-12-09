import LayoutDesktop from './LayoutDesktop';
import LayoutProvider from './LayoutProvider';
import PublicLayoutDesktop from './PublicLayoutDesktop';

export interface LayoutProps {
  isPublic?: boolean;
  children: React.ReactNode;
}

function Layout({ isPublic = false, children }: LayoutProps) {
  // return screen.mobile() ? <LayoutMobile/> : <LayoutDesktop/>
  const Component = isPublic ? PublicLayoutDesktop : LayoutDesktop;

  return <Component>{children}</Component>;
}

export default Layout;
