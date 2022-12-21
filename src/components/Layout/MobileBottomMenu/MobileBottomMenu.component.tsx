import Flex from '../../Flex';

import css from 'classnames';
import styles from './MobileBottomMenu.module.scss';
import AccountDropdown from '../../AccountDropdown';
import { jwt } from '../../../api/jwt';
import { Link, LinkProps } from 'react-router-dom';
import { routes, routesHelpers } from '../../../navigation/routes';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Space } from 'antd';
import Layout from '../../../pages/Auth/Layout/Layout.component';
import {
  CreditCardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import useToggler, { Toggler } from '../../../hooks/useToggler';
import React from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import MobileMenu from '../../../lib/MobileMenu';

function MobileBottomMenu() {
  const [t] = useTranslation('common');

  const moreMenu = useToggler();

  return (
    <Flex direction="row" justify="space-between" align="center" className={styles.mobileBottomMenu}>
      {jwt.isExpired() && (
        <Layout.Header>
          <Space>
            <Link to={routes.signin()._}>
              <Button type="primary">{t('auth.login')}</Button>
            </Link>

            <Link to={routes.signup()._}>
              <Button type="primary">{t('auth.signup')}</Button>
            </Link>
          </Space>
        </Layout.Header>
      )}

      {!jwt.isExpired() && (
        <div className={styles.menuItems}>
          <MobileBottomMenuItem to={routes.profile()._} active={routesHelpers.isProfile()} icon={<UserOutlined />} />
          <MobileBottomMenuItem
            to={routes.businessCards()._}
            active={routesHelpers.isBusinessCards()}
            icon={<CreditCardOutlined />}
          />
          <MobileBottomMenuItem
            to={routes.settings()._}
            active={routesHelpers.isSettings()}
            icon={<SettingOutlined />}
          />

          <MenuOutlined className={styles.icon} onClick={moreMenu.on} />
        </div>
      )}

      <MobileMenu toggler={moreMenu}>
        <Link to={routes.settings()._}>
          <MobileMenu.Item icon={<SettingOutlined />} label={t('nav.settings')} />
        </Link>

        <Link to={routes.signin()._}>
          <MobileMenu.Item icon={<LogoutOutlined />} label={t('nav.logout')} onClick={jwt.forget} />
        </Link>
      </MobileMenu>
    </Flex>
  );
}

export default MobileBottomMenu;

interface MobileBottomMenuItemProps extends LinkProps {
  icon?: React.ReactNode;
  active: boolean;
}
const MobileBottomMenuItem = ({ icon, active, ...props }: MobileBottomMenuItemProps) => {
  return (
    <Link {...props} className={css(styles.icon, active && styles.iconActive, props.className)}>
      {icon}
    </Link>
  );
};
