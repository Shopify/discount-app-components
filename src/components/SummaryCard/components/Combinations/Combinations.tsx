import React from 'react';
import {List} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import {DiscountClass} from '../../../../constants';
import type {CombinableDiscountTypes} from '../../../../types';

export interface CombinationsProps {
  /**
   * Which discount classes may be combined with this discount
   */
  combinesWith: CombinableDiscountTypes;
}

const I18N_SCOPE = {scope: 'DiscountAppComponents.SummaryCard.Combinations'};

export function Combinations({combinesWith}: CombinationsProps) {
  const [i18n] = useI18n();

  const combinations = [
    ...(combinesWith.productDiscounts ? [DiscountClass.Product] : []),
    ...(combinesWith.orderDiscounts ? [DiscountClass.Order] : []),
    ...(combinesWith.shippingDiscounts ? [DiscountClass.Shipping] : []),
  ];

  return <List.Item>{getContent(combinations, i18n)}</List.Item>;
}

function getContent(combinations: DiscountClass[], i18n: I18n) {
  switch (combinations.length) {
    case 0:
      return i18n.translate('cannotCombine', I18N_SCOPE);
    case 1:
      return i18n.translate(
        `combinesWithOne.${combinations[0].toLowerCase()}`,
        I18N_SCOPE,
      );
    case 2:
      return i18n.translate(
        `combinesWithTwo.${combinations[0].toLowerCase()}And${capitalizeFirstLetter(
          combinations[1].toLowerCase(),
        )}`,
        I18N_SCOPE,
      );
    case 3:
      return i18n.translate(`combinesAll`, I18N_SCOPE);
    default:
      return '';
  }
}

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
