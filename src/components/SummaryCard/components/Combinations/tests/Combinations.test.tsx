import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Combinations} from '../Combinations';

import {DiscountClass} from '~/constants';

describe('<Combinations />', () => {
  it('renders nothing when no combination options are set', () => {
    const combinations = mountWithApp(
      <Combinations
        combinesWith={{
          orderDiscounts: false,
          productDiscounts: false,
          shippingDiscounts: false,
        }}
      />,
    );

    expect(combinations.find(Combinations)).toBeNull();
  });

  it.each`
    combinesWithProduct | combinesWithOrder | combinesWithShipping | selectedCombinations
    ${true}             | ${false}          | ${false}             | ${[DiscountClass.Product]}
    ${false}            | ${true}           | ${false}             | ${[DiscountClass.Order]}
    ${false}            | ${false}          | ${true}              | ${[DiscountClass.Shipping]}
  `(
    'renders combination summary when one combination option is set',
    ({
      combinesWithProduct,
      combinesWithOrder,
      combinesWithShipping,
      selectedCombinations,
    }) => {
      const combinations = mountWithApp(
        <Combinations
          combinesWith={{
            productDiscounts: combinesWithProduct,
            orderDiscounts: combinesWithOrder,
            shippingDiscounts: combinesWithShipping,
          }}
        />,
      );

      expect(combinations).toContainReactText(
        `Combines with ${selectedCombinations[0].toLowerCase()} discounts`,
      );
    },
  );

  it.each`
    combinesWithProduct | combinesWithOrder | combinesWithShipping | selectedCombinations
    ${true}             | ${true}           | ${false}             | ${[DiscountClass.Product, DiscountClass.Order]}
    ${true}             | ${false}          | ${true}              | ${[DiscountClass.Product, DiscountClass.Shipping]}
    ${false}            | ${true}           | ${true}              | ${[DiscountClass.Order, DiscountClass.Shipping]}
  `(
    'renders combination summary when two combination options are set',
    ({
      combinesWithProduct,
      combinesWithOrder,
      combinesWithShipping,
      selectedCombinations,
    }) => {
      const combinations = mountWithApp(
        <Combinations
          combinesWith={{
            productDiscounts: combinesWithProduct,
            orderDiscounts: combinesWithOrder,
            shippingDiscounts: combinesWithShipping,
          }}
        />,
      );

      expect(combinations).toContainReactText(
        `Combines with ${selectedCombinations[0].toLowerCase()} and ${selectedCombinations[1].toLowerCase()} discounts`,
      );
    },
  );

  it.each`
    combinesWithProduct | combinesWithOrder | combinesWithShipping | selectedCombinations
    ${true}             | ${true}           | ${true}              | ${[DiscountClass.Product, DiscountClass.Order, DiscountClass.Shipping]}
  `(
    'renders combination summary when three combination options are set',
    ({
      combinesWithProduct,
      combinesWithOrder,
      combinesWithShipping,
      selectedCombinations,
    }) => {
      const combinations = mountWithApp(
        <Combinations
          combinesWith={{
            productDiscounts: combinesWithProduct,
            orderDiscounts: combinesWithOrder,
            shippingDiscounts: combinesWithShipping,
          }}
        />,
      );

      expect(combinations).toContainReactText(
        `Combines with ${selectedCombinations[0].toLowerCase()}, ${selectedCombinations[1].toLowerCase()}, and ${selectedCombinations[2].toLowerCase()} discounts`,
      );
    },
  );
});
