import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {MethodCard} from '../../../components/MethodCard';
import {DiscountClass, DiscountMethod} from '../../../constants';

export default function MethodCardPattern() {
  const [discountMethod, setDiscountMethod] = useState<DiscountMethod>(
    DiscountMethod.Automatic,
  );
  const [discountTitle, setDiscountTitle] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string>('');

  return (
    <Page>
      <MethodCard
        title="TEST 123"
        discountClass={DiscountClass.Shipping}
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
    </Page>
  );
}
