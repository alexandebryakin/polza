import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page.module.scss';
import css from 'classnames';
import { screen } from '../../utils/screen';

interface PageProps {
  withBackButton?: boolean;
  children: React.ReactNode;
}

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div onClick={goBack} className={styles.backButton}>
      <ArrowLeftOutlined />
    </div>
  );
};

export default function Page({ children, withBackButton = false }: PageProps) {
  return (
    <div className={css(styles.page, screen.mobile() && styles.pageMobile)}>
      {withBackButton && <BackButton />}

      {children}
    </div>
  );
}
