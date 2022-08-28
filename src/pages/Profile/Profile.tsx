import { WarningOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';

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
          Content of Tab Pane 1
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              {t('profile.tabs.passport')}

              <Tooltip title={t('profile.passportNotVerified')}>
                <WarningOutlined
                  className={css(styles.tabIcon, styles.warning)}
                />
              </Tooltip>
            </span>
          }
          // tab={t('profile.tabs.passport')}
          key={TABS.passport}
        >
          Content of Tab Pane 2
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('profile.tabs.password')} key={TABS.password}>
          TODO: Password
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
