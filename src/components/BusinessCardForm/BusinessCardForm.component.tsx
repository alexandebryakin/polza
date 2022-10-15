import { DeleteOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, FormProps, Col, Divider } from 'antd';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { FormItemProps, FormListProps, Rule } from 'antd/lib/form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../antd';
import { buildFields } from '../../utils/buildFields';
import { TBusinessCard } from '../BusinessCard/BusinessCard.component';

import styles from './BusinessCardForm.module.scss';

const MASKS = {
  PHONE: '+7(000)000-00-00',
};

const MAX_PHONES_COUNT = 2;
const MAX_EMAILS_COUNT = 2;

interface FormListLayoutProps {
  mask: MaskedInputProps['mask'] | 'none';
  name: FormListProps['name'];
  label: FormItemProps['label'];
  rules?: Rule[];
  prefix: MaskedInputProps['prefix'];
  placeholder?: string;
  maxCount: number;
  addButtonText: string;
  messages: {
    fieldRequired: string;
  };
}
const FormListLayout = ({
  mask,
  name,
  label,
  rules = [],
  prefix,
  maxCount,
  placeholder,
  addButtonText,
  messages,
}: FormListLayoutProps) => {
  const InputComponent = mask !== 'none' ? Input.Masked : Input;

  return (
    <Form.List name={name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item label={index === 0 ? label : ''} required key={field.key}>
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    message: messages.fieldRequired,
                  },
                  ...rules,
                ]}
                noStyle
              >
                <InputComponent
                  mask={mask}
                  prefix={prefix}
                  suffix={<DeleteOutlined className={styles.deleteIcon} onClick={() => remove(field.name)} />}
                  placeholder={placeholder}
                />
              </Form.Item>
            </Form.Item>
          ))}

          <Col xs={24} md={12} lg={8}>
            <Form.Item>
              <Button
                type="dashed"
                block
                onClick={() => add()}
                disabled={fields.length === maxCount}
                icon={<PlusOutlined />}
              >
                {addButtonText}
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Col>
        </>
      )}
    </Form.List>
  );
};

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

  return (
    <WrapperComponent>
      <Form<TBusinessCard>
        name="passport"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={() => onChange?.(form.getFieldsValue())}
        autoComplete="off"
        // disabled={formDisabled}
        // initialValues={{ ...passport }}
      >
        {/* <Row gutter={16}> */}
        <Col lg={12} md={24} xs={24}>
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

          <FormListLayout
            mask={MASKS.PHONE}
            name={FIELDS.phones}
            label={t('businessCards.form.fields.phones')}
            prefix={<PhoneOutlined />}
            placeholder={t('businessCards.form.placeholders.phones')}
            maxCount={MAX_PHONES_COUNT}
            addButtonText={t('businessCards.form.actions.addPhone')}
            messages={{
              fieldRequired: t('generic.form.rules.fieldRequired'),
            }}
          />

          <Divider />

          <FormListLayout
            mask={'none'}
            name={FIELDS.emails}
            label={t('businessCards.form.fields.emails')}
            rules={[
              {
                type: 'email',
                message: t('generic.form.rules.notValidEmail'),
              },
            ]}
            prefix={<MailOutlined />}
            placeholder={t('businessCards.form.placeholders.emails')}
            maxCount={MAX_EMAILS_COUNT}
            addButtonText={t('businessCards.form.actions.addEmail')}
            messages={{
              fieldRequired: t('generic.form.rules.fieldRequired'),
            }}
          />

          <Form.Item
            label={t('businessCards.form.fields.address')}
            name={FIELDS.address}
            // rules={[{ required: false, message: t('generic.form.rules.fieldRequired') }]}
          >
            <Input placeholder={t('businessCards.form.placeholders.address')} />
          </Form.Item>
        </Col>
        {/* </Row> */}
      </Form>
    </WrapperComponent>
  );
}
