import { notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const useMutationError = (error: unknown, message?: string) => {
  const [t] = useTranslation('common');

  React.useEffect(() => {
    if (!error) return;

    console.error(error);

    notification.error({
      message: message || t('generic.form.errors.unknownErrorAccured'),
    });
  }, [error, message, t]);
};
