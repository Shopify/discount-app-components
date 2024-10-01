import React from 'react';
import {Card, BlockStack, Box} from '@shopify/polaris';

import type {Field, PositiveNumericString} from '../../types';
import type {RecurringPaymentType} from '../../constants';

import {RecurringPayment, UsageLimits} from './components';

interface UsageLimitProps {
  /**
   * (optional) When true, displays the "Recurring payments" section. (see {@interface UsageLimitsCardMultiplePaymentsProps})
   */
  isRecurring?: false;

  /**
   * (optional) When true, displays the "Limits" section. (see {@interface UsageLimitsCardMultiplePaymentsProps})
   */
  isLimited?: false;
}

interface UsageLimitsCardMultiplePaymentsProps
  extends Omit<UsageLimitProps, 'isRecurring'> {
  /**
   * Displays the "Recurring payments" section.
   */
  isRecurring: true;

  /**
   * The recurring payment type (FIRST_PAYMENT, MULTIPLE_PAYMENTS, ALL_PAYMENTS)
   */
  recurringPaymentType: Field<RecurringPaymentType>;

  /**
   * The number of times the discount can be used for a recurring payment.
   */
  recurringPaymentLimit: Field<PositiveNumericString>;
}

interface UsageLimitsCardLimitsProps
  extends Omit<UsageLimitProps, 'isLimited'> {
  /**
   * Displays the "Limits" section.
   */
  isLimited: true;

  /**
   * The total number of times the discount can be used.
   */
  totalUsageLimit: Field<PositiveNumericString | null>;

  /**
   * When selected, the discount may be used at most once per customer
   */
  oncePerCustomer: Field<boolean>;
}

export type UsageLimitsCardProps =
  | UsageLimitProps
  | UsageLimitsCardLimitsProps
  | UsageLimitsCardMultiplePaymentsProps;

export function UsageLimitsCard(props: UsageLimitsCardProps) {
  if (!props.isLimited && !props.isRecurring) return null;
  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        {isLimitedSection(props) && (
          <BlockStack gap="400">
            <UsageLimits
              totalUsageLimit={props.totalUsageLimit}
              oncePerCustomer={props.oncePerCustomer}
            />
          </BlockStack>
        )}
        {isRecurringPaymentSection(props) && (
          <BlockStack gap="400">
            <RecurringPayment
              recurringPaymentType={props.recurringPaymentType}
              recurringPaymentLimit={props.recurringPaymentLimit}
            />
          </BlockStack>
        )}
      </Card>
    </Box>
  );
}

function isRecurringPaymentSection(
  props: UsageLimitsCardProps,
): props is UsageLimitsCardMultiplePaymentsProps {
  return Boolean(props.isRecurring);
}

function isLimitedSection(
  props: UsageLimitsCardProps,
): props is UsageLimitsCardLimitsProps {
  return Boolean(props.isLimited);
}
