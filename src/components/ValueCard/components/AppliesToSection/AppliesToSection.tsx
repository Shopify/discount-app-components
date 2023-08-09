import {LegacyCard, ChoiceList, LegacyStack} from '@shopify/polaris';
import type {Field} from '@shopify/react-form';
import {useI18n} from '@shopify/react-i18n';

import {ResourcePickerActivator} from 'shared/components/ResourcePickerActivator';
import {AppliesTo} from 'sections/Discounts/DiscountDetails/types';
import {ProductResourcePicker} from 'shared/components/ProductResourcePicker';
import type {Collection} from 'shared/components/CollectionResourcePicker';
import {CollectionResourcePicker} from 'shared/components/CollectionResourcePicker';
import type {ProductDescriptor} from 'utilities/resource-picker';
import {
  adjustProductsFieldDescriptor,
  orderResourceByGidAsc,
  updateOrderResourceFieldDescriptorByGidAsc,
} from 'sections/Discounts/DiscountDetails/shared';
import {
  SelectedProductVariantsList,
  SelectedCollectionsList,
} from 'sections/Discounts/DiscountDetails/components';

interface Props {
  appliesTo: Field<AppliesTo>;
  selectedCollections: Field<Collection[]>;
  selectedProductVariants: Field<ProductDescriptor[]>;
  isSubscriptionPurchase: boolean;
}

export function AppliesToSection({
  appliesTo,
  selectedCollections,
  selectedProductVariants,
  isSubscriptionPurchase,
}: Props) {
  const [i18n] = useI18n();

  const scope = isSubscriptionPurchase ? 'subscription' : 'oneTime';
  const choices = [
    {
      value: AppliesTo.Collections,
      label: i18n.translate('specificCollections', {scope}),
    },
    {
      value: AppliesTo.Products,
      label: i18n.translate('specificProducts', {scope}),
    },
  ];

  const productResourcePickerMarkup = appliesTo.value ===
    AppliesTo.Products && (
    <>
      <ResourcePickerActivator
        labelHidden
        textFieldID="selectedProductDescriptors"
        resourcesName={i18n.translate('productResourcesName')}
        error={selectedProductVariants.error}
        renderResourcePicker={({open, onClose, searchQuery}) => (
          <ProductResourcePicker
            open={open}
            onClose={onClose}
            initialSearchQuery={searchQuery}
            selectedProductVariants={selectedProductVariants.value}
            onSelectedProductVariantsUpdate={adjustProductsFieldDescriptor(
              selectedProductVariants,
            )}
            showVariants
            showDraft
            showDraftBadge
            showArchived={false}
          />
        )}
      />

      <SelectedProductVariantsList
        selectedProductVariants={orderResourceByGidAsc(
          selectedProductVariants.value,
        )}
        onSelectedProductVariantsUpdate={adjustProductsFieldDescriptor(
          selectedProductVariants,
        )}
      />
    </>
  );

  const collectionResourcePickerMarkup = appliesTo.value ===
    AppliesTo.Collections && (
    <>
      <ResourcePickerActivator
        labelHidden
        textFieldID="selectedCollections"
        resourcesName={i18n.translate('collectionResourcesName')}
        error={selectedCollections.error}
        renderResourcePicker={({open, onClose, searchQuery}) => (
          <CollectionResourcePicker
            open={open}
            initialSearchQuery={searchQuery}
            selectedCollections={selectedCollections.value}
            onSelectedCollectionsUpdate={updateOrderResourceFieldDescriptorByGidAsc(
              selectedCollections,
            )}
            onClose={onClose}
          />
        )}
      />

      <SelectedCollectionsList
        selectedCollections={orderResourceByGidAsc(selectedCollections.value)}
        onSelectedCollectionsUpdate={updateOrderResourceFieldDescriptorByGidAsc(
          selectedCollections,
        )}
      />
    </>
  );

  return (
    <LegacyCard.Section title={i18n.translate('title')}>
      <LegacyStack vertical>
        <ChoiceList
          title={i18n.translate('title')}
          titleHidden
          selected={[appliesTo.value]}
          choices={choices}
          onChange={(appliesToList: string[]) =>
            appliesTo.onChange(appliesToList[0] as AppliesTo)
          }
        />
        {productResourcePickerMarkup}
        {collectionResourcePickerMarkup}
      </LegacyStack>
    </LegacyCard.Section>
  );
}
