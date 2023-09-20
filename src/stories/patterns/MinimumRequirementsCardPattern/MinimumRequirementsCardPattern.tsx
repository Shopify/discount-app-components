import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {MinimumRequirementsCard} from '../../../../src';
import {
  AppliesToType,
  DiscountClass,
  DiscountMethod,
  RequirementType,
} from '../../../constants';
import {CurrencyCode} from '@shopify/react-i18n';
import {MethodCard} from '../../../components/MethodCard';

export default function MinimumRequirementsCardPattern() {
  const [requirementType, setRequirementType] = useState<RequirementType>(
    RequirementType.None,
  );
  const [subtotal, setSubtotal] = useState<string>();
  const [quantity, setQuantity] = useState<string>();

  const [discountMethod, setDiscountMethod] = useState<DiscountMethod>(
    DiscountMethod.Code,
  );
  const [discountTitle, setDiscountTitle] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string>('');

  return (
    <Page>
      <MethodCard
        title="TEST 123"
        discountClass={DiscountClass.Product}
        discountMethod={{
          value: discountMethod,
          onChange: setDiscountMethod,
        }}
        discountTitle={{
          value: discountTitle,
          onChange: setDiscountTitle,
        }}
        discountCode={{
          value: discountCode,
          onChange: setDiscountCode,
        }}
      />
      <MinimumRequirementsCard
        appliesTo={AppliesToType.Products}
        currencyCode={CurrencyCode.Cad}
        requirementType={{
          value: requirementType,
          onChange: setRequirementType,
        }}
        subtotal={{
          value: subtotal,
          onChange: setSubtotal,
        }}
        quantity={{
          value: quantity,
          onChange: setQuantity,
        }}
        discountMethod={discountMethod}
        isRecurring
      />
    </Page>
  );
}
