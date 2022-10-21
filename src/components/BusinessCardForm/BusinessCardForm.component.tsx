import { DeleteOutlined, MailOutlined, PhoneOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, FormProps, Col, Divider, Row, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select } from '../../antd';
import { buildFields } from '../../utils/buildFields';
import { TBusinessCard } from '../BusinessCard/BusinessCard.component';

import IMask from 'imask';

import styles from './BusinessCardForm.module.scss';
import useToggler from '../../hooks/useToggler';
import AddPhoneModal from '../modals/AddPhoneModal';
import { MASKS } from '../modals/AddPhoneModal/AddPhoneModal.component';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import AddEmailModal from '../modals/AddEmailModal';

const mask = IMask.createMask({
  mask: MASKS.PHONE,
});

const MAX_PHONES_COUNT = 2;
const MAX_EMAILS_COUNT = 2;

const FIELDS = buildFields<TBusinessCard>([
  // 'logo_url',
  'title',
  'subtitle',
  'phones',
  'emails',
  'address',
]);

export interface BusinessCardFormProps {
  onChange?: (values: Partial<TBusinessCard>) => void;
  components?: {
    Wrapper?: React.FC;
  };
}

export default function BusinessCardForm({ onChange, components }: BusinessCardFormProps) {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<TBusinessCard>();

  const onFinish: FormProps<TBusinessCard>['onFinish'] = (values) => {
    console.log('BusinessCardForm.onFinish>>>', values);
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

  return (
    <WrapperComponent>
      <AddPhoneModal toggler={phoneModal} />
      <AddEmailModal toggler={emailModal} />

      <Form<TBusinessCard>
        name="businessCard"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        autoComplete="off"
        // TODO: change initialValues
        // initialValues={{ ...passport }}
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

        <Divider />

        <Form.Item
          label={t('businessCards.form.fields.phones')}
          name={FIELDS.phones}
          // rules={[{ required: true, message: t('generic.form.rules.fieldRequired') }]}
        >
          <Select<string[]>
            mode="multiple"
            defaultValue={[]}
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

        <Form.Item
          label={t('businessCards.form.fields.emails')}
          name={FIELDS.emails}
          // rules={[{ required: true, message: t('generic.form.rules.fieldRequired') }]}
        >
          <Select<string[]>
            mode="multiple"
            defaultValue={[]}
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
            <Button type="primary" htmlType="submit" block icon={<SaveOutlined />}>
              {t('generic.actions.save')}
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
