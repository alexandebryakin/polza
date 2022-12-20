import { Form, Col, notification } from 'antd';

import { useTranslation } from 'react-i18next';
import { Button, Input } from 'antd';
import {
  MutationChangeCurrentUserPasswordArgs,
  Status,
  useChangeCurrentUserPasswordMutation,
} from '../../api/graphql.types';
import { useMutationError } from '../../hooks/useMutationError';
import { buildFields } from '../../utils/buildFields';
import { onFailure } from '../../utils/onFailure';

const FIELDS = buildFields<MutationChangeCurrentUserPasswordArgs>([
  'oldPassword',
  'newPassword',
  'newPasswordConfirmation',
]);

const OLD_PASSWORDS_MISMATCH_ERROR = 'old passwords mismatch';
const NEW_PASSWORDS_MISMATCH_ERROR = 'new passwords mismatch';

const ChangePassordForm = () => {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<MutationChangeCurrentUserPasswordArgs>();

  const [changePassword, { loading, error }] = useChangeCurrentUserPasswordMutation();
  useMutationError(error);

  const onFinish = async (variables: MutationChangeCurrentUserPasswordArgs) => {
    const response = await changePassword({ variables });

    const mapErrors = (err: string): string => {
      return (
        {
          [OLD_PASSWORDS_MISMATCH_ERROR]: t('profile.security.errors.oldPassportMismatch'),
          [NEW_PASSWORDS_MISMATCH_ERROR]: t('profile.security.errors.newPasswordConfirmationMismatch'),
        }[err] || t('generic.form.errors.invalidValue')
      );
    };

    onFailure<keyof MutationChangeCurrentUserPasswordArgs>(
      response.data?.changeCurrentUserPassword,
      (errorsFor, errors) => {
        const fieldData: FieldData<keyof MutationChangeCurrentUserPasswordArgs>[] = Object.entries(errors).map(
          ([field, fieldErrors]) => {
            return {
              name: field as keyof MutationChangeCurrentUserPasswordArgs,
              errors: Object.values(fieldErrors).map(mapErrors),
            };
          }
        );

        form.setFields(fieldData);
      }
    );

    if (response.data?.changeCurrentUserPassword?.status === Status.Success) {
      notification.success({
        message: t('profile.security.passwordWasChangedSuccessfully'),
      });
    }
  };

  return (
    <Form name="passwords" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      {/* <Col lg={8} md={18} xs={24}> */}
      <Form.Item
        label={t('profile.security.fields.oldPassword')}
        name={FIELDS.oldPassword}
        rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
      >
        <Input.Password />
      </Form.Item>
      {/* </Col> */}

      {/* <Col lg={8} md={18} xs={24}> */}
      <Form.Item
        label={t('profile.security.fields.newPassword')}
        name={FIELDS.newPassword}
        rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
      >
        <Input.Password />
      </Form.Item>
      {/* </Col> */}

      {/* <Col lg={8} md={18} xs={24}> */}
      <Form.Item
        label={t('profile.security.fields.confirmNewPassword')}
        name={FIELDS.newPasswordConfirmation}
        rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
      >
        <Input.Password />
      </Form.Item>
      {/* </Col> */}

      {/* <Col lg={8} md={18} xs={24}> */}
      <Button type="primary" htmlType="submit" block loading={loading}>
        {t('generic.actions.update')}
      </Button>
      {/* </Col> */}
    </Form>
  );
};

export default ChangePassordForm;
