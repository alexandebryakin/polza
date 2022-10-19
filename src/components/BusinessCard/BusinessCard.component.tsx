import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from '../../antd';
import CopyToClipboard from '../CopyToClipboard';
import FlipCard from '../FlipCard';

import css from 'classnames';
import styles from './BusinessCard.module.scss';
import Flex from '../Flex';
import { CopyOutlined, EnvironmentOutlined, LogoutOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';
import { TitleProps } from 'antd/lib/typography/Title';

export const BusinessCardWrapper = ({
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return <div {...rest} className={css(styles.businessCardWrapper, className)} />;
};

export interface TBusinessCard {
  logo_url?: string;
  title: string;
  subtitle: string;
  phones: string[];
  emails: string[];
  address?: string;
}

interface BusinessCardProps {
  businessCard: TBusinessCard;
}
export default function BusinessCard({ businessCard }: BusinessCardProps) {
  const [t] = useTranslation('common');

  const dontFlipCard = (e: React.MouseEvent<HTMLElement, MouseEvent>) => e.stopPropagation();

  interface ContactListProps {
    items: string[];
    icon: React.ReactNode;
  }
  const ContactList = ({ items, icon }: ContactListProps) => {
    const [t] = useTranslation('common');

    if (!items.length) return null;
    return (
      <div>
        {items.map((item, index) => {
          return (
            <div key={index} className={styles.contactList}>
              {icon}

              <Tooltip placement="right" title={t('generic.clickToCopy')}>
                <CopyToClipboard text={item} onClick={dontFlipCard} className={styles.item}>
                  <Typography.Text ellipsis>{item}</Typography.Text>
                </CopyToClipboard>
              </Tooltip>
            </div>
          );
        })}
      </div>
    );
  };

  const businessCardPublicLink = 'TODO: GENERATE PROFILE LINK';

  const defaultQrCodeSize = 128;
  const [qrCodeSize, setQrCodeSize] = React.useState(defaultQrCodeSize);
  const cardRef = React.useRef<HTMLDivElement>(null);

  type Size = 'tiny' | 'small' | 'middle';
  const [size, setSize] = React.useState<Size>('middle');

  const onCardResized = () => {
    const card = cardRef.current;
    if (!card) return;

    const defaultHeight = 240;
    setQrCodeSize(defaultQrCodeSize * (card.offsetHeight / defaultHeight));

    const threshholds = {
      tiny: 450,
      small: 480,
    };

    if (card.offsetWidth <= threshholds.tiny) return setSize('tiny');
    if (card.offsetWidth > threshholds.tiny && card.offsetWidth <= threshholds.small) return setSize('small');
    setSize('middle');
  };

  React.useEffect(() => {
    if (!cardRef.current) return;

    new ResizeObserver(onCardResized).observe(cardRef.current);
  }, []);

  return (
    <FlipCard
      ref={cardRef}
      front={
        <BusinessCardWrapper>
          <div className={styles.businessCardFront}>
            {businessCard.logo_url && <img src={businessCard.logo_url} className={styles.logo} alt="" />}

            <Typography.Title level={3} className={styles.textCentered}>
              {businessCard.title}
            </Typography.Title>

            <div className={styles.textCentered}>{businessCard.subtitle}</div>
          </div>
        </BusinessCardWrapper>
      }
      back={
        <BusinessCardWrapper>
          <div className={css(styles.businessCardBack, styles[size])}>
            <div className={styles.info}>
              <div className={styles.header}>
                <div>{businessCard.title}</div>
                <div>{businessCard.subtitle}</div>
              </div>

              <div className={styles.contacts}>
                <ContactList
                  items={businessCard.phones}
                  icon={
                    // <MobileOutlined />
                    <PhoneOutlined />
                  }
                />

                <ContactList items={businessCard.emails} icon={<MailOutlined />} />

                <ContactList
                  items={businessCard.address ? [businessCard.address] : []}
                  icon={<EnvironmentOutlined />}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.qrCodeContainer}>
                <QRCodeSVG
                  value={businessCardPublicLink}
                  size={qrCodeSize}
                  imageSettings={{
                    src: 'https://cdn-icons-png.flaticon.com/24/717/717392.png',
                    height: 18,
                    width: 18,
                    excavate: true,
                  }}
                />
              </div>

              <Row gutter={[8, 8]} style={{ maxWidth: qrCodeSize }}>
                <Col xs={size === 'middle' ? 24 : 12}>
                  <Button
                    className={css(styles[size], styles.rqCodeControlButton)}
                    icon={<CopyOutlined />}
                    onClick={dontFlipCard}
                    block
                  >
                    <CopyToClipboard text={businessCardPublicLink} className={styles.item}>
                      {size === 'middle' ? t('businessCards.copyLink') : ''}
                    </CopyToClipboard>
                  </Button>
                </Col>

                <Col xs={size === 'middle' ? 24 : 12}>
                  <Button
                    className={css(styles[size], styles.rqCodeControlButton)}
                    icon={<LogoutOutlined />}
                    onClick={(e) => {
                      dontFlipCard(e);
                      window.open(businessCardPublicLink, '_blank')?.focus();
                    }}
                    block
                  >
                    {size === 'middle' ? t('businessCards.openProfile') : <span />}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </BusinessCardWrapper>
      }
    />
  );
}
