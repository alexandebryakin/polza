import React from 'react';
import css from 'classnames';
import styles from './FormCard.module.scss';

type DivElem = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface FormCardProps extends DivElem {}
function FormCard({ className, ...rest }: FormCardProps) {
  return <div {...rest} className={css(styles.formCard, className)} />;
}

export default FormCard;
