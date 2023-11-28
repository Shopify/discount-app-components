import React from 'react';
import {ChoiceList, TextField} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {DiscountApplicationStrategyCard} from '../DiscountApplicationStrategyCard';
import {DiscountClass, DiscountApplicationStrategy} from '../../../constants';

describe('<DiscountApplicationStrategyCard />', () => {
  const mockProps = {
    strategy: mockField(DiscountApplicationStrategy.First),
    discountClass: DiscountClass.Order,
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

  it('renders first strategy if discountClass is Order', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard
        {...mockProps}
        discountClass={DiscountClass.Order}
      />,
    );

    expect(methodCard).toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.First,
        }),
      ]),
    });
  });

  it('renders first strategy if discountClass is Product', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard
        {...mockProps}
        discountClass={DiscountClass.Product}
      />,
    );

    expect(methodCard).toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.First,
        }),
      ]),
    });
  });

  it('does not render all strategy if discountClass is not Product', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard
        {...mockProps}
        discountClass={DiscountClass.Order}
      />,
    );

    expect(methodCard).not.toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.All,
        }),
      ]),
    });
  });

  it('renders all strategy if discountClass is Product', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard
        {...mockProps}
        discountClass={DiscountClass.Product}
      />,
    );

    expect(methodCard).toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.All,
        }),
      ]),
    });
  });

  it('only renders all strategy if discountClass is Shipping', () => {
    const methodCard = mountWithApp(
      <DiscountApplicationStrategyCard
        {...mockProps}
        discountClass={DiscountClass.Shipping}
      />,
    );

    expect(methodCard).toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.All,
        }),
      ]),
    });

    expect(methodCard).not.toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.First,
        }),
      ]),
    });

    expect(methodCard).not.toContainReactComponent(ChoiceList, {
      choices: expect.arrayContaining([
        expect.objectContaining({
          value: DiscountApplicationStrategy.Maximum,
        }),
      ]),
    });
  });
});
