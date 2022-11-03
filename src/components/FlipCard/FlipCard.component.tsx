import React from 'react';
import css from 'classnames';
import styles from './FlipCard.module.scss';

import usePrevious from '../../hooks/usePrevious';

type UseAnimationReturnType = {
  playing: boolean;
  start: () => void;
  // stop: () => void;
};
const useAnimation = (duration: number): UseAnimationReturnType => {
  const [playing, setPlaying] = React.useState(false);

  const start: UseAnimationReturnType['start'] = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), duration);
  };

  return {
    playing,
    start,
  };
};

interface FlipCardProps {
  'data-id'?: string;
  front: React.ReactNode;
  back: React.ReactNode;
  duration?: number;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>((props, ref) => {
  const { front, back, duration = 500 } = props;

  const [flipped, setFlipped] = React.useState(false);
  const toggle = () => setFlipped((f) => !f);

  const animation = useAnimation(duration / 2 - 100);

  const next = !flipped ? front : <div className={css({ [styles.flipCard__flipped]: flipped })}>{back}</div>;

  const prev = usePrevious(next);

  return (
    <div
      data-id={props['data-id']}
      ref={ref}
      style={{ transitionDuration: `${duration}ms` }}
      className={css(styles.flipCard, {
        [styles.flipCard__flipped]: flipped,
      })}
      onClick={() => {
        animation.start();
        toggle();
      }}
    >
      {animation.playing ? prev : next}
    </div>
  );
});

export default FlipCard;
