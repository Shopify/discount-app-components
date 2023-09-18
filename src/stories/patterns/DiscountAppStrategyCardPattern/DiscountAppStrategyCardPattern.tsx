import React from 'react';

import {Page} from '@shopify/polaris';
import {DiscountAppStrategyCard} from '../../../components/DiscountAppStrategyCard';
import {DiscountApplicationStrategy} from '../../../types';

export default function MethodCardPattern() {
  return (
    <Page>
      <DiscountAppStrategyCard strategy={DiscountApplicationStrategy.First} />
    </Page>
  );
}
