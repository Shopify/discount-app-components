import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {PurchaseType} from '../../../constants';

import {PurchaseTypeCard} from '../../../components/PurchaseTypeCard';

export default function PurchaseTypeCardPattern() {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>(
    PurchaseType.OneTimePurchase,
  );

  return (
    <Page>
      <PurchaseTypeCard
        purchaseType={{value: purchaseType, onChange: setPurchaseType}}
      />
    </Page>
  );
}
