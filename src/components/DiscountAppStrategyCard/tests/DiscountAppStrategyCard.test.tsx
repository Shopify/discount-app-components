import React from 'react';
import {ChoiceList, TextField} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {DiscountAppStrategyCard} from '../DiscountAppStrategyCard';
import {DiscountApplicationStrategy} from '../../../types';

describe('<DiscountAppStrategyCard />', () => {
  const mockProps = {
    strategy: mockField(DiscountApplicationStrategy.First),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a DiscountAppStrategyCard', () => {
    const methodCard = mountWithApp(<DiscountAppStrategyCard {...mockProps} />);

    expect(methodCard).not.toContainReactComponent(TextField, {
      label: 'Title',
    });
  });

  it('calls onChange when the strategy is changed', () => {
    const methodCard = mountWithApp(<DiscountAppStrategyCard {...mockProps} />);

    methodCard
      .find(ChoiceList)
      ?.trigger('onChange', [DiscountApplicationStrategy.Maximum]);

    expect(mockProps.strategy.onChange).toHaveBeenCalledWith(
      DiscountApplicationStrategy.Maximum,
    );
  });
});
