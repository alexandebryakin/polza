import { Col, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import BusinessCardForm from '../../components/BusinessCardForm';
import Page from '../../components/Page';
import FormCard from '../../lib/FormCard';
import { routes } from '../../navigation/routes';

import styles from './ModifyBusinessCard.module.scss';
import BusinessCard, { BusinessCardAttrs } from '../../components/BusinessCard';
import React from 'react';

import { MutationUpsertBusinessCardArgs, PublicationStatusEnum } from '../../api/graphql.types';
import { useBusinessCard } from '../../api/businessCards';
import Typography from '../../lib/Typography';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import AccessDenied from '../../components/AccessDenied';

export const NEW_BUSINESS_CARD = 'new';

interface BusinessCardPreviewProps {
  businessCard: BusinessCardAttrs;
}
const BusinessCardPreview = ({ businessCard }: BusinessCardPreviewProps) => {
  const [t] = useTranslation('common');

  return (
    <div className={styles.businessCardPreview}>
      <Typography.Title level={3} className={styles.previewTitle}>
        {t('businessCards.preview')}
      </Typography.Title>

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

  const [values, setValues] = React.useState<Partial<MutationUpsertBusinessCardArgs>>({});

  const { businessCard, loading } = useBusinessCard({ id: data?.params.id || '' });

  const { user } = useUserInfoContext();

  const canEdit = !!businessCard?.userId && businessCard?.userId === user?.id;

  if (!loading && !canEdit && !isNew) return <AccessDenied />;

  return (
    <Page withBackButton>
      <Typography.Title marginedBottom>
        {t(isNew ? 'businessCards.createBusinessCard' : 'businessCards.editBusinessCard')}
      </Typography.Title>

      {!loading && (
        <BusinessCardPreview
          businessCard={{
            title: values.title || t('businessCards.form.placeholders.title'),
            subtitle: values.subtitle || t('businessCards.form.placeholders.subtitle'),
            id: businessCard?.id,
            userId: businessCard?.id,
            description: values.description || '',
            status: values.status || PublicationStatusEnum.Draft,
            phones: (values.phones || []).map((number) => ({ number })),
            emails: (values.emails || []).map((email) => ({ email })),
            address: values.address || t('businessCards.form.placeholders.address'),
          }}
        />
      )}

      <Col xs={24} lg={18} xl={12}>
        <Spin spinning={loading}>
          <BusinessCardForm
            businessCard={businessCard}
            onChange={setValues}
            components={{
              Wrapper: FormCard,
            }}
          />
        </Spin>
      </Col>
    </Page>
  );
}
