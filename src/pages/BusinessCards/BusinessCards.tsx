import React from 'react';
import {
  CopyOutlined,
  EnvironmentOutlined,
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

  // TODO:
  //   - Copy data

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
                {businessCard.phones.length && (
                  <div className={styles.phones}>
                    {businessCard.phones.map((phone) => {
                      return (
                        <div key={phone} className={styles.phoneContainer}>
                          {/* <MobileOutlined /> */}
                          <PhoneOutlined />

                          <div className={styles.phone}>{phone}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className={styles.emails}>
                  {businessCard.emails.length && (
                    <div className={styles.emails}>
                      {businessCard.emails.map((email) => (
                        <div key={email} className={styles.emailContainer}>
                          <MailOutlined />

                          <div className={styles.email}>{email}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  // className={styles.location}
                  className={styles.emailContainer}
                >
                  <EnvironmentOutlined />

                  <div className={styles.email}>{businessCard.address}</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <div>QR code</div>

              <button>Open Profile</button>
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

  const content = animation.playing ? prev : next;

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
      <div>{content}</div>
    </div>
  );
};
