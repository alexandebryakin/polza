import { MenuProps } from 'antd';
import React from 'react';
import {
  RemoveOrAddToPersonalCollectionDorpdownOption,
  RemoveOwnBusinessCardDropdownOption,
} from '../components/DropdownOption';

import { usePersonalCollection } from './usePersonalCollection';

export interface CollectionModificationEvents {
  onBusinessCardRemovedFromCollection?: () => void;
  onBusinessCardAddedToCollection?: () => void;
}
interface IUseBusinessCardDropdownOptionsHookParams extends CollectionModificationEvents {
  businessCardId?: UUID;
  canModifyConnections: boolean;
  canRemove: boolean;
}

export const useBusinessCardDropdownOptions = ({
  businessCardId,
  canModifyConnections,
  canRemove,
  onBusinessCardRemovedFromCollection,
  onBusinessCardAddedToCollection,
}: IUseBusinessCardDropdownOptionsHookParams): MenuProps['items'] => {
  const personalCollection = usePersonalCollection();

  return React.useMemo(() => {
    const items: MenuProps['items'] = [];

    if (canModifyConnections && personalCollection) {
      items.push({
        key: 'modify-connections',
        label: (
          <RemoveOrAddToPersonalCollectionDorpdownOption
            onBusinessCardRemovedFromCollection={onBusinessCardRemovedFromCollection}
            onBusinessCardAddedToCollection={onBusinessCardAddedToCollection}
            businessCardId={businessCardId}
          />
        ),
      });
    }

    if (canRemove) {
      items.push({
        key: 'remove',
        label: <RemoveOwnBusinessCardDropdownOption businessCardId={businessCardId} />,
      });
    }

    return items;
  }, [
    canModifyConnections,
    personalCollection,
    canRemove,
    onBusinessCardRemovedFromCollection,
    onBusinessCardAddedToCollection,
    businessCardId,
  ]);
};
