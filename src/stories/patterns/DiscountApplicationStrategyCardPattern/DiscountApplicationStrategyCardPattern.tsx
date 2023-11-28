import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {DiscountApplicationStrategyCard} from '../../../components/DiscountApplicationStrategyCard';
import {DiscountClass, DiscountApplicationStrategy} from '../../../constants';

interface Props {
  discountClass: DiscountClass;
}

export default function DiscountApplicationStrategyCardPattern({
  discountClass,
}: Props) {
  const [strategy, setStrategy] = useState<DiscountApplicationStrategy>(
    DiscountApplicationStrategy.First,
  );
  return (
    <Page>
      <DiscountApplicationStrategyCard
        strategy={{
          value: strategy,
          onChange: setStrategy,
        }}
        discountClass={discountClass}
      />
    </Page>
  );
}
