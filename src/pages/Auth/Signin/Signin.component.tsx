import React from 'react';
import { Form, Space, Typography } from 'antd';

import styles from './Signin.module.scss';
import { TFunction, useTranslation } from 'react-i18next';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../antd';

import * as auth from '../../../api/auth';

import isEmpty from 'lodash/isEmpty';
import { jwt } from '../../../api/jwt';
import { ROUTES } from '../../../navigation/routes';
import Layout from '../Layout/Layout.component';
import {
  SigninUserMutation,
  SigninUserMutationVariables,
} from '../../../api/graphql.types';
import { AxiosResponseWrapper } from '../../../api/makeRequest';

const FIELDS = {
  email: 'email',
  password: 'password',
};

type FieldData = {
  name: typeof FIELDS.email | typeof FIELDS.password;
  errors: string[];
};

const buildAntFormErrorFieldsData = (
  response: AxiosResponseWrapper<SigninUserMutation>,
  t: TFunction
) => {
  const userErrors = response.data.signinUser?.errors.user || [];

  const fieldData: FieldData[] = [];

  const NOT_FOUND = 'not found';
  const INVALID_CREDENTIALS = 'invalid credentials';

  if (userErrors.includes(NOT_FOUND)) {
    fieldData.push({
      name: FIELDS.email,
      errors: [t('auth.errors.userNotFound')],
    });
  }
  if (userErrors.includes(INVALID_CREDENTIALS)) {
    fieldData.push({
      name: FIELDS.password,
      errors: [t('auth.errors.invalidCredentials')],
    });
  }

  return fieldData;
};

function Signin() {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<SigninUserMutationVariables>();

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: SigninUserMutationVariables) => {
    setLoading(true);
    const response = await auth.signinUser({ variables: values });

    if (!isEmpty(response.data.signinUser?.errors)) {
      form.setFields(buildAntFormErrorFieldsData(response, t));
    } else {
      jwt.set(response.data.signinUser?.token || '');

      navigate(ROUTES.PROFILE);
    }

    setLoading(false);
  };

  return (
    <Layout
      topRightCTA={
        <Space>
          <span>{t('auth.dontHaveAnAccount')}</span>

          <Link to={ROUTES.AUTH.SIGNUP}>
            <Button type="primary">{t('auth.signup')}</Button>
          </Link>
        </Space>
      }
      form={
        <Form
          className={styles.formCard}
          name="signin"
          form={form}
          layout="vertical"
          requiredMark={'optional'}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Typography.Title className={styles.welcomeBack}>
            {t('auth.welcomeBack')}
          </Typography.Title>

          <Form.Item
            label={t('auth.fields.email')}
            name={FIELDS.email}
            rules={[{ required: true, message: t('auth.rules.emailRequired') }]}
          >
            <Input
              className={styles.input}
              prefix={<UserOutlined className={styles.inputIcon} />}
            />
          </Form.Item>

          <Form.Item
            label={t('auth.fields.password')}
            name={FIELDS.password}
            rules={[
              {
                required: true,
                message: t('auth.rules.passwordRequired'),
              },
            ]}
          >
            <Input.Password
              className={styles.input}
              prefix={<LockOutlined className={styles.inputIcon} />}
              iconRender={() => <Link to="forgot">{t('auth.forgot')}</Link>}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
      }
      formBottom={
        <div className={styles.dontHaveAnAccount}>
          <span>{t('auth.dontHaveAnAccount')}</span>

          <Link to={ROUTES.AUTH.SIGNUP}>
            <Button type="link">{t('auth.signup')}</Button>
          </Link>
        </div>
      }
    />
  );
}

export default Signin;
