import { DeleteOutlined, MailOutlined, PhoneOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, FormProps, Col, Divider, Row, Space, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select } from '../../antd';
import { buildFields } from '../../utils/buildFields';

import IMask from 'imask';

import styles from './BusinessCardForm.module.scss';
import useToggler from '../../hooks/useToggler';
import AddPhoneModal from '../modals/AddPhoneModal';
import { MASKS } from '../modals/AddPhoneModal/AddPhoneModal.component';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import AddEmailModal from '../modals/AddEmailModal';
import { MutationUpsertBusinessCardArgs, Status, useUpsertBusinessCardMutation } from '../../api/graphql.types';
import { onFailure } from '../../utils/onFailure';
import { useMutationError } from '../../hooks/useMutationError';

const mask = IMask.createMask({
  mask: MASKS.PHONE,
});

const MAX_PHONES_COUNT = 2;
const MAX_EMAILS_COUNT = 2;

const FIELDS = buildFields<MutationUpsertBusinessCardArgs>([
  // 'logo_url',
  'title',
  'subtitle',
  'description',
  'status',
  'phones',
  'emails',
  'address',
]);

export interface BusinessCardFormProps {
  onChange?: (values: Partial<MutationUpsertBusinessCardArgs>) => void;
  components?: {
    Wrapper?: React.FC;
  };
}

export default function BusinessCardForm({ onChange, components }: BusinessCardFormProps) {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<MutationUpsertBusinessCardArgs>();
  const [upsertBusinessCard, { loading, error }] = useUpsertBusinessCardMutation();

  useMutationError(error);

  const onFinish: FormProps<MutationUpsertBusinessCardArgs>['onFinish'] = async (
    variables: MutationUpsertBusinessCardArgs
  ) => {
    console.log('BusinessCardForm.onFinish>>>', variables);
    const response = await upsertBusinessCard({ variables });

    type Keys = keyof MutationUpsertBusinessCardArgs;

    onFailure<Keys>(response.data?.upsertBusinessCard, (errorsFor, errors) => {
      const fieldData: FieldData<Keys>[] = Object.entries(errors).map(([field, fieldErrors]) => {
        return {
          name: field as Keys,
          errors: [t('generic.form.errors.invalidValue')],
        };
      });

      form.setFields(fieldData);
    });

    if (response.data?.upsertBusinessCard?.status === Status.Success) {
      notification.success({
        message: t('businessCards.businessCardCreatedSuccessfully'),
      });
    }
  };

  const [saveMessage, setSaveMessage] = React.useState('');
  const onFinishFailed = () => {
    setSaveMessage(t('generic.error'));

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const WrapperComponent = components?.Wrapper || React.Fragment;

  const { user } = useUserInfoContext();

  const phones = (user?.phones || []).map((p) => p.number);
  const emails = (user?.emails || []).map((e) => e.email);

  const onFieldsChange = () => {
    onChange?.(form.getFieldsValue());
  };

  const phoneModal = useToggler();
  const emailModal = useToggler();

  // TODO: fetch business card by ID
  const businessCardDefaultArgs: MutationUpsertBusinessCardArgs = {
    title: '',
    subtitle: '',
    phones: [],
    emails: [],
  };

  return (
    <WrapperComponent>
      <AddPhoneModal toggler={phoneModal} />
      <AddEmailModal toggler={emailModal} />

      <Form<MutationUpsertBusinessCardArgs>
        name="businessCard"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={businessCardDefaultArgs}
      >
        <Form.Item
          label={t('businessCards.form.fields.title')}
          name={FIELDS.title}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired') }]}
        >
          <Input placeholder={t('businessCards.form.placeholders.title')} />
        </Form.Item>

        <Form.Item
          label={t('businessCards.form.fields.subtitle')}
          name={FIELDS.subtitle}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired') }]}
        >
          <Input placeholder={t('businessCards.form.placeholders.subtitle')} />
        </Form.Item>

        <Form.Item label={t('businessCards.form.fields.description')} name={FIELDS.description}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Divider />

        <Form.Item label={t('businessCards.form.fields.phones')} name={FIELDS.phones}>
          <Select<string[]>
            mode="multiple"
            onChange={(phones) => {
              form.setFieldValue('phones', phones);
              onFieldsChange();
            }}
          >
            {phones.map((item) => {
              const selectedPhones = form.getFieldValue('phones') || [];
              return (
                <Select.Option
                  key={item}
                  value={item}
                  disabled={selectedPhones.length >= MAX_PHONES_COUNT && !selectedPhones.includes(item)}
                >
                  <Space align="center">
                    <PhoneOutlined />
                    {mask.resolve(item.toString())}
                  </Space>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Col xs={24} md={12}>
          <Button type="dashed" block onClick={phoneModal.on} icon={<PlusOutlined />}>
            {t('businessCards.form.actions.addPhone')}
          </Button>
        </Col>

        <Divider />

        <Form.Item label={t('businessCards.form.fields.emails')} name={FIELDS.emails}>
          <Select<string[]>
            mode="multiple"
            onChange={(emails) => {
              form.setFieldValue('emails', emails);
              onFieldsChange();
            }}
          >
            {emails.map((item) => {
              const selectedItems = form.getFieldValue('emails') || [];
              return (
                <Select.Option
                  key={item}
                  value={item}
                  disabled={selectedItems.length >= MAX_EMAILS_COUNT && !selectedItems.includes(item)}
                >
                  <Space align="center">
                    <MailOutlined />

                    {item}
                  </Space>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Col xs={24} md={12}>
          <Button type="dashed" block onClick={emailModal.on} icon={<PlusOutlined />}>
            {t('businessCards.form.actions.addEmail')}
          </Button>
        </Col>

        <Divider />

        <Form.Item label={t('businessCards.form.fields.address')} name={FIELDS.address}>
          <Input placeholder={t('businessCards.form.placeholders.address')} />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Button
              type="primary"
              danger={!!saveMessage}
              onClick={form.submit}
              block
              icon={<SaveOutlined />}
              loading={loading}
            >
              {saveMessage || t('generic.actions.save')}
            </Button>
          </Col>

          <Col xs={24} lg={12}>
            <Button
              danger
              block
              icon={<DeleteOutlined />}
              onClick={() => console.log('TODO: add handler + confirmation')}
            >
              {t('generic.actions.remove')}
            </Button>
          </Col>
        </Row>
      </Form>
    </WrapperComponent>
  );
}
