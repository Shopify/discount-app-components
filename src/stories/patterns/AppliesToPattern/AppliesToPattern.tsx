import React, {useState, useEffect} from 'react';
import {
  Page,
  Modal,
  HorizontalStack,
  Button,
  ChoiceList,
} from '@shopify/polaris';
import {AppliesTo} from '../../../components/AppliesTo';

import {Field} from '../../../types';
import {AppliesToEligibility} from '../../../constants';
import {VisibleModal} from '../../constants';
import {ProductOrCollectionResource} from '../../../types';
import {ALL_COLLECTIONS_IN_SHOP, ALL_PRODUCTS_IN_SHOP} from '../../../data';

export function AppliesToPattern() {
  const [visibleModal, setVisibleModal] = useState<VisibleModal>(
    VisibleModal.None,
  );

  const [selectedProducts, setSelectedProducts] =
    useState<ProductOrCollectionResource[]>(ALL_PRODUCTS_IN_SHOP);
  const [selectedCollections, setSelectedCollections] = useState<
    ProductOrCollectionResource[]
  >(ALL_COLLECTIONS_IN_SHOP);
  const selectedProductsField = {
    value: selectedProducts,
    onChange: setSelectedProducts,
  };

  const selectedCollectionsField = {
    value: selectedCollections,
    onChange: setSelectedCollections,
  };

  const [eligibility, setEligibility] = useState<AppliesToEligibility>(
    AppliesToEligibility.Products,
  );

  return (
    <Page>
      <AppliesTo
        selectedItems={
          eligibility === AppliesToEligibility.Products
            ? selectedProductsField
            : selectedCollectionsField
        }
        productSelector={
          <ItemModal
            eligibility={eligibility}
            items={ALL_PRODUCTS_IN_SHOP}
            selectedItems={selectedProductsField}
            open={visibleModal === VisibleModal.Products}
            toggleModal={() =>
              setVisibleModal((visibleModal) =>
                visibleModal === VisibleModal.None
                  ? VisibleModal.Products
                  : VisibleModal.None,
              )
            }
          />
        }
        collectionSelector={
          <ItemModal
            eligibility={eligibility}
            items={ALL_COLLECTIONS_IN_SHOP}
            selectedItems={selectedCollectionsField}
            open={visibleModal === VisibleModal.Products}
            toggleModal={() =>
              setVisibleModal((visibleModal) =>
                visibleModal === VisibleModal.None
                  ? VisibleModal.Products
                  : VisibleModal.None,
              )
            }
          />
        }
        eligibility={{
          value: eligibility,
          onChange: setEligibility,
        }}
      />
    </Page>
  );
}

export function ItemModal({
  eligibility,
  items,
  selectedItems,
  open,
  toggleModal,
}: {
  eligibility: AppliesToEligibility;
  items: ProductOrCollectionResource[];
  selectedItems: Field<ProductOrCollectionResource[]>;
  open: boolean;
  toggleModal(): void;
}) {
  const [selected, setSelected] = useState<ProductOrCollectionResource[]>(
    () => selectedItems.value,
  );
  useEffect(() => setSelected(selectedItems.value), [selectedItems.value]);

  const handleClose = () => {
    selectedItems.onChange(selected);
    toggleModal();
  };

  const resetModal = () => {
    setSelected(selectedItems.value);
    toggleModal();
  };

  return (
    <Modal
      activator={
        <HorizontalStack>
          <Button onClick={toggleModal}>Browse</Button>
        </HorizontalStack>
      }
      open={open}
      onClose={handleClose}
      title={
        eligibility === AppliesToEligibility.Products
          ? 'Select products'
          : 'Select collections'
      }
      primaryAction={{
        content: 'Confirm',
        onAction: handleClose,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: resetModal,
        },
      ]}
      sectioned
    >
      <ChoiceList
        allowMultiple
        title={
          eligibility === AppliesToEligibility.Products
            ? 'Products'
            : 'Collections'
        }
        choices={items.map((item) => ({
          label: item.title,
          value: item.id,
        }))}
        selected={selected.map((item) => item.id)}
        onChange={(nextValue: string[]) => {
          setSelected(
            nextValue.map(
              (id) =>
                items.find(
                  (item: ProductOrCollectionResource) => item.id === id,
                )!,
            ),
          );
        }}
      />
    </Modal>
  );
}
