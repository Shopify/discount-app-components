import React, {useState} from 'react';
import {ValueCard} from '../../../components/ValueCard/ValueCard';
import {
  DiscountClass,
  DiscountValueType,
  PurchaseType,
  AppliesToEligibility,
} from '../../../constants';
import {ProductOrCollectionResource} from '../../../types';
import {ALL_COLLECTIONS_IN_SHOP, ALL_PRODUCTS_IN_SHOP} from '../../../data';
import {ItemModal} from '../AppliesToPattern/AppliesToPattern';
import {CurrencyCode} from '@shopify/react-i18n';
import {Page} from '@shopify/polaris';
import {VisibleModal} from '../../constants';
const ValueCardPattern = () => {
  const [fixedAmountDiscountValue, setFixedAmountDiscountValue] =
    useState('10');

  const [percentageDiscountValue, setPercentageDiscountValue] = useState('20');

  const [discountValueType, setDiscountValueType] = useState(
    DiscountValueType.Percentage,
  );

  const [purchaseType, setPurchaseType] = useState(
    PurchaseType.OneTimePurchase,
  );

  const [oncePerOrder, setOncePerOrder] = useState(true);

  const discountClass = DiscountClass.Product;
  const currencyCode = CurrencyCode.Usd;
  const sellsSubscriptions = true;
  const isCodeDiscount = true;

  // Value card
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
      <ValueCard
        fixedAmountDiscountValue={{
          value: fixedAmountDiscountValue,
          onChange: setFixedAmountDiscountValue,
        }}
        percentageDiscountValue={{
          value: percentageDiscountValue,
          onChange: setPercentageDiscountValue,
        }}
        discountValueType={{
          value: discountValueType,
          onChange: setDiscountValueType,
        }}
        purchaseType={{
          value: purchaseType,
          onChange: setPurchaseType,
        }}
        oncePerOrder={{
          value: oncePerOrder,
          onChange: setOncePerOrder,
        }}
        discountClass={discountClass}
        currencyCode={currencyCode}
        sellsSubscriptions={sellsSubscriptions}
        isCodeDiscount={isCodeDiscount}
        eligibility={{value: eligibility, onChange: setEligibility}}
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
      />
    </Page>
  );
};

export default ValueCardPattern;
