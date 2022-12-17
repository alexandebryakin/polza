import React from 'react';
import { Space } from 'antd';

import styles from './Layout.module.scss';
import Logo from '../../../components/Logo';

const appHeight = () => {
  // https://stackoverflow.com/a/50683190
  const doc = document.documentElement;
  doc.style.setProperty('--app-width', `${window.innerWidth}px`);
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

interface HeaderProps {
  children: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.headerContainer}>
        <Logo />

        {children}
      </nav>
    </header>
  );
};

interface LayoutProps {
  topRightCTA: React.ReactNode;
  form: React.ReactNode;
  formBottom: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { topRightCTA, form, formBottom } = props;

  React.useEffect(() => {
    window.addEventListener('resize', appHeight);
    appHeight();

    return () => window.removeEventListener('resize', appHeight);
  }, []);

  return (
    <div className={styles.page}>
      <Header>{topRightCTA}</Header>

      <main className={styles.main}>
        <Space direction="vertical">
          <div className={styles.formContainer}>{form}</div>

          {formBottom}
        </Space>
      </main>

      <footer className={styles.footer}>{`TODO: terms of service, copyrihgt, year`}</footer>
    </div>
  );
}

Layout.Header = Header;

export default Layout;
