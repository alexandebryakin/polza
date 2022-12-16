import { MailOutlined, PhoneOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { AlertProps, Avatar, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs, Tooltip, Alert, Button } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';
import FormCard from '../../lib/FormCard';
import PassportForm from '../../components/PassportForm';
import { Link, LinkProps } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { VerificationStatusEnum } from '../../api/graphql.types';
import Page from '../../components/Page';
import ChangePassordForm from '../../components/ChangePassordForm';
import { RANDOM_AVATAR_URL } from '../../components/AccountDropdown/AccountDropdown';
import Container from '../../lib/Container';
import { Block, Spacing } from '../BusinessCardPublicPage/BusinessCardPublicPage.component';
import AddEmailModal from '../../components/modals/AddEmailModal';
import useToggler from '../../hooks/useToggler';
import AddPhoneModal from '../../components/modals/AddPhoneModal';
import { mask } from '../../components/BusinessCard';
import NoData from '../../components/NoData';
import React from 'react';

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

const GeneralInfoTab = () => {
  const [t] = useTranslation('common');
  const { user, passport } = useUserInfoContext();

  const hasFirstAndLastName = passport?.firstName && passport?.lastName;

  interface SectionTitleProps {
    icon: React.ReactNode;
    text: React.ReactNode;
    postfix?: React.ReactNode;
  }
  const SectionTitle = ({ icon, text, postfix }: SectionTitleProps) => {
    return (
      <h5 className={styles.userProfileSectionTitle}>
        {icon}

        <span className={styles.userProfileSectionTitleText}>{text}</span>

        <span>{postfix}</span>
      </h5>
    );
  };

  interface ListProps {
    items: React.ReactNode[];
  }
  const List = ({ items }: ListProps) => {
    return (
      <div className={styles.userProfileList}>
        {items.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    );
  };

  const phoneModal = useToggler();
  const emailModal = useToggler();

  const hasPhones = (user?.emails || []).length > 0;
  const hasEmails = (user?.emails || []).length > 0;

  return (
    <Container className={styles.container}>
      <Spacing />

      <div>
        <div className={styles.cover}></div>
        <div className={styles.userProfileHeaderPanel}>
          <Avatar src={RANDOM_AVATAR_URL} size={120} className={styles.avatar} />
          <span>
            <Typography.Title level={4}>
              {hasFirstAndLastName ? (
                `${passport?.lastName} ${passport?.firstName}`
              ) : (
                <NoData.Wrapper className={styles.noDataWrapperForFIO}>
                  <NoData text={t('profile.general.noFirstOrLastNameDetails')} />

                  <Link to={routes.profile().passport()._}>
                    <Button icon={<PlusOutlined />} type="link" size="small" className={styles.fontSize16}>
                      {t('generic.actions.specify')}
                    </Button>
                  </Link>
                </NoData.Wrapper>
              )}
            </Typography.Title>
          </span>
        </div>
      </div>

      <Spacing />

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <AddEmailModal toggler={emailModal} />

          <Block className={styles.h100}>
            {hasEmails && (
              <>
                <Block.Section>
                  <SectionTitle
                    icon={<MailOutlined />}
                    text={t('profile.general.emails')}
                    postfix={
                      <Button icon={<PlusOutlined />} type="link" size="small" onClick={emailModal.on}>
                        {t('generic.actions.add')}
                      </Button>
                    }
                  />
                </Block.Section>

                <Block.Separator />

                <Block.Section>
                  <List items={(user?.emails || []).map((e) => e.email)} />
                </Block.Section>
              </>
            )}

            {!hasEmails && (
              <NoData.Wrapper className={styles.noDataWrapper}>
                <NoData text={t('profile.general.noEmailsYet')} />

                <Button
                  icon={<PlusOutlined />}
                  type="link"
                  size="small"
                  onClick={emailModal.on}
                  className={styles.fontSize16}
                >
                  {t('generic.actions.add')}
                </Button>
              </NoData.Wrapper>
            )}
          </Block>
        </Col>

        <Col xs={24} md={12}>
          <AddPhoneModal toggler={phoneModal} />

          <Block className={styles.h100}>
            {hasPhones && (
              <>
                <Block.Section>
                  <SectionTitle
                    icon={<PhoneOutlined />}
                    text={t('profile.general.phoneNumbers')}
                    postfix={
                      <Button icon={<PlusOutlined />} type="link" size="small" onClick={phoneModal.on}>
                        {t('generic.actions.add')}
                      </Button>
                    }
                  />
                </Block.Section>

                <Block.Separator />

                <Block.Section>
                  <List items={(user?.phones || []).map((p) => mask.resolve(p.number.toString()))} />
                </Block.Section>
              </>
            )}

            {!hasPhones && (
              <NoData.Wrapper className={styles.noDataWrapper}>
                <NoData text={t('profile.general.noPhoneNumbersYet')} />

                <Button
                  icon={<PlusOutlined />}
                  type="link"
                  size="small"
                  onClick={phoneModal.on}
                  className={styles.fontSize16}
                >
                  {t('generic.actions.add')}
                </Button>
              </NoData.Wrapper>
            )}
          </Block>
        </Col>
      </Row>
    </Container>
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
            children: <GeneralInfoTab />,
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
            children: <SecurityTab />,
          },
        ]}
      />
    </Page>
  );
}

export default Profile;
