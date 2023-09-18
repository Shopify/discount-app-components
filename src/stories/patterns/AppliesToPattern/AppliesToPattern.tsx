import React, {useState, useEffect} from 'react';
import {
  Page,
  Modal,
  HorizontalStack,
  Button,
  ChoiceList,
} from '@shopify/polaris';
import {AppliesTo} from '../../../components/AppliesTo';
import {
  type Product,
  type Collection,
  FulfillmentServiceType,
  ProductVariantInventoryManagement,
  ProductVariantInventoryPolicy,
  WeightUnit,
  ProductStatus,
} from '@shopify/app-bridge/actions/ResourcePicker';

import {Field} from '../../../types';
import {AppliesToType} from '../../../constants';

enum VisibleModal {
  None,
  Products,
  Collections,
}

const ALL_PRODUCTS_IN_SHOP = [
  {
    id: '1',
    availablePublicationCount: 5,
    createdAt: '2022-01-01T00:00:00Z',
    descriptionHtml:
      '<p>Experience the joy of the universe with our Galactic Giggles T-Shirt!</p>',
    handle: 'galactic-giggles',
    hasOnlyDefaultVariant: false,
    images: [
      {
        id: '1',
        src: 'https://example.com/image1.jpg',
        originalSrc: 'https://example.com/image1.jpg',
        altText: 'Galactic Giggles T-Shirt Image',
      },
    ],
    options: [
      {
        id: '1',
        name: 'Color',
        position: 1,
        values: ['Cosmic Purple', 'Stellar Blue', 'Galactic Green'],
      },
      {
        id: '2',
        name: 'Size',
        position: 2,
        values: ['S', 'M', 'L', 'XL'],
      },
    ],
    productType: 'T-Shirt',
    publishedAt: '2022-01-02T00:00:00Z',
    tags: ['galactic', 'fun', 't-shirt'],
    templateSuffix: null,
    title: 'Galactic Giggles T-Shirt',
    totalInventory: 100,
    tracksInventory: true,
    variants: [
      {
        id: '1',
        availableForSale: true,
        barcode: '1234567890123',
        compareAtPrice: null,
        createdAt: '2022-01-01T00:00:00Z',
        displayName: 'Galactic Giggles T-Shirt - Cosmic Purple / S',
        fulfillmentService: {
          id: '1',
          inventoryManagement: true,
          productBased: true,
          serviceName: 'Manual',
          type: FulfillmentServiceType.Manual,
        },
        image: {
          id: '1',
          src: 'https://example.com/image1.jpg',
          originalSrc: 'https://example.com/image1.jpg',
          altText: 'Galactic Giggles T-Shirt Image',
          width: 500,
          height: 500,
        },
        inventoryItem: {
          id: '1',
        },
        inventoryManagement: ProductVariantInventoryManagement.Shopify,
        inventoryPolicy: ProductVariantInventoryPolicy.Deny,
        inventoryQuantity: 50,
        position: 1,
        price: '19.99',
        product: {
          id: '1',
          title: 'Galactic Giggles T-Shirt',
        },
        requiresShipping: true,
        selectedOptions: [
          {
            value: 'Cosmic Purple',
          },
          {
            value: 'S',
          },
        ],
        sku: 'GG-CP-S',
        taxable: true,
        title: 'Cosmic Purple / S',
        weight: null,
        weightUnit: WeightUnit.Kilograms,
        updatedAt: '2022-01-02T00:00:00Z',
      },
    ],
    vendor: 'Fun Universe',
    updatedAt: '2022-01-02T00:00:00Z',
    status: ProductStatus.Active,
  },
];

export default function AppliesToPattern() {
  const [visibleModal, setVisibleModal] = useState<VisibleModal>(
    VisibleModal.None,
  );

  const [selectedProducts, setSelectedProducts] =
    useState<Product[]>(ALL_PRODUCTS_IN_SHOP);

  const selectedProductsField = {
    value: selectedProducts,
    onChange: setSelectedProducts,
  };

  const [eligibility, setEligibility] = useState<AppliesToType>(
    AppliesToType.Products,
  );

  return (
    <Page>
      <AppliesTo
        selectedItems={selectedProductsField}
        itemSelector={
          <ProductModal
            products={ALL_PRODUCTS_IN_SHOP}
            selectedProducts={selectedProductsField}
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
          value: AppliesToType.Products,
          onChange: setEligibility,
        }}
      />
    </Page>
  );
}

function ProductModal({
  products,
  selectedProducts,
  open,
  toggleModal,
}: {
  products: Product[];
  selectedProducts: Field<Product[]>;
  open: boolean;
  toggleModal(): void;
}) {
  const [selected, setSelected] = useState<Product[]>(
    () => selectedProducts.value,
  );
  useEffect(
    () => setSelected(selectedProducts.value),
    [selectedProducts.value],
  );

  const handleClose = () => {
    selectedProducts.onChange(selected);
    toggleModal();
  };

  const resetModal = () => {
    setSelected(selectedProducts.value);
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
      title="Select customers"
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
        title="Select customers"
        choices={products.map((product) => ({
          label: product.title,
          value: product.id,
        }))}
        selected={selected.map((product) => product.id)}
        onChange={(nextValue: string[]) => {
          setSelected(
            nextValue.map(
              (id) => products.find((product) => product.id === id)!,
            ),
          );
        }}
      />
    </Modal>
  );
}
