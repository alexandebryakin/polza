import { useTranslation } from 'react-i18next';
import { routesHelpers, routes } from '../../../navigation/routes';
import Flex from '../../Flex';
import Logo from '../../Logo';

import styles from './SiderDesktop.module.scss';

import css from 'classnames';

import { CreditCardOutlined, PoweroffOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
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
            to={routes.profile()._}
            active={routesHelpers.isProfile()}
            icon={<UserOutlined />}
            label={t('nav.profile')}
          />
          <SiderDesktopItem
            to={routes.businessCards()._}
            active={routesHelpers.isBusinessCards()}
            icon={<CreditCardOutlined />}
            label={t('nav.businessCards')}
          />
        </Flex>
      </Flex>

      <Flex direction="column">
        <SiderDesktopItem
          to={routes.settings()._}
          active={routesHelpers.isSettings()}
          icon={<SettingOutlined />}
          label={t('nav.settings')}
        />

        <SiderDesktopItem
          to={routes.signin()._}
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
