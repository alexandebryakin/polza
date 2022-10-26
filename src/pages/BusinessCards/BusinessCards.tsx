import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './BusinessCards.module.scss';
import BusinessCard, { BusinessCardWrapper } from '../../components/BusinessCard';
import useToggler from '../../hooks/useToggler';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import Page from '../../components/Page';

import { useGetBusinessCardsLazyQuery } from '../../api/graphql.types';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';

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

const BusinessCardSkeleton = () => {
  return (
    <BusinessCardWrapper className={styles.businessCardSkeleton}>
      <Space direction="vertical" align="center">
        <Skeleton.Avatar active />
        <Skeleton.Button active size="small" style={{ width: 250 }} />
        <Skeleton.Button active size="small" style={{ width: 150 }} />
      </Space>
    </BusinessCardWrapper>
  );
};

function BusinessCards() {
  const [t] = useTranslation('common');

  const { user } = useUserInfoContext();

  const [getBusinessCards, { data, loading }] = useGetBusinessCardsLazyQuery();

  React.useEffect(() => {
    if (!user?.id) return;

    getBusinessCards({ variables: { userId: user.id } });
  }, [getBusinessCards, user?.id]);

  return (
    <Page>
      <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={24} lg={12} xxl={8}>
          <AddBusinessCard />
        </Col>

        {loading && (
          <Col xs={24} md={24} lg={12} xxl={8}>
            <BusinessCardSkeleton />
          </Col>
        )}

        {(data?.businessCards || []).map((businessCard) => {
          return (
            <Col key={businessCard.id} xs={24} md={24} lg={12} xxl={8}>
              <BusinessCard businessCard={businessCard} />
            </Col>
          );
        })}
      </Row>
    </Page>
  );
}

export default BusinessCards;
