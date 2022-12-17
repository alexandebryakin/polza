import Container from '../../lib/Container';
import styles from './BusinessCardPublicPage.module.scss';
import css from 'classnames';
import { Col, Row } from 'antd';
import { routes } from '../../navigation/routes';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Button, Dropdown } from '../../antd';
import { useTranslation } from 'react-i18next';
import { EnvironmentOutlined, MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';
import React from 'react';
import { useMutationError } from '../../hooks/useMutationError';
import { IUseBusinessCard, useBusinessCard } from '../../api/businessCards';
import { QRCodeSVG } from 'qrcode.react';
import { BusinessCardAttrs, mask } from '../../components/BusinessCard';
import CopyableContactList from '../../components/CopyableContactList';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import { buildBusinessCardPublicLink } from '../../utils/buildBusinessCardPublicLink';

import NoData from '../../components/NoData';
import { useBusinessCardDropdownOptions } from '../../hooks/useBusinessCardDropdownOptions';
import Typography from '../../lib/Typography';
import Page from '../../components/Page';

const Separator = () => {
  return <div className={styles.separator} />;
};

const Section = (props: DivProps) => {
  return <div {...props} className={css(styles.section, props.className)} />;
};

export const Block = ({ padded, ...props }: DivProps & { padded?: boolean }) => {
  return <div {...props} className={css(styles.block, props.className, padded && styles.blockPadded)} />;
};

Block.Separator = Separator;
Block.Section = Section;

export const Spacing = (props: DivProps & { size?: number }) => {
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

  const phones = (businessCard?.phones || []).map((p) => mask.resolve(p.number.toString()));
  const emails = (businessCard?.emails || []).map((e) => e.email);
  const hasAnyContactInfo = phones.length > 0 || emails.length > 0 || !!businessCard?.address;

  if (loading) return null;
  return (
    <Page>
      <Container className={styles.container}>
        <Spacing />

        <Block padded className={styles.main}>
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
                <Block.Section>
                  <Typography.Title level={5}>{t('businessCards.description')}</Typography.Title>
                </Block.Section>

                <Block.Separator />

                <Block.Section>
                  <div>{businessCard?.description}</div>
                </Block.Section>
              </Block>
            )}

            {!businessCard?.description && (
              <Block className={css(styles.h100, styles.mh100px)}>
                <NoData.Wrapper>
                  <NoData text={t('businessCards.noDescription')} />
                </NoData.Wrapper>
              </Block>
            )}
          </Col>

          <Col xs={24} lg={8}>
            {hasAnyContactInfo && (
              <Block className={styles.contacts}>
                <Block.Section>
                  <Typography.Title level={5}>{t('businessCards.contacts')}</Typography.Title>
                </Block.Section>

                <Block.Separator />

                <Block.Section className={styles.contactsList}>
                  <CopyableContactList items={phones} icon={<PhoneOutlined />} />
                  <CopyableContactList items={emails} icon={<MailOutlined />} />
                  <CopyableContactList
                    items={businessCard?.address ? [businessCard.address] : []}
                    icon={<EnvironmentOutlined />}
                    classNames={{
                      item: styles.contantListItem,
                    }}
                  />
                </Block.Section>
              </Block>
            )}

            {!hasAnyContactInfo && (
              <Block className={styles.h100}>
                <NoData.Wrapper>
                  <NoData text={t('businessCards.noContacts')} />
                </NoData.Wrapper>
              </Block>
            )}
          </Col>
        </Row>

        <Spacing size={36} />
      </Container>
    </Page>
  );
}
