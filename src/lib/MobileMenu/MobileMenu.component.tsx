import React from 'react';
import { Toggler } from '../../hooks/useToggler';

import styles from './MobileMenu.module.scss';
import { MobileMenuContext, useMobileMenuContext } from './MobileMenuContext.context';
import { Drawer } from 'antd';

interface MobileMenuItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  onClick?: DivProps['onClick'];
}
const MobileMenuItem = ({ icon, label, onClick }: MobileMenuItemProps) => {
  const { toggler } = useMobileMenuContext();

  const handleClick: DivProps['onClick'] = (e) => {
    toggler.off();
    onClick?.(e);
  };

  return (
    <div className={styles.mobileMenuItem} onClick={handleClick}>
      <div>{icon}</div>

      <div className={styles.mobileMenuLabel}>{label}</div>
    </div>
  );
};

interface MobileMenuProps {
  toggler: Toggler;
  children: React.ReactNode;
}
const MobileMenu = ({ toggler, children }: MobileMenuProps) => {
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checker = ref.current;
    if (!checker) return;

    const height = checker.getBoundingClientRect().height + 100;
    const maxHeight = window.innerHeight - 100;

    setHeight(height < maxHeight ? height : maxHeight);
  }, [children]);

  return (
    <MobileMenuContext.Provider value={{ toggler }}>
      <div ref={ref} className={styles.checker}>
        {children}
      </div>

      <Drawer
        className={styles.drawer}
        height={height || undefined}
        closable={false}
        placement="bottom"
        onClose={toggler.off}
        open={toggler.isOn}
      >
        <div className={styles.sliderContainer} onClick={toggler.off}>
          <div className={styles.slider} />
        </div>

        {children}
      </Drawer>
    </MobileMenuContext.Provider>
  );
};

MobileMenu.Item = MobileMenuItem;

export default MobileMenu;
