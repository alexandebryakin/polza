import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, ColProps, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './BusinessCards.module.scss';
import BusinessCard, { BusinessCardWrapper } from '../../components/BusinessCard';
import useToggler from '../../hooks/useToggler';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import Page from '../../components/Page';

import { Tabs } from '../../antd';
import NoData from '../../components/NoData';
import BusinessCardSkeleton from '../../components/BusinessCardSkeleton';
import { BusinessCardsContextProvider, useBusinessCards } from '../../contexts/businessCards/businessCardsContext';
import { TabLabel } from '../Settings/Settings.page';

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

const Connections = () => {
  const [t] = useTranslation('common');

  const { personalCollectionBusinessCards } = useBusinessCards();

  if (!personalCollectionBusinessCards.loading && !personalCollectionBusinessCards.businessCards.length)
    return <NoData text={t('businessCards.noConnectionsYet')} className={styles.noConnectionsYet} />;
  return (
    <Row gutter={[20, 20]}>
      <BusinessCardSkeletons loading={personalCollectionBusinessCards.loading} />

      {personalCollectionBusinessCards.businessCards.map((businessCard) => {
        return (
          <Col key={businessCard.id} {...COMMON_COL_PROPS}>
            <BusinessCard
              businessCard={businessCard}
              onBusinessCardRemovedFromCollection={personalCollectionBusinessCards.refetch}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const OwnBusinessCards = () => {
  const { ownBusinessCards } = useBusinessCards();

  return (
    <Row gutter={[20, 20]}>
      <Col {...COMMON_COL_PROPS}>
        <AddBusinessCard />
      </Col>

      <BusinessCardSkeletons loading={ownBusinessCards.loading} />

      {ownBusinessCards.businessCards.map((businessCard) => {
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
    <BusinessCardsContextProvider>
      <Page>
        <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

        <Tabs
          defaultActiveKey={window.location.pathname}
          items={[
            {
              label: <TabLabel to={routes.businessCards()._}>{t('businessCards.tabs.personal')}</TabLabel>,
              key: routes.businessCards()._,
              children: <OwnBusinessCards />,
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
    </BusinessCardsContextProvider>
  );
}

export default BusinessCards;
