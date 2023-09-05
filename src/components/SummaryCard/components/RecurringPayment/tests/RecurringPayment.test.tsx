import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {RecurringPayment} from '../RecurringPayment';
import {RecurringPaymentType} from '../../../../../constants';

describe('<RecurringPayment />', () => {
  const mockProps = {
    isRecurring: false,
    recurringPaymentType: RecurringPaymentType.MultiplePayments,
    recurringPaymentLimit: '',
  };

  it('renders nothing when isRecurring is false', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment {...mockProps} isRecurring={false} />,
    );

    expect(recurringPayment.find(RecurringPayment)).toBeNull();
  });

  it('renders recurring payment as all payments', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...mockProps}
        isRecurring
        recurringPaymentType={RecurringPaymentType.AllPayments}
      />,
    );

    expect(recurringPayment).toContainReactText('For all recurring payments');
  });

  it('renders recurring payment as first payment', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...mockProps}
        isRecurring
        recurringPaymentType={RecurringPaymentType.FirstPayment}
      />,
    );

    expect(recurringPayment).toContainReactText(
      'Limited to 1 recurring payment',
    );
  });

  it('renders recurring payment as multiple payment', () => {
    const mockLimit = '3';

    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...mockProps}
        isRecurring
        recurringPaymentLimit={mockLimit}
        recurringPaymentType={RecurringPaymentType.MultiplePayments}
      />,
    );

    expect(recurringPayment).toContainReactText(
      `Limited to ${mockLimit} recurring payments`,
    );
  });

  it('does not render recurring payment as multiple payment when multiplePaymentsLimit is empty string', () => {
    const mockLimit = '';
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...mockProps}
        isRecurring
        recurringPaymentLimit={mockLimit}
        recurringPaymentType={RecurringPaymentType.MultiplePayments}
      />,
    );

    expect(recurringPayment.find(RecurringPayment)).toBeNull();
  });
});
