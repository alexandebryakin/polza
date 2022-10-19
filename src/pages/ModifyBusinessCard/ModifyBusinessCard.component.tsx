import { Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import BusinessCardForm from '../../components/BusinessCardForm';
import Page from '../../components/Page';
import FormCard from '../../lib/FormCard';
import { routes } from '../../navigation/routes';

import styles from './ModifyBusinessCard.module.scss';
import BusinessCard, { TBusinessCard } from '../../components/BusinessCard';
import React from 'react';

const NEW_BUSINESS_CARD = 'new';

interface BusinessCardPreviewProps {
  businessCard: TBusinessCard;
}
const BusinessCardPreview = ({ businessCard }: BusinessCardPreviewProps) => {
  const [t] = useTranslation('common');

  return (
    <div className={styles.businessCardPreview}>
      <Typography.Title level={3}>{t('businessCards.preview')}</Typography.Title>
      <Col xs={24} lg={18} xl={12}>
        <BusinessCard businessCard={businessCard} />
      </Col>
    </div>
  );
};

export default function ModifyBusinessCard() {
  const location = useLocation();
  const [t] = useTranslation('common');

  const data = matchPath(routes.businessCards().edit(':id')._, location.pathname);

  const isNew = data?.params.id === NEW_BUSINESS_CARD;

  const [values, setValues] = React.useState<Partial<TBusinessCard>>({});

  return (
    <Page>
      <Typography.Title>
        {t(isNew ? 'businessCards.createBusinessCard' : 'businessCards.editBusinessCard')}
      </Typography.Title>

      <BusinessCardPreview
        businessCard={{
          title: values.title || t('businessCards.form.placeholders.title'),
          subtitle: values.subtitle || t('businessCards.form.placeholders.subtitle'),
          phones: values.phones || [],
          emails: values.emails || [],
          address: values.address || t('businessCards.form.placeholders.address'),
        }}
      />

      <Col xs={24} lg={18} xl={12}>
        <BusinessCardForm
          onChange={setValues}
          components={{
            Wrapper: FormCard,
          }}
        />
      </Col>
    </Page>
  );
}
