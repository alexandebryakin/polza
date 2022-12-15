import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Form, FormProps, Col, Divider, Row, Space, notification, Modal } from 'antd';
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
import {
  MutationUpsertBusinessCardArgs,
  PublicationStatusEnum,
  ShowBusinessCardQuery,
  Status,
  useDeleteBusinessCardMutation,
  useUpsertBusinessCardMutation,
  VerificationStatusEnum,
} from '../../api/graphql.types';
import { onFailure } from '../../utils/onFailure';
import { useMutationError } from '../../hooks/useMutationError';
import { useNavigate } from 'react-router-dom';

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
  businessCard: ShowBusinessCardQuery['businessCard'] | undefined;
  onChange?: (values: Partial<MutationUpsertBusinessCardArgs>) => void;
  components?: {
    Wrapper?: React.FC;
  };
}

export const useRemoveBusinessCardConfirmationModal = () => {
  const [t] = useTranslation('common');
  const [deleteBusinessCard, { loading, error }] = useDeleteBusinessCardMutation();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const remove = (id: UUID | undefined | null) => {
    if (!id) return;

    Modal.confirm({
      title: t('businessCards.doYouReallyWantToRemoveBusinessCard'),
      icon: <ExclamationCircleOutlined />,
      content: t('businessCards.thisOperationWillPermanentlyRemoveYourBusinessCard'),
      async onOk() {
        const response = await deleteBusinessCard({ variables: { id } });

        onFailure(response.data?.deleteBusinessCard, () => {
          notification.error({
            message: t('businessCards.failedToDeleteBusinessCard'),
          });
        });

        if (response.data?.deleteBusinessCard?.status === Status.Success) {
          notification.success({
            message: t('businessCards.succededToDeleteBusinessCard'),
          });
          goBack();
        }
      },
    });
  };

  return {
    remove,
    loading,
    error,
  };
};

export default function BusinessCardForm({ businessCard, onChange, components }: BusinessCardFormProps) {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<MutationUpsertBusinessCardArgs>();
  const [upsertBusinessCard, { loading, error }] = useUpsertBusinessCardMutation();
  useMutationError(error);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const isNew = !businessCard?.id;

  const businessCardDefaultArgs: MutationUpsertBusinessCardArgs = React.useMemo(
    () => ({
      id: businessCard?.id,
      title: businessCard?.title || '',
      subtitle: businessCard?.subtitle || '',
      description: businessCard?.description,
      address: businessCard?.address,
      status: businessCard?.status || PublicationStatusEnum.Draft,
      phones: (businessCard?.phones || []).map((p) => p.number),
      emails: (businessCard?.emails || []).map((p) => p.email),
    }),
    [businessCard]
  );

  React.useEffect(() => {
    form.setFieldsValue(businessCardDefaultArgs);
    onChange?.(businessCardDefaultArgs);
  }, [businessCardDefaultArgs, form, onChange]);

  const onFinish: FormProps<MutationUpsertBusinessCardArgs>['onFinish'] = async (
    variables: MutationUpsertBusinessCardArgs
  ) => {
    const response = await upsertBusinessCard({
      variables: {
        ...variables,
        id: businessCard?.id,
      },
    });

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
        message: t(
          isNew ? 'businessCards.businessCardCreatedSuccessfully' : 'businessCards.businessCardUpdatedSuccessfully'
        ),
      });
      goBack();
    }
  };

  const removeBusinessCardConfirmationModal = useRemoveBusinessCardConfirmationModal();
  useMutationError(removeBusinessCardConfirmationModal.error);

  const handleDeleteBusinessCard = async () => {
    if (isNew) return;

    removeBusinessCardConfirmationModal.remove(businessCard.id);
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

        <Form.Item label={t('businessCards.form.fields.status')} name={FIELDS.status}>
          <Select
            options={[
              {
                label: t('businessCards.form.statuses.draft'),
                value: PublicationStatusEnum.Draft,
              },
              {
                label: t('businessCards.form.statuses.published'),
                value: PublicationStatusEnum.Published,
              },
            ]}
          />
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
            {!isNew && (
              <Button
                danger
                block
                icon={<DeleteOutlined />}
                onClick={handleDeleteBusinessCard}
                loading={removeBusinessCardConfirmationModal.loading}
              >
                {t('generic.actions.remove')}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </WrapperComponent>
  );
}
