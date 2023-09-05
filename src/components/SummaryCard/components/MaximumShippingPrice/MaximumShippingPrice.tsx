import React from 'react';
import {List} from '@shopify/polaris';
import {CurrencyCode, useI18n} from '@shopify/react-i18n';

import type {PositiveNumericString} from '../../../../types';

export interface MaximumShippingPriceProps {
  /**
   * Maximum shipping price, displayed when the user selects to exclude shipping rates
   */
  maximumShippingPrice: PositiveNumericString;

  /**
   * The currency code that should be used to format the input value
   */
  currencyCode: CurrencyCode;
}

export function MaximumShippingPrice({
  maximumShippingPrice,
  currencyCode,
}: MaximumShippingPriceProps) {
  const [i18n] = useI18n();

  const priceAsNumber = Number(maximumShippingPrice);
  const validatedPrice = isNaN(priceAsNumber)
    ? ''
    : i18n.formatCurrency(priceAsNumber, {
        currency: currencyCode,
      });

  if (priceAsNumber <= 0 || validatedPrice.length < 1) {
    return null;
  }

  return (
    <List.Item>
      {i18n.translate(
        'DiscountAppComponents.SummaryCard.RatesExclusion.forShippingRatesUnder',
        {
          value: validatedPrice,
        },
      )}
    </List.Item>
  );
}
