import React from 'react';
import {List} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import type {PositiveNumericString} from '../../../../types';

export interface UsageLimitsProps {
  /**
   * The total number of times a discount can be used
   */
  totalUsageLimit: PositiveNumericString | null;

  /**
   * When true, a discount may only be used once per customer
   */
  oncePerCustomer: boolean;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.UsageLimits',
};

export function UsageLimits({
  totalUsageLimit,
  oncePerCustomer,
}: UsageLimitsProps) {
  const [i18n] = useI18n();

  return (
    <List.Item>
      {getUsageSummary(totalUsageLimit, oncePerCustomer, i18n)}
    </List.Item>
  );
}

const getUsageSummary = (
  totalUsageLimit: PositiveNumericString | null,
  oncePerCustomer: boolean,
  i18n: I18n,
) => {
  const hasValidUsageLimit =
    totalUsageLimit !== null && totalUsageLimit.length > 0;

  if (hasValidUsageLimit) {
    return i18n.translate(
      oncePerCustomer
        ? 'totalUsageLimitWithOneUsePerCustomer'
        : 'totalUsageLimit',
      I18N_SCOPE,
      {
        count: Number(totalUsageLimit),
      },
    );
  } else if (oncePerCustomer) {
    return i18n.translate('oneUsePerCustomer', I18N_SCOPE);
  } else {
    return i18n.translate('noUsageLimits', I18N_SCOPE);
  }
};
