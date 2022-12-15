import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from '../../antd';
import CopyToClipboard from '../CopyToClipboard';
import FlipCard from '../FlipCard';

import css from 'classnames';
import styles from './BusinessCard.module.scss';
import Flex from '../Flex';
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

import { BusinessCard as TBusinessCard, PublicationStatusEnum } from '../../api/graphql.types';
import { MASKS } from '../modals/AddPhoneModal/AddPhoneModal.component';
import IMask from 'imask';
import { Link } from 'react-router-dom';
import { routes } from '../../navigation/routes';
import CopyableContactList from '../CopyableContactList';
import { buildBusinessCardPublicLink } from '../../utils/buildBusinessCardPublicLink';
import { buildBusinessCardPermissions } from '../../pages/BusinessCardPublicPage/BusinessCardPublicPage.component';
import { useRemoveBusinessCardConfirmationModal } from '../BusinessCardForm/BusinessCardForm.component';
import { useMutationError } from '../../hooks/useMutationError';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import {
  CollectionModificationEvents,
  useBusinessCardDropdownOptions,
} from '../../hooks/useBusinessCardDropdownOptions';

export const mask = IMask.createMask({
  mask: MASKS.PHONE,
});

export const BusinessCardWrapper = ({
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return <div {...rest} className={css(styles.businessCardWrapper, className)} />;
};

export type BusinessCardAttrs = Partial<Omit<TBusinessCard, 'phones' | 'emails'>> & {
  emails: Pick<TBusinessCard['emails'][0], 'email'>[];
  phones: Pick<TBusinessCard['phones'][0], 'number'>[];
};

export interface DivProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Divider = () => <div className={styles.divider} />;

const Section = (props: DivProps) => <div {...props} className={css(styles.businessCardSection, props.className)} />;

interface StatusLabelProps extends DivProps {
  status: PublicationStatusEnum;
}
const StatusLabel = ({ status, ...props }: StatusLabelProps) => {
  const [t] = useTranslation('common');

  return (
    <div
      className={css(
        styles.status,
        status === PublicationStatusEnum.Draft && styles.statusDraft,
        status === PublicationStatusEnum.Published && styles.statusPublished,
        props.className
      )}
    >
      {
        {
          [PublicationStatusEnum.Draft]: t('businessCards.form.statuses.draft'),
          [PublicationStatusEnum.Published]: t('businessCards.form.statuses.published'),
        }[status]
      }
    </div>
  );
};

interface BusinessCardProps extends CollectionModificationEvents {
  businessCard: BusinessCardAttrs;
}
export default function BusinessCard({ businessCard, onBusinessCardRemovedFromCollection }: BusinessCardProps) {
  const [t] = useTranslation('common');

  const businessCardPublicLink = buildBusinessCardPublicLink(businessCard.id);

  const hasAnyContactInfo = businessCard.phones.length > 0 || businessCard.emails.length > 0 || !!businessCard.address;

  const { user } = useUserInfoContext();

  const permissions = buildBusinessCardPermissions(businessCard, user?.id);

  const dropdownOptions = useBusinessCardDropdownOptions({
    businessCardId: businessCard.id,
    canModifyConnections: permissions.canModifyConnections,
    canRemove: permissions.canRemove,
    onBusinessCardRemovedFromCollection,
  });

  const removeBusinessCardConfirmationModal = useRemoveBusinessCardConfirmationModal();
  useMutationError(removeBusinessCardConfirmationModal.error);

  return (
    <div className={styles.businessCard}>
      <div className={styles.businessCardHeader}>
        <div className={styles.actionsContainer}>
          <div className={styles.actions}>
            {permissions.canRemove && (
              <DeleteOutlined
                className={css(styles.actionIcon, styles.iconDelete)}
                onClick={() => removeBusinessCardConfirmationModal.remove(businessCard.id)}
              />
            )}

            {permissions.canEdit && (
              <Link to={routes.businessCards().edit(businessCard.id)._}>
                <EditOutlined className={css(styles.actionIcon)} />
              </Link>
            )}

            <CopyToClipboard
              text={businessCardPublicLink}
              CopiedComponent={<CheckOutlined className={css(styles.actionIcon)} />}
            >
              <CopyOutlined className={css(styles.actionIcon)} />
            </CopyToClipboard>

            {!!dropdownOptions?.length && (
              <Dropdown
                menu={{
                  items: dropdownOptions,
                }}
                placement="bottomRight"
              >
                <MoreOutlined className={styles.actionIcon} />
              </Dropdown>
            )}
          </div>
        </div>

        <StatusLabel status={businessCard.status || PublicationStatusEnum.Draft} className={styles.statusLabel} />

        <div
          className={css(
            styles.cover,
            businessCard.status === PublicationStatusEnum.Draft && styles.coverDraft,
            businessCard.status === PublicationStatusEnum.Published && styles.coverPublished
          )}
        />

        <div className={styles.qrCode}>
          <div className={styles.qrCodePanel}>
            <QRCodeSVG
              value={businessCardPublicLink}
              size={92}
              imageSettings={{
                src: 'https://cdn-icons-png.flaticon.com/24/717/717392.png',
                height: 18,
                width: 18,
                excavate: true,
              }}
            />
          </div>
        </div>
      </div>

      <Section>
        <Typography.Title level={3}>{businessCard.title}</Typography.Title>

        <div className={styles.businessCardSubtitle}>{businessCard.subtitle}</div>
      </Section>

      {hasAnyContactInfo && (
        <>
          <Divider />

          <Section>
            <CopyableContactList
              items={businessCard.phones.map((p) => mask.resolve(p.number.toString()))}
              icon={
                // <MobileOutlined />
                <PhoneOutlined />
              }
            />

            <CopyableContactList items={businessCard.emails.map((e) => e.email)} icon={<MailOutlined />} />

            <CopyableContactList
              items={businessCard.address ? [businessCard.address] : []}
              icon={<EnvironmentOutlined />}
            />
          </Section>
        </>
      )}

      <div className={styles.remainingSpaceFiller} />

      <Divider />

      <Section className={styles.actionButtonsSection}>
        <Link to={routes.businessCards(businessCard.id)._}>
          <Button block type="primary">
            {t('businessCards.openProfile')}
          </Button>
        </Link>
      </Section>
    </div>
  );
}
