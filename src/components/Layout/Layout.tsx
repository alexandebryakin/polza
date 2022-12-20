import { jwt } from '../../api/jwt';
import LayoutDesktop from './LayoutDesktop';
import LayoutProvider from './LayoutProvider';
import PublicLayoutDesktop from './PublicLayoutDesktop';
import { screen } from './../../utils/screen';
import LayoutMobile from './LayoutMobile';

export interface LayoutProps {
  children: React.ReactNode;
}

enum LayoutType {
  MOBILE_PUBLIC = 'MOBILE_PUBLIC',
  MOBILE_PRIVATE = 'MOBILE_PRIVATE',
  DESKTOP_PUBLIC = 'DESKTOP_PUBLIC',
  DESKTOP_PRIVATE = 'DESKTOP_PRIVATE',
}

const LAYOUT_MAP =
  // : Record<LayoutType, React.Component>
  {
    [LayoutType.MOBILE_PUBLIC]: PublicLayoutDesktop,
    [LayoutType.MOBILE_PRIVATE]: LayoutMobile,
    [LayoutType.DESKTOP_PUBLIC]: PublicLayoutDesktop,
    [LayoutType.DESKTOP_PRIVATE]: LayoutDesktop,
  };

const getLayoutType = (): LayoutType => {
  if (jwt.isExpired()) {
    return screen.mobile() ? LayoutType.MOBILE_PUBLIC : LayoutType.DESKTOP_PUBLIC;
  } else {
    return screen.mobile() ? LayoutType.MOBILE_PRIVATE : LayoutType.DESKTOP_PRIVATE;
  }
};

function Layout({ children }: LayoutProps) {
  // const Component = jwt.isExpired() ? PublicLayoutDesktop : LayoutDesktop;

  const Component = LAYOUT_MAP[getLayoutType()];

  return <Component>{children}</Component>;
}

export default Layout;
