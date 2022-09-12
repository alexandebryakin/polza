import { InboxOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { RcFile } from 'antd/lib/upload';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../antd';
import {
  MutationUpsertPassportArgs,
  Status,
  UpsertPassportMutationVariables,
  useUpsertPassportMutation,
} from '../../api/graphql.types';
import styles from './PassportForm.module.scss';
import { buildFields } from '../../utils/buildFields';
import { onFailure } from '../../utils/onFailure';

const FIELDS = buildFields<UpsertPassportMutationVariables>([
  'firstName',
  'lastName',
  'middleName',
  'code',
  'number',
  'image',
]);

const dontUploadAutomatically = false;

function PassportForm() {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<UpsertPassportMutationVariables>();
  const [image, setImage] = React.useState<RcFile>();
  const [upsertPassport, { data, loading, error }] = useUpsertPassportMutation();

  const [formDisabled, setFormDisabled] = React.useState(false);

  // TODO:
  //   - add fetch passport info
  //   - display notification if paasport is not verified based on that info
  //   - disable form based on verificationStatus

  const onFinish = async (variables: MutationUpsertPassportArgs) => {
    if (!image) {
      form.setFields([
        {
          name: 'image',
          errors: [t('profile.passport.rules.fieldRequired')],
        },
      ]);
      return;
    }

    variables.image = image;

    const response = await upsertPassport({ variables });

    onFailure<keyof UpsertPassportMutationVariables>(response.data?.upsertPassport, (errorsFor, errors) => {
      const fieldData: FieldData<keyof UpsertPassportMutationVariables>[] = Object.entries(errors).map(
        ([field, fieldErrors]) => {
          return {
            name: field as keyof UpsertPassportMutationVariables,
            errors: [t('profile.passport.errors.invalidValue')],
          };
        }
      );

      form.setFields(fieldData);
    });

    if (response.data?.upsertPassport?.status === Status.Success) {
      setFormDisabled(true);
    }
  };

  return (
    <Form name="passport" form={form} layout="vertical" onFinish={onFinish} autoComplete="off" disabled={formDisabled}>
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

      <Form.Item
        label={t('profile.passport.fields.image')}
        name={FIELDS.image}
        rules={[{ required: true, message: t('profile.passport.rules.fieldRequired') }]}
      >
        <Dragger
          multiple={false}
          maxCount={1}
          accept="image/*"
          disabled={formDisabled}
          beforeUpload={(file) => {
            setImage(file);
            return dontUploadAutomatically;
          }}
          onRemove={() => setImage(undefined)}
          fileList={image ? [image] : []}
          onDrop={(e) => {
            console.log('Dropped files', e.dataTransfer.files);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>

          <p className="ant-upload-text">{t('profile.passport.clickOrDragFile')}</p>
        </Dragger>
      </Form.Item>

      <Button
        className={styles.saveButton}
        type="primary"
        htmlType="submit"
        // block
        loading={loading}
      >
        {t('generic.actions.save')}
      </Button>
    </Form>
  );
}

export default PassportForm;
