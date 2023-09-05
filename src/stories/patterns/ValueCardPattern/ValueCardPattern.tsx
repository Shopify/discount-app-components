import React, {useState} from 'react';
import {ValueCard} from '../../../components/ValueCard/ValueCard';
import {
  DiscountClass,
  DiscountValueType,
  PurchaseType,
} from '../../../constants';
import {CurrencyCode} from '@shopify/react-i18n';
import {Page} from '@shopify/polaris';

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
      />
    </Page>
  );
};

export default ValueCardPattern;
