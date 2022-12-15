import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { CollectionModificationEvents } from '../../../hooks/useBusinessCardDropdownOptions';
import { usePersonalBusinessCardsController } from '../../../hooks/usePersonalBusinessCardsController';
import DropdownOption from '../DropdownOption.component';

interface RemoveOrAddToPersonalCollectionDorpdownOptionProps extends CollectionModificationEvents {
  businessCardId: UUID | undefined | null;
}

export const RemoveOrAddToPersonalCollectionDorpdownOption = ({
  onBusinessCardRemovedFromCollection,
  onBusinessCardAddedToCollection,
  businessCardId,
}: RemoveOrAddToPersonalCollectionDorpdownOptionProps) => {
  const [t] = useTranslation('common');

  const controller = usePersonalBusinessCardsController({
    onBusinessCardRemovedFromCollection,
    onBusinessCardAddedToCollection,
  });

  const isAddedToPersonalCollection = controller.isAddedToPersonalCollection(businessCardId);
  return (
    <DropdownOption
      icon={isAddedToPersonalCollection ? <MinusOutlined /> : <PlusOutlined />}
      onClick={() =>
        isAddedToPersonalCollection
          ? controller.removeFromPersonalCollection(businessCardId)
          : controller.addToPersonalCollection(businessCardId)
      }
    >
      {isAddedToPersonalCollection ? t('businessCards.removeFromConnections') : t('businessCards.addToConnections')}
    </DropdownOption>
  );
};
