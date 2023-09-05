import React from 'react';
import {List} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import {AppliesToPurchaseType} from '../AppliesToPurchaseType';
import {PurchaseType} from '../../../../../constants';

describe('<AppliesToPurchaseType />', () => {
  it('renders when purchase type is PurchaseType.Both', () => {
    const activeDates = mountWithApp(
      <AppliesToPurchaseType purchaseType={PurchaseType.Both} />,
    );

    expect(activeDates).toContainReactComponent(List.Item, {
      children: 'Applies to subscriptions and one-time purchases',
    });
  });

  it('renders when purchase type is PurchaseType.OneTimePurchase', () => {
    const activeDates = mountWithApp(
      <AppliesToPurchaseType purchaseType={PurchaseType.OneTimePurchase} />,
    );

    expect(activeDates).toContainReactComponent(List.Item, {
      children: 'Applies to one-time purchases',
    });
  });

  it('renders when purchase type is PurchaseType.Subscription', () => {
    const activeDates = mountWithApp(
      <AppliesToPurchaseType purchaseType={PurchaseType.Subscription} />,
    );

    expect(activeDates).toContainReactComponent(List.Item, {
      children: 'Applies to subscription purchases',
    });
  });
});
