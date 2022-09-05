import { WarningOutlined } from '@ant-design/icons';
import { Col, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tabs, Tooltip } from '../../antd';
import css from 'classnames';
import styles from './Profile.module.scss';
import { MutationUpsertPassportArgs } from '../../api/graphql.types';

const FIELDS: Record<keyof MutationUpsertPassportArgs, keyof MutationUpsertPassportArgs> = {
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  code: 'code',
  number: 'number',
};

function PassportForm() {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<MutationUpsertPassportArgs>();

  const onFinish = async (values: MutationUpsertPassportArgs) => {
    alert('TODO: submit passport form');
  };

  return (
    <Form
      className={styles.formCard}
      name="signin"
      form={form}
      layout="vertical"
      requiredMark={'optional'}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24}>
          <Form.Item
            label={t('profile.passport.fields.firstName')}
            name={FIELDS.firstName}
            rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col lg={8} md={12} xs={24}>
          <Form.Item
            label={t('profile.passport.fields.lastName')}
            name={FIELDS.lastName}
            rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label={t('profile.passport.fields.middleName')}
            name={FIELDS.middleName}
            rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={8}>
          <Form.Item
            label={t('profile.passport.fields.code')}
            name={FIELDS.code}
            rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            label={t('profile.passport.fields.number')}
            name={FIELDS.number}
            rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          // block
          // loading={loading}
        >
          {t('generic.actions.save')}
        </Button>
      </Form.Item>
    </Form>
  );
}

const TABS = {
  main: 'main',
  passport: 'passport',
  password: 'password',
};

function Profile() {
  const [t] = useTranslation('common');

  const verified = false;

  return (
    <div className={styles.page}>
      <Typography.Title level={2}>{t('profile.profile')}</Typography.Title>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: t('profile.tabs.generalInfo'),
            key: TABS.main,
            children: (
              <ul>
                <li>email</li>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Profile Image</li>
              </ul>
            ),
          },

          {
            label: (
              <span>
                {t('profile.tabs.passport')}

                {!verified && (
                  <Tooltip title={t('profile.passportNotVerified')}>
                    <WarningOutlined className={css(styles.tabIcon, styles.warning)} />
                  </Tooltip>
                )}
              </span>
            ),
            key: TABS.passport,
            children: <PassportForm />,
          },

          {
            label: t('profile.tabs.password'),
            key: TABS.password,
            children: 'TODO: Password',
          },
        ]}
      />
    </div>
  );
}

export default Profile;
