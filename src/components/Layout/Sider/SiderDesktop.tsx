import { useTranslation } from 'react-i18next';
import { routes, ROUTES } from '../../../navigation/routes';
import Flex from '../../Flex';
import Logo from '../../Logo';

import styles from './SiderDesktop.module.scss';

import css from 'classnames';

import {
  CreditCardOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SiderDesktopItem from './SiderDesktopItem';
import { useLayout } from '../LayoutProvider';
import Collapser from './Collapser';
import { jwt } from '../../../core/jwt';

function SiderDesktop() {
  const [t] = useTranslation('common');

  const { collapse } = useLayout();

  return (
    <Flex
      r-elem="SiderDesktop"
      direction="column"
      justify="space-between"
      className={css(styles.container, { [styles.collapsed]: collapse.isOn })}
    >
      <Flex direction="column">
        <div className={styles.logo} onClick={collapse.toggle}>
          <Logo />
        </div>
        <Collapser />

        <Flex direction="column">
          <SiderDesktopItem
            to={ROUTES.PROFILE}
            active={routes.isProfile()}
            icon={<UserOutlined />}
            label={t('nav.profile')}
          />
          <SiderDesktopItem
            to={ROUTES.BUSINESS_CARDS}
            active={routes.isBusinessCards()}
            icon={<CreditCardOutlined />}
            label={t('nav.businessCards')}
          />
        </Flex>
      </Flex>

      <Flex direction="column">
        <SiderDesktopItem
          to={ROUTES.SETTINGS}
          active={routes.isSettings()}
          icon={<SettingOutlined />}
          label={t('nav.settings')}
        />

        <SiderDesktopItem
          to={ROUTES.AUTH.SIGNIN}
          active={false}
          icon={<PoweroffOutlined />}
          label={t('nav.logout')}
          onClick={jwt.forget}
        />
      </Flex>
    </Flex>
  );
}

export default SiderDesktop;
