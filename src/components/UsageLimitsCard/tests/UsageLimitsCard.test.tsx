import React from 'react';
import {Card, Text} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {UsageLimitsCard} from '../UsageLimitsCard';
import {RecurringPaymentType} from '../../../constants';

describe('UsageLimitsCard', () => {
  const usageLimitProps = {
    isLimited: true,
    totalUsageLimit: mockField(''),
    oncePerCustomer: mockField(false),
  };

  const recurringProps = {
    isRecurring: true,
    recurringPaymentType: mockField(RecurringPaymentType.AllPayments),
    recurringPaymentLimit: mockField('1'),
  };

  it('renders limited form', () => {
    const usageLimits = mountWithApp(
      <UsageLimitsCard
        isLimited
        totalUsageLimit={usageLimitProps.totalUsageLimit}
        oncePerCustomer={usageLimitProps.oncePerCustomer}
      />,
    );

    expect(usageLimits).toContainReactComponent(Card);
    expect(usageLimits).toContainReactComponent(Text, {
      children: 'Maximum discount uses',
    });
  });

  it('renders recurring form', () => {
    const usageLimits = mountWithApp(
      <UsageLimitsCard
        isRecurring
        recurringPaymentType={recurringProps.recurringPaymentType}
        recurringPaymentLimit={recurringProps.recurringPaymentLimit}
      />,
    );

    expect(usageLimits).toContainReactComponent(Card);
    expect(usageLimits).toContainReactComponent(Text, {
      children: 'Recurring payments for subscriptions',
    });
  });

  it('renders neither', () => {
    const usageLimits = mountWithApp(
      <UsageLimitsCard
        
      />,
    );

    expect(usageLimits).not.toContainReactComponent(Card);
    expect(usageLimits).not.toContainReactComponent(Text);
  });
});
