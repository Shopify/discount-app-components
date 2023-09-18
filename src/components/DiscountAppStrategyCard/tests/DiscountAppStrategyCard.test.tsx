import React from 'react';
import {TextField} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import {DiscountAppStrategyCard} from '../DiscountAppStrategyCard';
import {DiscountApplicationStrategy} from '../../../types';

describe('<DiscountAppStrategyCard />', () => {
  const mockProps = {
    strategy: DiscountApplicationStrategy.First,
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
});
