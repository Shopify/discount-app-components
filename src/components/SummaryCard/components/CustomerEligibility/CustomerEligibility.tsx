import React from 'react';
import {List} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import type {Customer, CustomerSegment} from '../../../../types';
import {Eligibility} from '../../../../constants';

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.CustomerEligibility',
};

export interface CustomerEligibilityProps {
  /**
   * Who the discount applies to (all customers, specific customers, specific customer groups)
   */
  eligibility: Eligibility;

  /**
   * (optional) Specific customer segments the discount applies to
   */
  selectedCustomerSegments?: CustomerSegment[];

  /**
   * (optional) Specific customers the discount applies to
   */
  selectedCustomers?: Customer[];
}

export function CustomerEligibility({
  eligibility,
  selectedCustomerSegments,
  selectedCustomers,
}: CustomerEligibilityProps) {
  const [i18n] = useI18n();

  switch (eligibility) {
    case Eligibility.Everyone:
      return (
        <List.Item>{i18n.translate('allCustomers', I18N_SCOPE)}</List.Item>
      );
    case Eligibility.Customers:
      return selectedCustomers?.length ? (
        <List.Item>
          {i18n.translate('customers', I18N_SCOPE, {
            customerName: selectedCustomers[0].displayName,
            count: selectedCustomers.length,
          })}
        </List.Item>
      ) : null;
    case Eligibility.CustomerSegments:
      return selectedCustomerSegments?.length ? (
        <List.Item>
          {i18n.translate('customerSegments', I18N_SCOPE, {
            segmentName: selectedCustomerSegments[0].name,
            count: selectedCustomerSegments.length,
          })}
        </List.Item>
      ) : null;
    default:
      return null;
  }
}
