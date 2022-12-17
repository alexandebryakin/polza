import React from 'react';
import css from 'classnames';
import styles from './FormCard.module.scss';

interface FormCardProps extends DivProps {}
function FormCard({ className, ...rest }: FormCardProps) {
  return <div {...rest} className={css(styles.formCard, className)} />;
}

export default FormCard;
