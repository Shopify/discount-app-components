import React from 'react';
import {Card, ChoiceList, Text} from '@shopify/polaris';
import {mountWithApp, mockField} from 'tests/utilities';

import {PurchaseTypeCard} from '../PurchaseTypeCard';
import {PurchaseType} from '../../../constants';

function mountWithProps({
  purchaseType = PurchaseType.OneTimePurchase,
  onChange = jest.fn(),
} = {}) {
  const defaultProps = {
    purchaseType: mockField(purchaseType, {onChange}),
  };

  return <PurchaseTypeCard {...defaultProps} />;
}

describe('<PurchaseTypeList />', () => {
  it('shows the card title', () => {
    const purchaseTypeCard = mountWithApp(mountWithProps());

    expect(purchaseTypeCard).toContainReactComponent(Card);
    expect(purchaseTypeCard).toContainReactComponent(Text, {
      children: 'Purchase type',
    });
    expect(purchaseTypeCard).toContainReactComponent(ChoiceList, {
      title: 'Purchase type',
      titleHidden: true,
    });
  });

  it('sets the choice list selected item based on the props', () => {
    const purchaseTypeCard = mountWithApp(
      mountWithProps({purchaseType: PurchaseType.Subscription}),
    );

    expect(purchaseTypeCard).toContainReactComponent(ChoiceList, {
      selected: [PurchaseType.Subscription],
    });
  });

  it('shows choices', () => {
    const purchaseTypeCard = mountWithApp(mountWithProps());

    expect(purchaseTypeCard).toContainReactComponent(ChoiceList, {
      choices: [
        {
          label: 'One-time purchase',
          value: PurchaseType.OneTimePurchase,
        },
        {
          label: 'Subscription',
          value: PurchaseType.Subscription,
        },
        {
          label: 'Both',
          value: PurchaseType.Both,
        },
      ],
    });
  });

  it('calls purchaseType onchange when selection changes', () => {
    const onChangeSpy = jest.fn();
    const purchaseTypeCard = mountWithApp(
      mountWithProps({
        purchaseType: PurchaseType.OneTimePurchase,
        onChange: onChangeSpy,
      }),
    );

    purchaseTypeCard
      .find(ChoiceList)!
      .trigger('onChange', [PurchaseType.Subscription]);

    expect(onChangeSpy).toHaveBeenCalledWith(PurchaseType.Subscription);
  });
});
