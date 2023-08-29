import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Combinations} from '../Combinations';

describe('<Combinations />', () => {
  it.each`
    combinesWithProduct | combinesWithOrder | combinesWithShipping | expectedText
    ${false}            | ${false}          | ${false}             | ${`Can't combine with other discounts`}
    ${true}             | ${true}           | ${true}              | ${`Combines with product, order, and shipping discounts`}
    ${true}             | ${true}           | ${false}             | ${`Combines with product and order discounts`}
    ${true}             | ${false}          | ${true}              | ${`Combines with product and shipping discounts`}
    ${false}            | ${true}           | ${true}              | ${`Combines with order and shipping discounts`}
    ${true}             | ${false}          | ${false}             | ${`Combines with product discounts`}
    ${false}            | ${true}           | ${false}             | ${`Combines with order discounts`}
    ${false}            | ${false}          | ${true}              | ${`Combines with shipping discounts`}
  `(
    'renders the summary when combinesWith `product: $combinesWithProduct, order: $combinesWithOrder, shipping: $combinesWithShipping`',
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
