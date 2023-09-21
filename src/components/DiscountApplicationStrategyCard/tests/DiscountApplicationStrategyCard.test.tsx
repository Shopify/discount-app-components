import React from 'react';
import {ChoiceList, TextField} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {DiscountApplicationStrategyCard} from '../DiscountApplicationStrategyCard';
import {DiscountApplicationStrategy} from '../../../types';

describe('<DiscountApplicationStrategyCard />', () => {
  const mockProps = {
    strategy: mockField(DiscountApplicationStrategy.First),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a DiscountApplicationStrategyCard', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard {...mockProps} />,
    );

    expect(methodCard).not.toContainReactComponent(TextField, {
      label: 'Title',
    });
  });

  it('calls onChange when the strategy is changed', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard {...mockProps} />,
    );

    methodCard
      .find(ChoiceList)
      ?.trigger('onChange', [DiscountApplicationStrategy.Maximum]);

    expect(mockProps.strategy.onChange).toHaveBeenCalledWith(
      DiscountApplicationStrategy.Maximum,
    );
  });
});
