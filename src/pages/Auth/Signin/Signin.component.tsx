import React from 'react';
import { Form, Space } from 'antd';

import styles from './Signin.module.scss';
import { TFunction, useTranslation } from 'react-i18next';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';

import isEmpty from 'lodash/isEmpty';
import { jwt } from '../../../api/jwt';
import { routes } from '../../../navigation/routes';
import Layout from '../Layout/Layout.component';
import { SigninUserMutation, SigninUserMutationVariables, useSigninUserMutation } from '../../../api/graphql.types';
import { FetchResult } from '@apollo/client';
import { useMutationError } from '../../../hooks/useMutationError';
import { useUserInfoContext } from '../../../contexts/userInfo/userInfoContext';
import Typography from '../../../lib/Typography';

const FIELDS = {
  email: 'email',
  password: 'password',
};

type FieldData = {
  name: typeof FIELDS.email | typeof FIELDS.password;
  errors: string[];
};

type TResponse = FetchResult<SigninUserMutation, Record<string, any>, Record<string, any>>;
const buildAntFormErrorFieldsData = (response: TResponse, t: TFunction) => {
  const userErrors = response.data?.signinUser?.errors.user || [];

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

  const navigate = useNavigate();

  const [signinUser, { loading, error }] = useSigninUserMutation();
  useMutationError(error);

  const { refetchUser } = useUserInfoContext();

  const onFinish = async (variables: SigninUserMutationVariables) => {
    const response = await signinUser({ variables });

    if (!isEmpty(response.data?.signinUser?.errors)) {
      form.setFields(buildAntFormErrorFieldsData(response, t));
    } else {
      jwt.set(response.data?.signinUser?.token || '');
      refetchUser();

      navigate(routes.profile()._);
    }
  };

  return (
    <Layout
      topRightCTA={
        <Space>
          <span>{t('auth.dontHaveAnAccount')}</span>

          <Link to={routes.signup()._}>
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
          <Typography.Title className={styles.welcomeBack}>{t('auth.welcomeBack')}</Typography.Title>

          <Form.Item
            label={t('auth.fields.email')}
            name={FIELDS.email}
            rules={[{ required: true, message: t('auth.rules.emailRequired') }]}
          >
            <Input className={styles.input} prefix={<UserOutlined className={styles.inputIcon} />} />
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
              iconRender={() => (
                // TODO: Change! This is the visibility Icon for the password
                <Link to={'#'} onClick={() => alert('TODO: add forgot')}>
                  {t('auth.forgot')}
                </Link>
              )}
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

          <Link to={routes.signup()._}>
            <Button type="link">{t('auth.signup')}</Button>
          </Link>
        </div>
      }
    />
  );
}

export default Signin;
