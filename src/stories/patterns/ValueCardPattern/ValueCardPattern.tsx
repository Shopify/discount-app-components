import React from "react"
import { ValueCard } from "../../../components/ValueCard/ValueCard"
import { DiscountClass, DiscountValueType, PurchaseType } from "~/constants";
import { CurrencyCode } from "@shopify/react-i18n";
import {useField} from '@shopify/react-form';
import { Page } from "@shopify/polaris";

const ValueCardPattern = () => {
  const fixedAmountDiscountValue = useField('10');

  const percentageDiscountValue = useField('20');

  const discountValueType = useField(DiscountValueType.Percentage);

  const purchaseType = useField(PurchaseType.OneTimePurchase);

  const oncePerOrder = useField(true);

  const discountClass = DiscountClass.Product;
  const currencyCode = CurrencyCode.Usd;
  const sellsSubscriptions = true;
  const isCodeDiscount = true;

  return (
    <Page>
      <ValueCard
        fixedAmountDiscountValue={fixedAmountDiscountValue}
        percentageDiscountValue={percentageDiscountValue}
        discountValueType={discountValueType}
        purchaseType={purchaseType}
        oncePerOrder={oncePerOrder}
        discountClass={discountClass}
        currencyCode={currencyCode}
        sellsSubscriptions={sellsSubscriptions}
        isCodeDiscount={isCodeDiscount}
      />
    </Page>
  );
};

export default ValueCardPattern;
