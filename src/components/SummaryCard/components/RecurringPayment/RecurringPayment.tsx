import React from 'react';
import {List} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {RecurringPaymentType} from '../../../../constants';
import type {PositiveNumericString} from '../../../../types';

export interface RecurringPaymentProps {
  /**
   * If a discount is applicable for recurring payments
   */
  isRecurring: boolean;

  /**
   * The type of recurring payments (e.g. first payment, multiple payments, all payments)
   */
  recurringPaymentType: RecurringPaymentType;

  /**
   * (optional) If the discount is available for RecurringPaymentType.MultiplePayments, this value displays how many payments the discount is available for
   */
  recurringPaymentLimit?: PositiveNumericString;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.RecurringPayment',
};

export function RecurringPayment({
  isRecurring,
  recurringPaymentType,
  recurringPaymentLimit,
}: RecurringPaymentProps) {
  const [i18n] = useI18n();

  if (!isRecurring) {
    return null;
  }

  switch (recurringPaymentType) {
    case RecurringPaymentType.MultiplePayments:
      return recurringPaymentLimit?.length ? (
        <List.Item>
          {i18n.translate('subscriptionRecurringPayments', I18N_SCOPE, {
            count: Number(recurringPaymentLimit),
          })}
        </List.Item>
      ) : null;
    case RecurringPaymentType.AllPayments:
      return (
        <List.Item>
          {i18n.translate('subscriptionRecurringPayments.none', I18N_SCOPE)}
        </List.Item>
      );
    case RecurringPaymentType.FirstPayment:
      return (
        <List.Item>
          {i18n.translate('subscriptionRecurringPayments', I18N_SCOPE, {
            count: 1,
          })}
        </List.Item>
      );
    default:
      return null;
  }
}
