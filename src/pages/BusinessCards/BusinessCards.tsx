import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import css from 'classnames';
import styles from './BusinessCards.module.scss';

function BusinessCardWrapper({
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div {...rest} className={css(styles.businessCardWrapper, className)} />;
}

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}
function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={css(
        styles.flipCard,
        styles.businessCardWrapper,
        //
        { [styles.flipCard__flipped]: flipped }
      )}
      onClick={toggle}
    >
      <div className={css(styles.flipCard__side, styles.flipCard__content)}>{front}</div>

      <div className={css(styles.flipCard__back, styles.flipCard__side, styles.flipCard__content)}>{back}</div>
    </div>
  );
}

function BusinessCard() {
  return (
    <BusinessCardWrapper>
      TODO: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, placeat nesciunt? Atque, aut. Reprehenderit
      ad, beatae explicabo possimus neque non porro animi repellat deserunt ratione veritatis natus eveniet debitis
      deleniti placeat, delectus, consectetur laborum accusantium.
    </BusinessCardWrapper>
  );
}

const AddBusinessCard = () => {
  return (
    <BusinessCardWrapper className={styles.addBusinessCard}>
      <PlusOutlined className={styles.plusIconSize} />
    </BusinessCardWrapper>
  );
};

function BusinessCards() {
  const [t] = useTranslation('common');

  const [size, setSize] = React.useState(10);

  return (
    <div className={styles.page}>
      {/* TODO: move page to a separate component */}

      <Typography.Title level={2}>{t('businessCards.businessCards')}</Typography.Title>

      <div className={styles.businessCardsContainer}>
        <AddBusinessCard />

        <FlipCard
          front={
            'TODO: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, placeat nesciunt? Atque, aut. Reprehenderit ad, beatae explicabo possimus neque non porro animi repellat deserunt ratione veritatis natus eveniet debitis deleniti placeat, delectus, consectetur laborum accusantium.'
          }
          back="back"
        />

        {Array.from(Array(size).keys()).map((i) => {
          return <BusinessCard key={i} />;
        })}
      </div>
    </div>
  );
}

export default BusinessCards;
