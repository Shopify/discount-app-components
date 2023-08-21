import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {Combinations} from '../Combinations';

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
    combinesWithProduct | combinesWithOrder | combinesWithShipping | expectedText
    ${true}             | ${true}           | ${true}              | ${`Combines with product, order, and shipping discounts`}
    ${true}             | ${true}           | ${false}             | ${`Combines with product and order discounts`}
    ${true}             | ${false}          | ${true}              | ${`Combines with product and shipping discounts`}
    ${false}            | ${true}           | ${true}              | ${`Combines with order and shipping discounts`}
    ${true}             | ${false}          | ${false}             | ${`Combines with product discounts`}
    ${false}            | ${true}           | ${false}             | ${`Combines with order discounts`}
    ${false}            | ${false}          | ${true}              | ${`Combines with shipping discounts`}
  `(
    'renders combination summary when at least one combination option is set',
    ({
      combinesWithProduct,
      combinesWithOrder,
      combinesWithShipping,
      expectedText,
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

      expect(combinations).toContainReactText(expectedText);
    },
  );
});
