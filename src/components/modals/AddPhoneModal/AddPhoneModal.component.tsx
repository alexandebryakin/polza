import { PhoneOutlined } from '@ant-design/icons';
import { Form, FormProps, Modal, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'antd';
import { CreatePhoneMutationVariables, Phone, Status, useCreatePhoneMutation } from '../../../api/graphql.types';
import { useUserInfoContext } from '../../../contexts/userInfo/userInfoContext';
import { useMutationError } from '../../../hooks/useMutationError';
import { Toggler } from '../../../hooks/useToggler';
import { onFailure } from '../../../utils/onFailure';
import { MaskedInput } from 'antd-mask-input';

interface AddPhoneModalProps {
  toggler: Toggler;
}

const FIELDS = {
  number: 'number',
};

export const MASKS = {
  PHONE: '+7(000)000-00-00',
};
const PHONE_NUM_LENGTH = 11;
const REGEX_DIGITS_ONLY = /\D/g;

const digitsOnly = (str?: string) => (str || '').replace(REGEX_DIGITS_ONLY, '');

const AddPhoneModal = ({ toggler }: AddPhoneModalProps) => {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<Phone>();
  const [createPhone, { loading, error }] = useCreatePhoneMutation();

  useMutationError(error);

  const { refetchUser } = useUserInfoContext();

  const onFinish: FormProps<Phone>['onFinish'] = async (variables) => {
    variables.number = digitsOnly(variables.number);

    const response = await createPhone({ variables });

    onFailure<keyof CreatePhoneMutationVariables>(response.data?.createPhone, (errorsFor, errors) => {
      const fieldData: FieldData<keyof CreatePhoneMutationVariables>[] = Object.entries(errors).map(
        ([field, fieldErrors]) => {
          const HAS_ALREADY_BEEN_TAKEN = 'has already been taken';

          return {
            name: field as keyof CreatePhoneMutationVariables,
            errors: Object.values(fieldErrors).map((msg) => {
              return msg === HAS_ALREADY_BEEN_TAKEN
                ? t('modals.addPhone.form.errors.phoneAlreadyTaken')
                : t('modals.addPhone.form.errors.incorrectPhone');
            }),
          };
        }
      );

      form.setFields(fieldData);
    });

    if (response.data?.createPhone?.status === Status.Success) {
      refetchUser();
      toggler.off();
      form.resetFields();
      notification.success({
        message: t('modals.addPhone.form.phoneAddedSuccessfully'),
      });
    }
  };

  return (
    <Modal
      open={toggler.isOn}
      title={t('businessCards.form.actions.addPhone')}
      onCancel={toggler.off}
      centered
      footer={[
        <Button key="back" onClick={toggler.off}>
          {t('generic.actions.cancel')}
        </Button>,

        <Button key="submit" type="primary" loading={loading} onClick={form.submit}>
          {t('generic.actions.add')}
        </Button>,
      ]}
    >
      <Form<Phone>
        name="phone"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        //
      >
        <Form.Item
          label={t('modals.addPhone.form.fields.phone')}
          name={FIELDS.number}
          rules={[
            { required: true, message: t('generic.form.rules.fieldRequired') },
            {
              validator: (_rule, value) => {
                return digitsOnly(value).length === PHONE_NUM_LENGTH
                  ? Promise.resolve()
                  : Promise.reject(new Error(t('modals.addPhone.form.errors.incorrectPhone')));
              },
            },
          ]}
        >
          <MaskedInput mask={MASKS.PHONE} prefix={<PhoneOutlined />} placeholder={MASKS.PHONE} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPhoneModal;
