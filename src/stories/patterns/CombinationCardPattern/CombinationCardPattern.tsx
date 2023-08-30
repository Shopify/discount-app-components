import React, {useState} from 'react';
import {Page} from '@shopify/polaris';
import {CombinationCard, DiscountClass} from '../../..';
import {CombinableDiscountTypes} from '../../../types';

interface Props {
  discountClass: DiscountClass;
  discountDescriptor: string;
}

export default function CombinationCardPattern({
  discountClass,
  discountDescriptor,
}: Props) {
  const [combinesWith, setCombinesWith] = useState<CombinableDiscountTypes>({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false,
  });

  return (
    <Page>
      <CombinationCard
        combinableDiscountTypes={{
          value: combinesWith,
          onChange: setCombinesWith,
        }}
        combinableDiscountCounts={{
          orderDiscountsCount: 0,
          productDiscountsCount: 3,
          shippingDiscountsCount: 0,
        }}
        discountClass={discountClass}
        discountDescriptor={discountDescriptor}
      />
    </Page>
  );
}
