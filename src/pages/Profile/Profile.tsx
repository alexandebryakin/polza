import { WarningOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';

function PassportForm() {
  return <div>Passport Form</div>;
}

const TABS = {
  main: 'main',
  passport: 'passport',
  password: 'password',
};

function Profile() {
  const [t] = useTranslation('common');

  const verified = false;

  return (
    <div className={styles.page}>
      <Typography.Title level={2}>{t('profile.profile')}</Typography.Title>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('profile.tabs.generalInfo')} key={TABS.main}>
          <ul>
            <li>email</li>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Profile Image</li>
          </ul>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              {t('profile.tabs.passport')}

              {!verified && (
                <Tooltip title={t('profile.passportNotVerified')}>
                  <WarningOutlined className={css(styles.tabIcon, styles.warning)} />
                </Tooltip>
              )}
            </span>
          }
          // tab={t('profile.tabs.passport')}
          key={TABS.passport}
        >
          <PassportForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('profile.tabs.password')} key={TABS.password}>
          TODO: Password
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
