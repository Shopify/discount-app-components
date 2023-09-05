import React from 'react';
import {List} from '@shopify/polaris';
import {I18n, useI18n, CurrencyCode} from '@shopify/react-i18n';

import {RequirementType} from '../../../../constants';
import type {PositiveNumericString} from '../../../../types';

export interface MinimumRequirementsProps {
  /**
   * The type of minimum requirement (e.g. none, subtotal, quantity)
   */
  requirementType: RequirementType;

  /**
   * (optional) The minimum quantity requirement for the discount
   */
  quantity?: PositiveNumericString;

  /**
   * (optional) The minimum subtotal requirement for the discount. NOTE: requires currencyCode to be passed
   */
  subtotal?: PositiveNumericString;

  /**
   * (optional) The currencyCode that should be used to format the subtotal amount
   */
  currencyCode?: CurrencyCode;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.MinimumRequirements',
};

export function MinimumRequirements({
  requirementType,
  quantity,
  subtotal,
  currencyCode,
}: MinimumRequirementsProps) {
  const [i18n] = useI18n();

  switch (requirementType) {
    case RequirementType.None:
      return (
        <List.Item>
          {i18n.translate('noMinimumPurchaseRequirement', I18N_SCOPE)}
        </List.Item>
      );
    case RequirementType.Subtotal:
      // eslint-disable-next-line no-case-declarations
      const validSubtotal = getValidSubtotal(i18n, currencyCode, subtotal);

      return validSubtotal ? (
        <List.Item>
          {i18n.translate('minimumPurchaseSubtotal', I18N_SCOPE, {
            subtotal: validSubtotal,
          })}
        </List.Item>
      ) : null;
    case RequirementType.Quantity:
      return isValidQuantity(quantity) ? (
        <List.Item>
          {i18n.translate('minimumPurchaseQuantity', I18N_SCOPE, {
            count: Number(quantity),
          })}
        </List.Item>
      ) : null;
    default:
      return null;
  }
}

function getValidSubtotal(
  i18n: I18n,
  currencyCode?: CurrencyCode,
  subtotal?: PositiveNumericString,
) {
  if (subtotal === undefined || currencyCode === undefined) {
    return null;
  }

  const subtotalNumber = Number(subtotal);
  const validatedSubtotal = isNaN(subtotalNumber)
    ? ''
    : i18n.formatCurrency(Math.abs(subtotalNumber), {
        currency: currencyCode,
      });

  if (
    subtotal.length > 0 &&
    subtotalNumber > 0 &&
    validatedSubtotal.length > 0
  ) {
    return validatedSubtotal;
  }

  return null;
}

function isValidQuantity(quantity?: PositiveNumericString) {
  if (quantity === undefined) {
    return false;
  }

  const quantityNumber = Number(quantity);
  const validatedQuantity = isNaN(quantityNumber)
    ? ''
    : Math.abs(quantityNumber).toString();

  return (
    quantity.length > 0 && quantityNumber > 0 && validatedQuantity.length > 0
  );
}
