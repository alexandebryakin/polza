import React from 'react';
import {
  CheckCircleOutlined,
  CopyOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReloadOutlined,
  RotateLeftOutlined,
} from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import css from 'classnames';
import styles from './BusinessCards.module.scss';
import Flex from '../../components/Flex';
import CopyToClipboard from '../../components/CopyToClipboard';
import { Button, Tooltip } from '../../antd';
import { QRCodeSVG } from 'qrcode.react';
import { t } from 'i18next';

function BusinessCardWrapper({
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div {...rest} className={css(styles.businessCardWrapper, className)} />;
}

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  duration?: number;
}
function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <>
      <div
        className={css(
          styles.flipCard,
          { [styles.flipCard__flipped]: flipped }
          //
        )}
        onClick={toggle}
      >
        <div className={css(styles.flipCard__side, styles.flipCard__content)}>{front}</div>

        <div className={css(styles.flipCard__side, styles.flipCard__content, styles.flipCard__back)}>{back}</div>
      </div>
    </>
  );
}

function BusinessCard() {
  const [t] = useTranslation('common');

  interface BusinessCard {
    logo_url?: string;
    title: string;
    subtitle: string;
    phones: string[];
    emails: string[];
    address?: string;
  }

  const businessCard: BusinessCard = {
    logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGq1BkRbLcvOb_pHTDvPAuvRbxey_6IV6UQ&usqp=CAU',
    title: 'Trofimova Elena Nikolaevna',
    subtitle: 'Designer',
    phones: ['79781234567', '79781234568'],
    emails: ['some-short@mail.com', 'some-extremaly-long-email@mail.com'],
    address: 'Moscow, Putanova Street, 29',
  };

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
        {items.map((item) => {
          return (
            <div key={item} className={styles.contactList}>
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

  return (
    <FlipCard3
      front={
        <BusinessCardWrapper>
          <div className={styles.businessCardFront}>
            {businessCard.logo_url && <img src={businessCard.logo_url} className={styles.logo} alt="" />}

            <Flex direction="column" align="center">
              <Typography.Title level={3}>{businessCard.title}</Typography.Title>

              <div
                // level={5}
                className={styles.subtitle}
              >
                {businessCard.subtitle}
              </div>
            </Flex>
          </div>
        </BusinessCardWrapper>
      }
      back={
        <BusinessCardWrapper>
          <div className={styles.businessCardBack}>
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
              <div>
                <QRCodeSVG
                  value="https://todo.to-profile.com/"
                  // size={64}
                  imageSettings={{
                    src: 'https://cdn-icons-png.flaticon.com/24/717/717392.png',
                    height: 18,
                    width: 18,
                    excavate: true,
                  }}
                />
              </div>

              {/* <Flex
                justify="center"
                align="center"
                style={{ gap: 12 }}
              >
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  style={{ flexGrow: 1 }}
                >
                </Button>
                <Button
                  size="small"
                  icon={<LogoutOutlined />}
                  style={{ flexGrow: 1 }}
                >
                </Button>
              </Flex> */}

              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={dontFlipCard}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <CopyToClipboard text={businessCardPublicLink} className={styles.item}>
                  {t('businessCards.copyLink')}
                </CopyToClipboard>
              </Button>

              <Button
                style={{ display: 'flex', alignItems: 'center' }}
                size="small"
                icon={<LogoutOutlined />}
                onClick={dontFlipCard}
                target="_blank"
                href={businessCardPublicLink}
              >
                {t('businessCards.openProfile')}
              </Button>
            </div>
          </div>
        </BusinessCardWrapper>
      }
    />
  );
  return <BusinessCardWrapper></BusinessCardWrapper>;
}

const AddBusinessCard = () => {
  return (
    <BusinessCardWrapper className={styles.addBusinessCard}>
      <PlusOutlined className={styles.plusIconSize} />
    </BusinessCardWrapper>
  );
};

const Controls = () => {
  return (
    <Flex direction="column">
      <div>
        <CopyOutlined style={{ fontSize: 20 }} />
      </div>

      <div>
        <ReloadOutlined style={{ fontSize: 20 }} />
      </div>
    </Flex>
  );
};

function BusinessCards() {
  const [t] = useTranslation('common');

  const [size, setSize] = React.useState(5);

  const Rows = () => {
    return (
      <Row gutter={[20, 20]}>
        {Array.from(Array(size).keys()).map((i) => {
          return (
            <Col key={i} xs={24} md={24} lg={12} xxl={8}>
              <Flex>
                {/* <FlipCard3
                  front={<BusinessCardWrapper>front {i}</BusinessCardWrapper>}
                  back={<BusinessCardWrapper>back {i}</BusinessCardWrapper>}
                /> */}

                <BusinessCard />

                {/* <Controls />  */}
              </Flex>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className={styles.page}>
      {/* TODO: move page to a separate component */}

      <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

      <Rows />

      {/* <div className={styles.row}>
        {Array.from(Array(size).keys()).map((i) => {
          return (
            // <div key={i} className={styles.column}>
            <FlipCard3
              key={i}
              front={<BusinessCardWrapper>front {i}</BusinessCardWrapper>}
              back={<BusinessCardWrapper>back {i}</BusinessCardWrapper>}
            />
            // </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default BusinessCards;

type T = {
  playing: boolean;
  start: () => void;
  // stop: () => void;
};
const useAnimation = (duration: number): T => {
  const [playing, setPlaying] = React.useState(false);

  const start: T['start'] = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), duration);
  };

  return {
    playing,
    start,
  };
};

function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const FlipCard3 = ({ front, back, duration = 500 }: FlipCardProps) => {
  const [flipped, setFlipped] = React.useState(true);
  const toggle = () => setFlipped((f) => !f);

  const animation = useAnimation(duration / 2 - 100);

  const next = !flipped ? front : <div className={css({ [styles.flipCard3__flipped]: flipped })}>{back}</div>;

  const prev = usePrevious(next);

  return (
    <div
      style={{ transitionDuration: `${duration}ms` }}
      className={css(styles.flipCard3, {
        [styles.flipCard3__flipped]: flipped,
      })}
      onClick={() => {
        animation.start();
        toggle();
      }}
    >
      {animation.playing ? prev : next}
    </div>
  );
};
