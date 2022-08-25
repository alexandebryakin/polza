import { Link, LinkProps } from 'react-router-dom';
import css from 'classnames';

import styles from './SiderDesktopItem.module.scss';
import { useLayout } from '../../LayoutProvider';

interface SiderDesktopItemProps extends LinkProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active: boolean;
}
function SiderDesktopItem({
  icon = '',
  label,
  active,
  ...rest
}: SiderDesktopItemProps) {
  const { collapse } = useLayout();

  return (
    <Link {...rest} className={styles.item}>
      <span
        className={css(styles.pointer, { [styles.pointerActive]: active })}
      />

      <span className={css(styles.icon, { [styles.iconActive]: active })}>
        {icon}
      </span>

      {collapse.isOff && (
        <span className={css(styles.label, { [styles.labelActive]: active })}>
          {label}
        </span>
      )}
    </Link>
  );
}

export default SiderDesktopItem;
