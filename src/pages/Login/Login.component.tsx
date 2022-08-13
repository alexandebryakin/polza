import React from 'react';
import { Button, ButtonProps, Form, Input, Space, Typography } from 'antd';

import styles from './Login.module.scss';
import { useTranslation } from 'react-i18next';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import css from 'classnames';

function StyledButton(props: ButtonProps) {
  return <Button {...props} className={css(props.className, styles.button)} />;
}

function Login() {
  const [t] = useTranslation('common');

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // TODO: add handleing
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.headerContainer}>
          {/* <Typography.Title level={3}>Polza Logo</Typography.Title> */}
          <b>Polza Logo</b>

          <Space>
            <span>{t('login.dontHaveAnAccount')}</span>

            <Link to="/signup">
              <Button type="primary" className={styles.button}>
                {t('login.signup')}
              </Button>
            </Link>
          </Space>
        </nav>
      </header>

      <main className={styles.main}>
        <Space direction="vertical">
          <div className={styles.formContainer}>
            <Form
              className={styles.formCard}
              name="login"
              layout="vertical"
              requiredMark={'optional'}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Typography.Title className={styles.welcomeBack}>
                {t('login.welcomeBack')}
              </Typography.Title>

              <Form.Item
                label={t('login.fields.email')}
                name="user_identificator"
                rules={[
                  { required: true, message: t('login.rules.emailRequired') },
                ]}
              >
                <Input
                  className={styles.input}
                  prefix={<UserOutlined className={styles.inputIcon} />}
                />
              </Form.Item>

              <Form.Item
                label={t('login.fields.password')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('login.rules.passwordRequired'),
                  },
                ]}
              >
                <Input.Password
                  className={styles.input}
                  prefix={<LockOutlined className={styles.inputIcon} />}
                  iconRender={() => (
                    <Link to="forgot">{t('login.forgot')}</Link>
                  )}
                />
              </Form.Item>

              <Form.Item>
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className={styles.button}
                >
                  {t('login.login')}
                </Button> */}

                <StyledButton type="primary" htmlType="submit" block>
                  {t('login.login')}
                </StyledButton>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.dontHaveAnAccount}>
            <span>{t('login.dontHaveAnAccount')}</span>

            <Link to="/signup">
              <Button type="link">{t('login.signup')}</Button>
            </Link>
          </div>
        </Space>
      </main>

      <footer
        className={styles.footer}
      >{`TODO: terms of service, copyrihgt, year`}</footer>
    </div>
  );
}

export default Login;
