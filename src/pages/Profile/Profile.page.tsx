import { MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button } from '../../antd';
import styles from './Profile.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import Container from '../../lib/Container';
import { Block, Spacing } from '../BusinessCardPublicPage/BusinessCardPublicPage.page';
import AddEmailModal from '../../components/modals/AddEmailModal';
import useToggler from '../../hooks/useToggler';
import AddPhoneModal from '../../components/modals/AddPhoneModal';
import { mask } from '../../components/BusinessCard';
import NoData from '../../components/NoData';
import React from 'react';
import { VerificationAlert } from '../Settings/Settings.page';
import { VerificationStatusEnum } from '../../api/graphql.types';
import Typography from '../../lib/Typography';
import UserAvatar from '../../components/UserAvatar';
import Page from '../../components/Page';

interface SectionTitleProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  postfix?: React.ReactNode;
}
const SectionTitle = ({ icon, text, postfix }: SectionTitleProps) => {
  return (
    <div className={styles.userProfileSectionTitle}>
      {icon}

      <span className={styles.userProfileSectionTitleText}>{text}</span>

      <span>{postfix}</span>
    </div>
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

const Profile = () => {
  const [t] = useTranslation('common');
  const { user, loading, passport } = useUserInfoContext();

  const hasFirstAndLastName = passport?.firstName && passport?.lastName;

  const phoneModal = useToggler();
  const emailModal = useToggler();

  const hasPhones = (user?.emails || []).length > 0;
  const hasEmails = (user?.emails || []).length > 0;
  const showPassportVerificationAlert = passport?.verificationStatus !== VerificationStatusEnum.Succeeded;

  if (loading) return null;
  return (
    <Page>
      <Container className={styles.container}>
        <Spacing />

        <div>
          <div className={styles.cover}></div>
          <div className={styles.userProfileHeaderPanel}>
            <UserAvatar size={120} className={styles.avatar} />

            <span>
              <Typography.Title level={4} className={styles.fio}>
                {hasFirstAndLastName ? (
                  `${passport?.lastName} ${passport?.firstName}`
                ) : (
                  <NoData.Wrapper className={styles.noDataWrapperForFIO}>
                    <NoData text={t('profile.general.noFirstOrLastNameDetails')} />

                    <Link to={routes.settings().passport()._}>
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

        {showPassportVerificationAlert && (
          <VerificationAlert
            action={
              <Link to={routes.settings().passport()._}>
                <Button
                  // icon={<PlusOutlined />}
                  type="link"
                  size="small"
                  className={styles.fontSize16}
                >
                  {t('generic.actions.verify')}
                </Button>
              </Link>
            }
          />
        )}

        <Row gutter={[16, 16]}>
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
    </Page>
  );
};

export default Profile;
