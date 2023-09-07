import React from 'react';
import {useI18n} from '@shopify/react-i18n';
import {List, Text, VerticalStack} from '@shopify/polaris';
import {Redirect} from '@shopify/app-bridge/actions';

import {AppBridgeLink} from '../../../AppBridgeLink';
import {DiscountMethod, DiscountStatus} from '../../../../constants';
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
   * (optional) Flag that indicates whether a shop has an enabled `ShopFeatures` of `reports` (see https://shopify.dev/api/admin-graphql/2022-04/objects/ShopFeatures#field-shopfeatures-reports)
   */
  hasReports?: boolean;

  /**
   * (optional) When hasReports is true and discountMethod is Code, displays a link to the admin report
   */
  discountMethod?: DiscountMethod;

  /**
   * (optional) The total number of sales that have been made with the discount
   */
  totalSales?: MoneyInput;
}

const CODE_DISCOUNT_ADMIN_REPORT_URL = `/reports/sales_by_discount`;

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.Performance',
};

export function Performance({
  status,
  totalSales,
  hasReports,
  discountMethod,
  usageCount,
}: PerformanceProps) {
  const [i18n] = useI18n();

  const isActiveOrExpired =
    status === DiscountStatus.Active || status === DiscountStatus.Expired;

  return (
    <VerticalStack gap="2">
      <Text variant="headingXs" as="h3">
        {i18n.translate('title', I18N_SCOPE)}
      </Text>
      {status === DiscountStatus.Scheduled && (
        <Text as="span" color="subdued">
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
          {hasReports && discountMethod === DiscountMethod.Code && (
            <p>
              <AppBridgeLink
                action={Redirect.Action.ADMIN_PATH}
                url={CODE_DISCOUNT_ADMIN_REPORT_URL}
              >
                {i18n.translate('performanceLink', I18N_SCOPE)}
              </AppBridgeLink>
            </p>
          )}
        </>
      )}
    </VerticalStack>
  );
}
