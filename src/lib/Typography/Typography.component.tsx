import css from 'classnames';
import styles from './Typography.module.scss';

interface TitleProps extends DivProps {
  level?: 1 | 2 | 3 | 4 | 5;
  marginedBottom?: boolean;
}
const Title = ({ level = 1, marginedBottom = false, ...props }: TitleProps) => {
  return (
    <div
      {...props}
      className={css(
        styles.title,
        styles[`level${level}`],
        marginedBottom && styles[`marginedBottom${level}`],
        props.className
      )}
    />
  );
};

const Typography = {
  Title,
};

export default Typography;
