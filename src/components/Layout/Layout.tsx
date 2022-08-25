import LayoutDesktop from './LayoutDesktop';
import LayoutProvider from './LayoutProvider';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  // return screen.mobile() ? <LayoutMobile/> : <LayoutDesktop/>
  const Component = LayoutDesktop;

  return <Component>{children}</Component>;
}

export default Layout;
