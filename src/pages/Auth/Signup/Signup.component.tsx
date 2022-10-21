import React from 'react';
import { Checkbox, Form, Space, Typography } from 'antd';

import styles from './Signup.module.scss';
import { TFunction, useTranslation } from 'react-i18next';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../antd';

import * as auth from '../../../api/auth';

import isEmpty from 'lodash/isEmpty';
import { routes } from '../../../navigation/routes';
import Layout from '../Layout/Layout.component';
import { jwt } from '../../../api/jwt';
import { SignupUserMutation, SignupUserMutationVariables } from '../../../api/graphql.types';
import { AxiosResponseWrapper } from '../../../api/makeRequest';
import { validate } from '@graphql-codegen/typescript-react-apollo';
import { isEqual } from 'lodash';
import Format from '../../../lib/Format';

const FIELDS = {
  email: 'email',
  password: 'password',
  agreed: 'agreed',
};

type FieldData = {
  name: typeof FIELDS.email | typeof FIELDS.password;
  errors: string[];
};

const buildAntFormErrorFieldsData = (response: AxiosResponseWrapper<SignupUserMutation>, t: TFunction) => {
  const fieldData: FieldData[] = [];

  if (response.data.signupUser?.errors.email) {
    fieldData.push({
      name: FIELDS.email,
      errors: [t('auth.errors.invalidEmail')],
    });
  }
  if (response.data.signupUser?.errors.password) {
    fieldData.push({
      name: FIELDS.password,
      errors: [t('auth.errors.invalidPassoword')],
    });
  }

  return fieldData;
};

function Signup() {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<SignupUserMutationVariables>();

  const [loading, setLoading] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: SignupUserMutationVariables) => {
    setLoading(true);
    const response = await auth.signupUser({ variables: values });

    if (!isEmpty(response.data.signupUser?.errors)) {
      form.setFields(buildAntFormErrorFieldsData(response, t));
    } else {
      jwt.set(response.data.signupUser?.token || '');

      navigate(routes.profile()._);
    }

    setLoading(false);
  };

  return (
    <Layout
      topRightCTA={
        <Space>
          <span>{t('auth.alreadyHaveAnAccount')}</span>

          <Link to={routes.signin()._}>
            <Button type="primary">{t('auth.login')}</Button>
          </Link>
        </Space>
      }
      form={
        <Form
          className={styles.formCard}
          name="signup"
          form={form}
          layout="vertical"
          requiredMark={'optional'}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Typography.Title className={styles.letsGo}>{t('auth.letsGo')}</Typography.Title>

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
            <Input.Password className={styles.input} prefix={<LockOutlined className={styles.inputIcon} />} />
          </Form.Item>

          <Form.Item
            name={FIELDS.agreed}
            rules={[
              {
                message: t('auth.rules.termsOfServiceRequired'),
                validator: (rule) => {
                  return agreed ? Promise.resolve() : Promise.reject(new Error(rule.message?.toString()));
                },
              },
            ]}
          >
            <Checkbox onChange={(e) => setAgreed(e.target.checked)}>
              <Format
                pattern={t('auth.agreeToTermsOfService')}
                interpolations={{
                  termsOfService: (
                    <a href={'http://TODO-terms-of-service.com'} target="_blank" rel="noreferrer">
                      {t('auth.termsOfService')}
                    </a>
                  ),
                  privacyPolicy: (
                    <a href={'http://TODO-privacy-policy.com'} target="_blank" rel="noreferrer">
                      {t('auth.privacyPolicy')}
                    </a>
                  ),
                }}
              />
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              // disabled={!agreed}
            >
              {t('auth.signup')}
            </Button>
          </Form.Item>
        </Form>
      }
      formBottom={
        <div className={styles.alreadyHaveAnAccount}>
          <span>{t('auth.alreadyHaveAnAccount')}</span>

          <Link to={routes.signin()._}>
            <Button type="link">{t('auth.login')}</Button>
          </Link>
        </div>
      }
    />
  );
}

export default Signup;
