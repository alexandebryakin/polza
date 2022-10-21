import { MailOutlined } from '@ant-design/icons';
import { Form, FormProps, Modal, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../antd';
import { CreateEmailMutationVariables, Status, useCreateEmailMutation } from '../../../api/graphql.types';
import { useUserInfoContext } from '../../../contexts/userInfo/userInfoContext';
import { Toggler } from '../../../hooks/useToggler';
import { onFailure } from '../../../utils/onFailure';

interface AddEmailModalProps {
  toggler: Toggler;
}

const FIELDS = {
  email: 'email',
};

const AddEmailModal = ({ toggler }: AddEmailModalProps) => {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<CreateEmailMutationVariables>();
  const [createEmail, { loading, error }] = useCreateEmailMutation();

  const { refetchUser } = useUserInfoContext();

  const onFinish: FormProps<CreateEmailMutationVariables>['onFinish'] = async (variables) => {
    const response = await createEmail({ variables });

    onFailure<keyof CreateEmailMutationVariables>(response.data?.createEmail, (errorsFor, errors) => {
      const fieldData: FieldData<keyof CreateEmailMutationVariables>[] = Object.entries(errors).map(
        ([field, fieldErrors]) => {
          const HAS_ALREADY_BEEN_TAKEN = 'has already been taken';

          return {
            name: field as keyof CreateEmailMutationVariables,
            errors: Object.values(fieldErrors).map((msg) => {
              return msg === HAS_ALREADY_BEEN_TAKEN
                ? t('modals.addEmail.form.errors.emailAlreadyTaken')
                : t('modals.addEmail.form.errors.incorrectEmail');
            }),
          };
        }
      );

      form.setFields(fieldData);
    });

    if (response.data?.createEmail?.status === Status.Success) {
      refetchUser();
      toggler.off();
      form.resetFields();
      notification.success({
        message: t('modals.addEmail.form.emailAddedSuccessfully'),
      });
    }
  };

  return (
    <Modal
      open={toggler.isOn}
      title={t('businessCards.form.actions.addEmail')}
      onCancel={toggler.off}
      footer={[
        <Button key="back" onClick={toggler.off}>
          {t('generic.actions.cancel')}
        </Button>,

        <Button key="submit" type="primary" loading={loading} onClick={form.submit}>
          {t('generic.actions.add')}
        </Button>,
      ]}
    >
      <Form<CreateEmailMutationVariables>
        name="email"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        //
      >
        <Form.Item
          label={t('modals.addEmail.form.fields.email')}
          name={FIELDS.email}
          rules={[{ required: true, type: 'email', message: t('modals.addEmail.form.errors.incorrectEmail') }]}
        >
          <Input prefix={<MailOutlined />} placeholder={t('modals.addEmail.form.placeholders.email')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmailModal;
