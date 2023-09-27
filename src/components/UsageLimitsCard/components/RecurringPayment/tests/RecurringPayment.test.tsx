import React from 'react';
import {
  ChoiceList,
  TextField,
  InlineError,
  Text,
  BlockStack,
} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {RecurringPayment} from '../RecurringPayment';
import {RecurringPaymentType} from '../../../../../constants';

const defaultProps = {
  recurringPaymentType: mockField(RecurringPaymentType.FirstPayment),
  recurringPaymentLimit: mockField(''),
};

describe('<RecurringPayment />', () => {
  it('renders subheading title', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment {...defaultProps} />,
    );

    const container = recurringPayment.find(BlockStack);

    expect(container).toContainReactComponent(Text, {
      children: 'Recurring payments for subscriptions',
    });
  });

  it('renders choice list', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment {...defaultProps} />,
    );

    expect(recurringPayment).toContainReactComponent(ChoiceList, {
      title: 'Recurring payments options',
      titleHidden: true,
    });
  });

  it('renders choice list selected option from prop', () => {
    const paymentType = RecurringPaymentType.AllPayments;
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentType={mockField(paymentType)}
      />,
    );

    expect(recurringPayment).toContainReactComponent(ChoiceList, {
      selected: [paymentType],
    });
  });

  it('renders choice list with all choices', () => {
    const paymentType = RecurringPaymentType.AllPayments;
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentType={mockField(paymentType)}
      />,
    );

    expect(recurringPayment).toContainReactComponent(ChoiceList, {
      choices: [
        {
          label: 'Limit discount to the first payment',
          value: RecurringPaymentType.FirstPayment,
        },
        expect.objectContaining({
          label: 'Limit discount to multiple recurring payments',
          value: RecurringPaymentType.MultiplePayments,
        }),
        {
          label: 'Discount applies to all recurring payments',
          value: RecurringPaymentType.AllPayments,
        },
      ],
    });
  });

  it('renders text input when Multiple Payments is selected', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    expect(recurringPayment).toContainReactComponent(TextField, {
      id: 'RECURRING_PAYMENT_FIELD_ID',
      label: 'Limit discount to multiple recurring payments',
      labelHidden: true,
    });
  });

  it('renders help text when Multiple Payments is selected', () => {
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    expect(recurringPayment).toContainReactText(
      'Includes payment on first order.',
    );
  });

  it.each([
    RecurringPaymentType.FirstPayment,
    RecurringPaymentType.AllPayments,
  ])(
    'does not render text input when Multiple Payments is not selected',
    (recurringPaymentType) => {
      const recurringPayment = mountWithApp(
        <RecurringPayment
          {...defaultProps}
          recurringPaymentType={mockField(recurringPaymentType)}
        />,
      );

      expect(recurringPayment).not.toContainReactComponent(TextField, {
        id: 'RECURRING_PAYMENT_FIELD_ID',
      });
    },
  );

  it('renders recurringPaymentLimit inside text input when Multiple Payments is selected', () => {
    const limit = '42';
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentLimit={mockField(limit)}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    expect(recurringPayment).toContainReactComponent(TextField, {
      value: limit,
    });
  });

  it('changes recurringPaymentLimit with valid integer values only', () => {
    const invalidLimitValue = '-4.2';
    const limitMockField = mockField('5');
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentLimit={limitMockField}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    recurringPayment.find(TextField)!.trigger('onChange', invalidLimitValue);

    expect(limitMockField.onChange).toHaveBeenCalledWith('42');
  });

  it('changes recurringPaymentLimit with empty string if invalid integer entry', () => {
    const invalidLimitValue = 'abc';
    const limitMockField = mockField('5');
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentLimit={limitMockField}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    recurringPayment.find(TextField)!.trigger('onChange', invalidLimitValue);

    expect(limitMockField.onChange).toHaveBeenCalledWith('');
  });

  it('text field calls onBlur', () => {
    const limitMockField = mockField('5', {onBlur: jest.fn()});
    const recurringPayment = mountWithApp(
      <RecurringPayment
        {...defaultProps}
        recurringPaymentLimit={limitMockField}
        recurringPaymentType={mockField(RecurringPaymentType.MultiplePayments)}
      />,
    );

    recurringPayment.find(TextField)!.trigger('onBlur');

    expect(limitMockField.onBlur).toHaveBeenCalled();
  });

  describe('error', () => {
    it('sets error prop to true on recurringPaymentLimit text field when an error is passed', () => {
      const recurringPayment = mountWithApp(
        <RecurringPayment
          {...defaultProps}
          recurringPaymentLimit={mockField('0', {error: 'foo'})}
          recurringPaymentType={mockField(
            RecurringPaymentType.MultiplePayments,
          )}
        />,
      );

      expect(recurringPayment).toContainReactComponent(TextField, {
        error: true,
      });
    });

    it('sets InlineError to the totalUsageLimit.error prop', () => {
      const error = 'foo';
      const recurringPayment = mountWithApp(
        <RecurringPayment
          {...defaultProps}
          recurringPaymentLimit={mockField('0', {error})}
          recurringPaymentType={mockField(
            RecurringPaymentType.MultiplePayments,
          )}
        />,
      );

      expect(recurringPayment).toContainReactComponent(InlineError, {
        fieldID: 'RECURRING_PAYMENT_FIELD_ID',
        message: error,
      });
    });
  });
});
