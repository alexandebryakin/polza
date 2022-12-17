import Flex from '../../Flex';

import styles from './TopNav.module.scss';
import AccountDropdown from '../../AccountDropdown';
import { jwt } from '../../../api/jwt';
import { Link } from 'react-router-dom';
import { routes } from '../../../navigation/routes';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Space } from 'antd';
import Layout from '../../../pages/Auth/Layout/Layout.component';

function TopNav() {
  const [t] = useTranslation('common');

  return (
    <Flex direction="row" justify="space-between" align="center" className={styles.topNav}>
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
        <>
          <div>{/* <Search /> */}</div>

          <Flex align="center">
            <AccountDropdown className={styles.accountDropdown} />
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default TopNav;
