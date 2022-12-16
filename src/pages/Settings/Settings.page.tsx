import { WarningOutlined } from '@ant-design/icons';
import { AlertProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip, Alert } from '../../antd';
import css from 'classnames';
import styles from './Settings.module.scss';
import FormCard from '../../lib/FormCard';
import PassportForm from '../../components/PassportForm';
import { Link, LinkProps } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { VerificationStatusEnum } from '../../api/graphql.types';
import Page from '../../components/Page';
import ChangePassordForm from '../../components/ChangePassordForm';

interface VerificationAlertProps {
  className?: string;
  action?: AlertProps['action'];
}

export const VerificationAlert = ({ className, action }: VerificationAlertProps) => {
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
      // message={passport ? messages[VerificationStatusEnum.Failed] : t('profile.passport.verification.notVerified')}
      // type={passport ? types[VerificationStatusEnum.Failed] : 'warning'}
      showIcon
      closable
      action={action}
      className={css(className, styles.alert)}
    />
  );
};

function PassportTab() {
  return (
    <div>
      <VerificationAlert className={styles.maxWidth624} />

      <FormCard className={styles.maxWidth624}>
        <PassportForm />
      </FormCard>
    </div>
  );
}

interface TabLabelProps extends LinkProps {}
export const TabLabel = ({ className, ...rest }: TabLabelProps) => {
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

const SecurityTab = () => {
  const [t] = useTranslation('common');

  return (
    <div>
      <Typography.Title level={4}>{t('profile.security.changePassword')}</Typography.Title>

      <FormCard className={styles.maxWidth624}>
        <ChangePassordForm />
      </FormCard>
    </div>
  );
};

function Settings() {
  const [t] = useTranslation('common');

  return (
    <Page>
      <Typography.Title level={2}>{t('settings.settings')}</Typography.Title>

      <Tabs
        defaultActiveKey={window.location.pathname}
        items={[
          {
            label: (
              <TabLabel to={routes.settings().passport()._}>
                <span>
                  {t('profile.tabs.passport')}

                  <WarningVerificationIcon />
                </span>
              </TabLabel>
            ),
            key: routes.settings().passport()._,
            children: <PassportTab />,
          },

          {
            label: <TabLabel to={routes.settings().security()._}>{t('profile.tabs.security')}</TabLabel>,
            key: routes.settings().security()._,
            children: <SecurityTab />,
          },
        ]}
      />
    </Page>
  );
}

export default Settings;
