import React from 'react';
import {List} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import {PurchaseType} from '../../../../constants';

export interface AppliesToPurchaseTypeProps {
  /**
   * The purchase type that the discount applies to (e.g. one time, subscription, both)
   */
  purchaseType: PurchaseType;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.AppliesToPurchaseType',
};

export function AppliesToPurchaseType({
  purchaseType,
}: AppliesToPurchaseTypeProps) {
  const [i18n] = useI18n();

  return <List.Item>{getPurchaseTypeSummary(purchaseType, i18n)}</List.Item>;
}

const getPurchaseTypeSummary = (purchaseType: PurchaseType, i18n: I18n) => {
  switch (purchaseType) {
    case PurchaseType.OneTimePurchase:
      return i18n.translate('appliesToPurchaseTypeOneTime', I18N_SCOPE);
    case PurchaseType.Subscription:
      return i18n.translate('appliesToPurchaseTypeSubscription', I18N_SCOPE);
    case PurchaseType.Both:
      return i18n.translate('appliesToPurchaseTypeBoth', I18N_SCOPE);
  }
};
