import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, ColProps, Row, Skeleton, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './BusinessCards.module.scss';
import BusinessCard, { BusinessCardWrapper } from '../../components/BusinessCard';
import useToggler from '../../hooks/useToggler';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import Page from '../../components/Page';

import { CollectionKindEnum, useGetBusinessCardsLazyQuery, useGetBusinessCardsQuery } from '../../api/graphql.types';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { Tabs } from '../../antd';
import { TabLabel } from '../Profile/Profile';
import NoData from '../../components/NoData';
import BusinessCardSkeleton from '../../components/BusinessCardSkeleton';

const AddBusinessCard = () => {
  const modal = useToggler();

  return (
    <Link to={routes.businessCards().edit('new')._}>
      <BusinessCardWrapper className={styles.addBusinessCard} onClick={modal.on}>
        <PlusOutlined className={styles.plusIconSize} />
      </BusinessCardWrapper>
    </Link>
  );
};

const COMMON_COL_PROPS: ColProps = {
  xs: 24,
  md: 24,
  lg: 12,
  xxl: 8,
};

const Connections = () => {
  const [t] = useTranslation('common');

  const { user } = useUserInfoContext();

  const personalCollection = user?.collections.find((c) => c.kind === CollectionKindEnum.Personal);

  const { data: personalBusinessCardsData, loading } = useGetBusinessCardsQuery({
    variables: {
      collectionIds: personalCollection && [personalCollection.id],
    },
  });

  if (!loading && !personalBusinessCardsData?.businessCards.length)
    return <NoData text={t('businessCards.noConnectionsYet')} className={styles.noConnectionsYet} />;
  return (
    <Row gutter={[20, 20]}>
      <BusinessCardSkeletons loading={loading} />

      {(personalBusinessCardsData?.businessCards || []).map((businessCard) => {
        return (
          <Col key={businessCard.id} {...COMMON_COL_PROPS}>
            <BusinessCard businessCard={businessCard} />
          </Col>
        );
      })}
    </Row>
  );
};

interface BusinessCardSkeletonsProps {
  amount?: number;
  loading: boolean;
}
const BusinessCardSkeletons = ({ amount = 4, loading }: BusinessCardSkeletonsProps) => {
  if (!loading) return null;

  return (
    <>
      {Array.from({ length: amount }).map((_elem, index) => {
        return (
          <Col key={index} {...COMMON_COL_PROPS}>
            <BusinessCardSkeleton />
          </Col>
        );
      })}
    </>
  );
};

const PersonalBusinessCards = () => {
  const { user } = useUserInfoContext();

  const [getBusinessCards, { data, loading }] = useGetBusinessCardsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    if (!user?.id) return;

    getBusinessCards({ variables: { userId: user.id } });
  }, [getBusinessCards, user?.id]);

  return (
    <Row gutter={[20, 20]}>
      <Col {...COMMON_COL_PROPS}>
        <AddBusinessCard />
      </Col>

      <BusinessCardSkeletons loading={loading} />

      {(data?.businessCards || []).map((businessCard) => {
        return (
          <Col key={businessCard.id} {...COMMON_COL_PROPS}>
            <BusinessCard businessCard={businessCard} />
          </Col>
        );
      })}
    </Row>
  );
};

function BusinessCards() {
  const [t] = useTranslation('common');

  return (
    <Page>
      <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

      <Tabs
        defaultActiveKey={window.location.pathname}
        items={[
          {
            label: <TabLabel to={routes.businessCards()._}>{t('businessCards.tabs.personal')}</TabLabel>,
            key: routes.businessCards()._,
            children: <PersonalBusinessCards />,
          },
          {
            label: (
              <TabLabel to={routes.businessCards('connections')._}>{t('businessCards.tabs.connections')}</TabLabel>
            ),
            key: routes.businessCards('connections')._,
            children: <Connections />,
          },
        ]}
      />
    </Page>
  );
}

export default BusinessCards;
