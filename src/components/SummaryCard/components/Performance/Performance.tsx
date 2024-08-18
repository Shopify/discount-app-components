import React from 'react';
import {useI18n} from '@shopify/react-i18n';
import {List, Text, BlockStack, Link} from '@shopify/polaris';

import {DiscountStatus} from '../../../../constants';
import type {MoneyInput} from '../../../../types';

export interface PerformanceProps {
  /**
   * (optional) The status of the discount (e.g. active, expired, scheduled).
   */
  status?: DiscountStatus;

  /**
   * (optional) The number of times the discount has been used
   */
  usageCount?: number;

  /**
   * (optional) Url to the sales by discount report (this changes based on shop's subscription level)
   */
  reportsUrl?: string;

  /**
   * (optional) The total number of sales that have been made with the discount
   */
  totalSales?: MoneyInput;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.Performance',
};

export function Performance({
  status,
  totalSales,
  reportsUrl,
  usageCount,
}: PerformanceProps) {
  const [i18n] = useI18n();

  const isActiveOrExpired =
    status === DiscountStatus.Active || status === DiscountStatus.Expired;

  return (
    <BlockStack gap="200">
      <Text variant="headingSm" as="h3">
        {i18n.translate('title', I18N_SCOPE)}
      </Text>
      {status === DiscountStatus.Scheduled && (
        <Text as="span" tone="subdued">
          {i18n.translate('notActive', I18N_SCOPE)}
        </Text>
      )}
      {isActiveOrExpired && (
        <>
          <List type="bullet">
            <List.Item>
              {i18n.translate('usageCount', I18N_SCOPE, {usageCount})}
            </List.Item>
            {totalSales && (
              <List.Item>
                {i18n.translate('totalSales', I18N_SCOPE, {
                  totalSales: i18n.formatCurrency(Number(totalSales.amount), {
                    currency: totalSales.currencyCode,
                  }),
                })}
              </List.Item>
            )}
          </List>
          {reportsUrl && (
            <p>
              <Link url={reportsUrl} target="_top">
                {i18n.translate('performanceLink', I18N_SCOPE)}
              </Link>
            </p>
          )}
        </>
      )}
    </BlockStack>
  );
}
