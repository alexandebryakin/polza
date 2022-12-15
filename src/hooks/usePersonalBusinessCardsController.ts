import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAddToCollectionMutation,
  useGetBusinessCardsQuery,
  useRemoveFromCollectionMutation,
} from '../api/graphql.types';
import { CollectionModificationEvents } from './useBusinessCardDropdownOptions';
import { useMutationError } from './useMutationError';
import { usePersonalCollection } from './usePersonalCollection';

interface PersonalBusinessCardsControllerArgs extends CollectionModificationEvents {}

export const usePersonalBusinessCardsController = ({
  onBusinessCardAddedToCollection,
  onBusinessCardRemovedFromCollection,
}: PersonalBusinessCardsControllerArgs) => {
  const [t] = useTranslation('common');

  const personalCollection = usePersonalCollection();
  const { data: personalBusinessCardsData, refetch } = useGetBusinessCardsQuery({
    variables: {
      collectionIds: personalCollection?.id && [personalCollection.id],
    },
  });

  const [addToCollectionMutation, { loading, error }] = useAddToCollectionMutation();
  useMutationError(error, t('businessCards.anErrorOccurredWhileAddingBusinessCardToConnections'));

  const isAddedToPersonalCollection = React.useCallback(
    (businessCardId: UUID | undefined | null): boolean => {
      return (personalBusinessCardsData?.businessCards || []).some((bc) => bc.id === businessCardId);
    },
    [personalBusinessCardsData?.businessCards]
  );

  const addToPersonalCollection = React.useCallback(
    async (businessCardId: UUID | undefined | null) => {
      if (isAddedToPersonalCollection(businessCardId)) return;

      await addToCollectionMutation({
        variables: {
          collectionId: personalCollection?.id || '',
          businessCardIds: businessCardId ? [businessCardId] : [],
        },
      });
      refetch();
      onBusinessCardAddedToCollection?.();
    },
    [
      isAddedToPersonalCollection,
      addToCollectionMutation,
      personalCollection?.id,
      refetch,
      onBusinessCardAddedToCollection,
    ]
  );

  const [removeFromCollectionMutation, { loading: isRemovingFromCollection, error: removalError }] =
    useRemoveFromCollectionMutation();
  useMutationError(removalError, t('businessCards.anErrorOccurredWhileRemovingBusinessCardFromConnections'));

  const removeFromPersonalCollection = React.useCallback(
    async (businessCardId: UUID | undefined | null) => {
      if (!isAddedToPersonalCollection(businessCardId)) return;

      await removeFromCollectionMutation({
        variables: {
          collectionId: personalCollection?.id || '',
          businessCardIds: businessCardId ? [businessCardId] : [],
        },
      });

      onBusinessCardRemovedFromCollection?.();
      refetch();
    },
    [
      isAddedToPersonalCollection,
      removeFromCollectionMutation,
      personalCollection?.id,
      onBusinessCardRemovedFromCollection,
      refetch,
    ]
  );

  return {
    isAddedToPersonalCollection,
    addToPersonalCollection,
    removeFromPersonalCollection,
  };
};
