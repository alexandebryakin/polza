import { StopOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import css from 'classnames';
import styles from './AccessDenied.module.scss';

const AccessDenied = (props: DivProps) => {
  const [t] = useTranslation('common');

  return (
    <div {...props} className={css(styles.accessDenied, props.className)}>
      <div className={styles.message}>{t('generic.accessDenied')}</div>

      <StopOutlined className={styles.icon} />
    </div>
  );
};

export default AccessDenied;
