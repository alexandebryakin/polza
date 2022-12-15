import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useMutationError } from '../../../hooks/useMutationError';
import { useRemoveBusinessCardConfirmationModal } from '../../BusinessCardForm/BusinessCardForm.component';
import DropdownOption from '../DropdownOption.component';

import styles from '../DropdownOption.module.scss';

interface RemoveOwnBusinessCardDropdownOptionProps {
  businessCardId: UUID | undefined | null;
}

export const RemoveOwnBusinessCardDropdownOption = ({ businessCardId }: RemoveOwnBusinessCardDropdownOptionProps) => {
  const [t] = useTranslation('common');

  const removeBusinessCardConfirmationModal = useRemoveBusinessCardConfirmationModal();
  useMutationError(removeBusinessCardConfirmationModal.error);

  return (
    <DropdownOption
      icon={<DeleteOutlined />}
      className={styles.dropdownOptionRemove}
      onClick={() => {
        removeBusinessCardConfirmationModal.remove(businessCardId);
      }}
    >
      {t('generic.actions.remove')}
    </DropdownOption>
  );
};
