import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {DiscountApplicationStrategyCard} from '../../../components/DiscountApplicationStrategyCard';
import {DiscountApplicationStrategy} from '../../../types';

export default function MethodCardPattern() {
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
      />
    </Page>
  );
}
