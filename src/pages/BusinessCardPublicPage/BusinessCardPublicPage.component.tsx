import Container from '../../lib/Container';
import styles from './BusinessCardPublicPage.module.scss';
import css from 'classnames';
import { Avatar, Col, MenuProps, Row, Slider, Space, Typography } from 'antd';
import { routes } from '../../navigation/routes';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Button, Dropdown } from '../../antd';
import { useTranslation } from 'react-i18next';
import {
  DeleteOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  MinusOutlined,
  MoreOutlined,
  PhoneOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import Flex from '../../components/Flex';
import { FlexProps } from '../../components/Flex/Flex';
import React from 'react';
import { useRemoveBusinessCardConfirmationModal } from '../../components/BusinessCardForm/BusinessCardForm.component';
import { useMutationError } from '../../hooks/useMutationError';
import { IUseBusinessCard, useBusinessCard } from '../../api/businessCards';
import { QRCodeSVG } from 'qrcode.react';
import { BusinessCardAttrs, mask } from '../../components/BusinessCard';
import CopyableContactList from '../../components/CopyableContactList';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { buildBusinessCardPublicLink } from '../../utils/buildBusinessCardPublicLink';
import {
  BusinessCard,
  CollectionKindEnum,
  useAddToCollectionMutation,
  useGetBusinessCardsQuery,
  useGetCollectionsQuery,
  useRemoveFromCollectionMutation,
} from '../../api/graphql.types';
import NoData from '../../components/NoData';
import { usePersonalBusinessCardsController } from '../../hooks/usePersonalBusinessCardsController';
import { usePersonalCollection } from '../../hooks/usePersonalCollection';
import {
  CollectionModificationEvents,
  useBusinessCardDropdownOptions,
} from '../../hooks/useBusinessCardDropdownOptions';

export interface BlockProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Block = (props: BlockProps) => {
  return <div {...props} className={css(styles.block, props.className)} />;
};

const Spacing = (props: BlockProps & { size?: number }) => {
  return (
    <div
      {...props}
      style={{
        height: props.size,
        ...props.style,
      }}
      className={css(styles.spacing, props.className)}
    />
  );
};

const ImageGrid = () => {
  const imageLinks = [
    'https://cdn.lorem.space/images/drink/.cache/350x200/joseph-gonzalez-EOnHT42R1a8-unsplash.jpg',
    'https://cdn.lorem.space/images/fashion/.cache/350x200/roland-hechanova-1eedDSknxoY-unsplash.jpg',
    'https://cdn.lorem.space/images/face/.cache/350x200/austin-wade-X6Uj51n5CE8-unsplash.jpg',
    'https://cdn.lorem.space/images/book/.cache/350x200/no-place-like-here.jpeg',
    'https://cdn.lorem.space/images/watch/.cache/350x200/vlad-b-4e-RI494Jx0-unsplash.jpg',
    'https://cdn.lorem.space/images/shoes/.cache/350x200/alex-motoc-xyjB6_ZDaKw-unsplash.jpg',
    'https://cdn.lorem.space/images/shoes/.cache/350x200/daniel-storek-JM-qKEd1GMI-unsplash.jpg',
    'https://cdn.lorem.space/images/shoes/.cache/350x200/usama-akram-kP6knT7tjn4-unsplash.jpg',
    'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=400',
  ];

  const [rows, cols] = [2, 4];
  const maxImagesCount = rows * cols;
  const applicableImageLinks = imageLinks.slice(0, rows * cols);

  const defaultSize = 5;
  const [size, setSize] = React.useState(defaultSize);

  return (
    <>
      {/* <Slider defaultValue={defaultSize} max={imageLinks.length} onChange={setSize} /> */}

      <div className={styles.imageGrid}>
        {applicableImageLinks.slice(0, size).map((src, index, arr) => {
          const isFirstRow = index <= cols - 1;
          const isLastRow = index >= maxImagesCount - cols && index <= maxImagesCount;
          const isFirstImageInRow = index % cols === 0;
          const isLastImageInRow = index % cols === cols - 1;

          const isSingleRow = arr.length <= cols;
          const isLastItem = index === arr.length - 1;

          return (
            <img
              key={src}
              src={src}
              alt=""
              className={css(styles.image, {
                [styles.imageTopLeftBorderRadius]: isFirstRow && isFirstImageInRow,
                [styles.imageTopRightBorderRadius]: (isFirstRow && isLastImageInRow) || (isSingleRow && isLastItem),
                [styles.imageBottomLeftBorderRadius]:
                  (isLastRow && isFirstImageInRow) || (isSingleRow && isFirstImageInRow),
                [styles.imageBottomRightBorderRadius]: (isLastRow && isLastImageInRow) || (isSingleRow && isLastItem),
              })}
            />
          );
        })}
      </div>
    </>
  );
};

interface ContactsProps {
  businessCard?: IUseBusinessCard['businessCard'];
}
const Contacts = ({ businessCard }: ContactsProps) => {
  const [t] = useTranslation('common');

  return (
    <>
      <Typography.Title level={5}>{t('businessCards.contacts')}</Typography.Title>

      <CopyableContactList
        items={(businessCard?.phones || []).map((p) => mask.resolve(p.number.toString()))}
        icon={<PhoneOutlined />}
      />

      <Spacing size={8} />

      <CopyableContactList items={(businessCard?.emails || []).map((e) => e.email)} icon={<MailOutlined />} />

      <Spacing size={8} />

      <CopyableContactList
        items={businessCard?.address ? [businessCard.address] : []}
        icon={<EnvironmentOutlined />}
        classNames={{
          item: styles.contantListItem,
        }}
      />
    </>
  );
};

export const buildBusinessCardPermissions = (businessCard?: BusinessCardAttrs | null, userId?: UUID) => {
  const comparable = !!businessCard?.userId && !!userId;
  return {
    canRemove: comparable && businessCard?.userId === userId,
    canEdit: comparable && businessCard?.userId === userId,
    canModifyConnections: comparable && businessCard?.userId !== userId,
  };
};

export default function BusinessCardPublicPage() {
  const [t] = useTranslation('common');
  const location = useLocation();

  const data = matchPath(routes.businessCards(':id')._, location.pathname);
  const id = data?.params.id;

  const { businessCard, loading, error } = useBusinessCard({ id: id || '' });
  useMutationError(error);

  const { user } = useUserInfoContext();

  const permissions = buildBusinessCardPermissions(businessCard, user?.id);

  const dropdownOptions = useBusinessCardDropdownOptions({
    businessCardId: id,
    canModifyConnections: permissions.canModifyConnections,
    canRemove: permissions.canRemove,
  });

  const hasAnyContactInfo =
    (businessCard?.phones || []).length > 0 || (businessCard?.emails || []).length > 0 || !!businessCard?.address;

  return (
    <Container className={styles.container}>
      <Spacing />

      <Block className={styles.main}>
        <div className={styles.cover}></div>

        <div className={styles.profileWrapper}>
          <div className={styles.profileInfoWrapper}>
            <div className={styles.qrCodePanel}>
              <QRCodeSVG
                value={buildBusinessCardPublicLink(id)}
                size={150}
                imageSettings={{
                  src: 'https://cdn-icons-png.flaticon.com/24/717/717392.png',
                  height: 18,
                  width: 18,
                  excavate: true,
                }}
              />
            </div>

            <div>
              <div className={styles.title}>{businessCard?.title}</div>

              <div className={styles.subtitle}>{businessCard?.subtitle}</div>
            </div>

            <div className={styles.profileInfoActions}>
              {permissions.canEdit && (
                <Link to={routes.businessCards().edit(id)._}>
                  <Button>{t('generic.actions.edit')}</Button>
                </Link>
              )}

              {!!dropdownOptions?.length && (
                <Dropdown
                  menu={{
                    items: dropdownOptions,
                  }}
                  // trigger={['click']}
                  placement="bottomRight"
                  className={styles.moreDropdown}
                >
                  <Button>
                    {t('generic.actions.more')}

                    <MoreOutlined className={styles.moreDropdownIcon} />
                  </Button>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </Block>

      <Spacing />

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={16}>
          {/* <Block>
            <div>TODO: Images</div>

            <ImageGrid />
          </Block> */}
          {/* <Spacing /> */}

          {businessCard?.description && (
            <Block className={styles.h100}>
              <Typography.Title level={5}>{t('businessCards.description')}</Typography.Title>

              <div>{businessCard?.description}</div>
            </Block>
          )}

          {!businessCard?.description && (
            <Block className={css(styles.h100, styles.noDescription)}>
              <NoData text={t('businessCards.noDescription')} />
            </Block>
          )}
        </Col>

        <Col xs={24} lg={8}>
          <Block className={styles.contacts}>
            {hasAnyContactInfo && <Contacts businessCard={businessCard} />}

            {!hasAnyContactInfo && <NoData text={t('businessCards.noContacts')} />}
          </Block>
        </Col>
      </Row>

      <Spacing />
    </Container>
  );
}
