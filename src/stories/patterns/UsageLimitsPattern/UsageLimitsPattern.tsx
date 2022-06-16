import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {UsageLimitsCard} from '../../../components/UsageLimitsCard';
import {RecurringPaymentType} from '../../../constants';

export default function UsageLimitsPattern() {
  const [totalUsageLimit, setTotalUsageLimit] = useState<string | null>(null);
  const [oncePerCustomer, setOncePerCustomer] = useState(false);
  const [recurringPaymentType, setRecurringPaymentType] = useState(
    RecurringPaymentType.AllPayments,
  );
  const [recurringPaymentsLimit, setRecurringPaymentsLimit] = useState('');

  return (
    <Page>
      <UsageLimitsCard
        totalUsageLimit={{
          value: totalUsageLimit,
          onChange: setTotalUsageLimit,
        }}
        oncePerCustomer={{
          value: oncePerCustomer,
          onChange: setOncePerCustomer,
        }}
      />
      <UsageLimitsCard
        totalUsageLimit={{
          value: totalUsageLimit,
          onChange: setTotalUsageLimit,
        }}
        oncePerCustomer={{
          value: oncePerCustomer,
          onChange: setOncePerCustomer,
        }}
        isRecurring
        recurringPaymentType={{
          value: recurringPaymentType,
          onChange: setRecurringPaymentType,
        }}
        recurringPaymentLimit={{
          value: recurringPaymentsLimit,
          onChange: setRecurringPaymentsLimit,
        }}
      />
    </Page>
  );
}
