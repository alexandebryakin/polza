import { WarningOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip, Alert } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';
import FormCard from '../../lib/FormCard';
import PassportForm from '../../components/PassportForm';
import { Link, LinkProps } from 'react-router-dom';
import { routes } from '../../navigation/routes';

function PassportTab() {
  const [t] = useTranslation('common');

  const verified = false;

  return (
    <div>
      {!verified && (
        <Alert
          message={t('profile.passportNotVerified')}
          type="warning"
          showIcon
          closable
          className={css(styles.maxWidth624, styles.alert)}
        />
      )}

      <FormCard className={styles.maxWidth624}>
        <PassportForm />
      </FormCard>
    </div>
  );
}

interface TabLabelProps extends LinkProps {}
const TabLabel = ({ className, ...rest }: TabLabelProps) => {
  return <Link {...rest} className={css(styles.tabLabel, className)} />;
};

function Profile() {
  const [t] = useTranslation('common');

  const verified = false; // TODO:

  return (
    <div className={styles.page}>
      <Typography.Title level={2}>{t('profile.profile')}</Typography.Title>

      <Tabs
        defaultActiveKey={window.location.pathname}
        items={[
          {
            label: <TabLabel to={routes.profile().general()._}>{t('profile.tabs.generalInfo')}</TabLabel>,
            key: routes.profile().general()._,
            children: (
              <ul>
                <li>email</li>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Profile Image</li>
              </ul>
            ),
          },

          {
            label: (
              <TabLabel to={routes.profile().passport()._}>
                <span>
                  {t('profile.tabs.passport')}

                  {!verified && (
                    <Tooltip title={t('profile.passportNotVerified')}>
                      <WarningOutlined className={css(styles.tabIcon, styles.warning)} />
                    </Tooltip>
                  )}
                </span>
              </TabLabel>
            ),
            key: routes.profile().passport()._,
            children: <PassportTab />,
          },

          {
            label: <TabLabel to={routes.profile().security()._}>{t('profile.tabs.security')}</TabLabel>,
            key: routes.profile().security()._,
            children: 'TODO: Password',
          },
        ]}
      />
    </div>
  );
}

export default Profile;
