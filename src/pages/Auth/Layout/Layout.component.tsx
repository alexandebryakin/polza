import React from 'react';
import { Space } from 'antd';

import styles from './Layout.module.scss';

interface LayoutProps {
  topRightCTA: React.ReactNode;
  form: React.ReactNode;
  formBottom: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { topRightCTA, form, formBottom } = props;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.headerContainer}>
          <b>Polza Logo</b>

          {topRightCTA}
        </nav>
      </header>

      <main className={styles.main}>
        <Space direction="vertical">
          <div className={styles.formContainer}>{form}</div>

          {formBottom}
        </Space>
      </main>

      <footer
        className={styles.footer}
      >{`TODO: terms of service, copyrihgt, year`}</footer>
    </div>
  );
}

export default Layout;
