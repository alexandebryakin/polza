import { WarningOutlined } from '@ant-design/icons';
import { AlertProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip, Alert } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';
import FormCard from '../../lib/FormCard';
import PassportForm from '../../components/PassportForm';
import { Link, LinkProps } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { VerificationStatusEnum } from '../../api/graphql.types';
import Page from '../../components/Page';

const VerificationAlert = () => {
  const [t] = useTranslation('common');
  const { passport } = useUserInfoContext();

  const messages: Record<VerificationStatusEnum, string> = {
    [VerificationStatusEnum.Failed]: t('profile.passport.verification.failed'),
    [VerificationStatusEnum.InProgress]: t('profile.passport.verification.inProgress'),
    [VerificationStatusEnum.Succeeded]: t('profile.passport.verification.succeeded'),
  };

  const types: Record<VerificationStatusEnum, AlertProps['type']> = {
    [VerificationStatusEnum.Failed]: 'error',
    [VerificationStatusEnum.InProgress]: 'info',
    [VerificationStatusEnum.Succeeded]: 'success',
  };

  return (
    <Alert
      message={passport ? messages[passport.verificationStatus] : t('profile.passport.verification.notVerified')}
      type={passport ? types[passport.verificationStatus] : 'warning'}
      showIcon
      closable
      className={css(styles.maxWidth624, styles.alert)}
    />
  );
};

function PassportTab() {
  return (
    <div>
      <VerificationAlert />

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

const WarningVerificationIcon = () => {
  const [t] = useTranslation('common');

  const { passport } = useUserInfoContext();

  if (passport?.verificationStatus === VerificationStatusEnum.Succeeded) return null;

  const colors: Record<VerificationStatusEnum, string> = {
    [VerificationStatusEnum.InProgress]: styles.info,
    [VerificationStatusEnum.Failed]: styles.error,
    [VerificationStatusEnum.Succeeded]: '',
  };

  return (
    <Tooltip title={t('profile.passport.verification.notVerified')}>
      <WarningOutlined
        className={css(styles.tabIcon, passport ? colors[passport.verificationStatus] : styles.warning)}
      />
    </Tooltip>
  );
};

function Profile() {
  const [t] = useTranslation('common');

  return (
    <Page>
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

                  <WarningVerificationIcon />
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
    </Page>
  );
}

export default Profile;
