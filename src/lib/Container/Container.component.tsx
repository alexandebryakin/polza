import styles from './Container.module.scss';
import css from 'classnames';

export interface ContainerProps extends DivProps {}

export default function Container(props: ContainerProps) {
  return <div {...props} className={css(styles.container, props.className)} />;
}
