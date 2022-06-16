import React from 'react';
import {CurrencyCode} from '@shopify/react-i18n';
import {mountWithApp} from 'tests/utilities';

import {MaximumShippingPrice} from '../MaximumShippingPrice';

describe('<MaximumShippingPrice />', () => {
  it('displays for all countries message for free shipping discount applying to all countries', () => {
    const maximumShippingPrice = '10';

    const wrapper = mountWithApp(
      <MaximumShippingPrice
        maximumShippingPrice={maximumShippingPrice}
        currencyCode={CurrencyCode.Cad}
      />,
    );

    expect(wrapper).toContainReactText(
      `Applies to shipping rates under CA$10.00`,
    );
  });

  it('does not display shipping rates exclusion with shipping rates exclusion equal to 0', () => {
    const maximumShippingPrice = '0';

    const wrapper = mountWithApp(
      <MaximumShippingPrice
        maximumShippingPrice={maximumShippingPrice}
        currencyCode={CurrencyCode.Cad}
      />,
    );

    expect(wrapper.find(MaximumShippingPrice)).toBeNull();
  });

  it('does not display shipping rates exclusionwith invalid shipping rates exclusion', () => {
    const maximumShippingPrice = 'invalid';

    const wrapper = mountWithApp(
      <MaximumShippingPrice
        maximumShippingPrice={maximumShippingPrice}
        currencyCode={CurrencyCode.Cad}
      />,
    );

    expect(wrapper.find(MaximumShippingPrice)).toBeNull();
  });
});
