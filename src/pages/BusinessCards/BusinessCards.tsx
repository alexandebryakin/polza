import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import css from 'classnames';
import styles from './BusinessCards.module.scss';
import Flex from '../../components/Flex';
import BusinessCard, { BusinessCardWrapper, TBusinessCard } from '../../components/BusinessCard';
import useToggler from '../../hooks/useToggler';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import Page from '../../components/Page';

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

function BusinessCards() {
  const [t] = useTranslation('common');

  const [size, setSize] = React.useState(5);

  const businessCard: TBusinessCard = {
    logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGq1BkRbLcvOb_pHTDvPAuvRbxey_6IV6UQ&usqp=CAU',
    title: 'Trofimova Elena Nikolaevna',
    subtitle: 'Designer',
    phones: ['79781234567', '79781234568'],
    emails: ['some-short@mail.com', 'some-extremaly-long-email@mail.com'],
    address: 'Moscow, Putanova Street, 29',
  };

  return (
    <Page>
      <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={24} lg={12} xxl={8}>
          <AddBusinessCard />
        </Col>

        {Array.from(Array(size).keys()).map((i) => {
          return (
            <Col key={i} xs={24} md={24} lg={12} xxl={8}>
              <BusinessCard businessCard={businessCard} />
            </Col>
          );
        })}
      </Row>
    </Page>
  );
}

export default BusinessCards;
