import React from 'react';
import {
  ChoiceList,
  TextField,
  Card,
  InlineError,
  VerticalStack,
  Text,
} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';

import {
  DISCOUNT_TOTAL_USAGE_LIMIT_FIELD,
  UsageLimitsCard,
  UsageLimitType,
} from '../UsageLimitsCard';
import {RecurringPayment} from '../components';
import {RecurringPaymentType} from '../../../constants';
import {forcePositiveInteger} from '../../../utilities/numbers';

describe('UsageLimitsCard', () => {
  const defaultProps = {
    totalUsageLimit: mockField(''),
    oncePerCustomer: mockField(false),
  };

  it('renders Card with title', () => {
    const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

    expect(usageLimits).toContainReactComponent(Card);
    expect(usageLimits).toContainReactComponent(Text, {
      children: 'Maximum discount uses',
    });
  });

  describe('ChoiceList', () => {
    it('renders ChoiceList', () => {
      const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

      expect(usageLimits).toContainReactComponent(ChoiceList);
    });

    it('renders ChoiceList with options in order', () => {
      const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        choices: expect.arrayContaining([
          expect.objectContaining({
            label: 'Limit number of times this discount can be used in total',
          }),
          expect.objectContaining({
            label: 'Limit to one use per customer',
          }),
        ]),
      });
    });

    it('renders ChoiceList with title and titleHidden props', () => {
      const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        title: 'Usage limit options',
        titleHidden: true,
      });
    });
  });

  describe('total usage limit', () => {
    it('total usage limit option is checked when totalUsageLimit is not null', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={mockField('')} />,
      );

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        selected: expect.arrayContaining([UsageLimitType.TotalUsageLimit]),
      });
    });

    it('total usage limit option is unchecked when totalUsageLimit is null', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={mockField(null)} />,
      );

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        selected: expect.not.arrayContaining([UsageLimitType.TotalUsageLimit]),
      });
    });

    it('displays usage limit option in a stack', () => {
      const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

      expect(usageLimits).toContainReactComponent(VerticalStack);
    });

    it('displays total usage limit text field when totalUsageLimit is a number', () => {
      const totalUsageLimit = '4';
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          totalUsageLimit={mockField(totalUsageLimit)}
        />,
      );

      const stack = usageLimits.find(VerticalStack);

      expect(stack).toContainReactComponent(TextField, {
        value: totalUsageLimit,
      });
    });

    it('renders help text when isRecurring is true', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          isRecurring
          recurringPaymentLimit={mockField('')}
          recurringPaymentType={mockField(RecurringPaymentType.AllPayments)}
        />,
      );

      const stack = usageLimits.find(VerticalStack);

      expect(stack).toContainReactComponent(Text, {
        children: 'A subscription with many payments will count as one use.',
      });
    });

    it('does not render help text when isRecurring is false', () => {
      const usageLimits = mountWithApp(<UsageLimitsCard {...defaultProps} />);

      expect(usageLimits).not.toContainReactComponent(Text, {
        children: 'A subscription with many payments will count as one use.',
      });
    });

    it('sets totalUsageLimit to null when unselected', () => {
      const totalUsageLimit = mockField('3');
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={totalUsageLimit} />,
      );
      usageLimits.find(ChoiceList)!.trigger('onChange', []);

      expect(totalUsageLimit.onChange).toHaveBeenCalledWith(null);
    });

    it('sets hasUsageLimit to empty string when selected', () => {
      const totalUsageLimit = mockField(null);
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={totalUsageLimit} />,
      );
      usageLimits
        .find(ChoiceList)!
        .trigger('onChange', [UsageLimitType.TotalUsageLimit]);

      expect(totalUsageLimit.onChange).toHaveBeenCalledWith('');
    });

    it('emits total usage limit value when user updates TextField value', () => {
      const totalUsageLimit = mockField('2');
      const nextTotalUsageLimitValue = '4';
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={totalUsageLimit} />,
      );
      usageLimits
        .find(TextField)!
        .trigger('onChange', nextTotalUsageLimitValue);

      expect(totalUsageLimit.onChange).toHaveBeenCalledWith(
        nextTotalUsageLimitValue,
      );
    });

    it('emits changes with valid integer values only', () => {
      const totalUsageLimit = mockField('2');
      const invalidTotalUsageLimitValue = '-4.2';
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={totalUsageLimit} />,
      );
      usageLimits
        .find(TextField)!
        .trigger('onChange', invalidTotalUsageLimitValue);

      expect(totalUsageLimit.onChange).toHaveBeenCalledWith(
        forcePositiveInteger(invalidTotalUsageLimitValue),
      );
    });

    it('emits empty string with invalid integer entry', () => {
      const totalUsageLimit = mockField('2');
      const invalidTotalUsageLimitValue = 'abc';
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} totalUsageLimit={totalUsageLimit} />,
      );
      usageLimits
        .find(TextField)!
        .trigger('onChange', invalidTotalUsageLimitValue);

      expect(totalUsageLimit.onChange).toHaveBeenCalledWith('');
    });

    describe('error', () => {
      it('sets error prop to true on usageLimits text field when an error is passed', () => {
        const usageLimits = mountWithApp(
          <UsageLimitsCard
            {...defaultProps}
            totalUsageLimit={mockField('0', {error: 'foo'})}
          />,
        );

        expect(usageLimits).toContainReactComponent(TextField, {
          error: true,
        });
      });

      it('sets InlineError to the totalUsageLimit.error prop', () => {
        const error = 'foo';
        const usageLimits = mountWithApp(
          <UsageLimitsCard
            {...defaultProps}
            totalUsageLimit={mockField('0', {error})}
          />,
        );

        expect(usageLimits).toContainReactComponent(InlineError, {
          fieldID: DISCOUNT_TOTAL_USAGE_LIMIT_FIELD,
          message: 'foo',
        });
      });
    });

    it('changing oncePerCustomer value does not change the value of totalUsageLimit', () => {
      const totalUsageLimit = mockField('100');
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          totalUsageLimit={mockField('100')}
        />,
      );

      usageLimits
        .find(ChoiceList)!
        .trigger('onChange', [UsageLimitType.OncePerCustomerLimit]);

      expect(totalUsageLimit.onChange).not.toHaveBeenCalled();
    });
  });

  describe('oncePerCustomer', () => {
    it('does not select once per customer limit option in ChoiceList if oncePerCustomer is false', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          oncePerCustomer={mockField(false)}
        />,
      );

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        selected: expect.not.arrayContaining([
          UsageLimitType.OncePerCustomerLimit,
        ]),
      });
    });

    it('selects once per customer limit option in ChoiceList if oncePerCustomer is true', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} oncePerCustomer={mockField(true)} />,
      );

      expect(usageLimits).toContainReactComponent(ChoiceList, {
        selected: expect.arrayContaining([UsageLimitType.OncePerCustomerLimit]),
      });
    });

    it('emits true when once per customer limit option is selected', () => {
      const oncePerCustomer = mockField(false);
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} oncePerCustomer={oncePerCustomer} />,
      );
      usageLimits
        .find(ChoiceList)!
        .trigger('onChange', [UsageLimitType.OncePerCustomerLimit]);

      expect(oncePerCustomer.onChange).toHaveBeenCalledWith(true);
    });

    it('emits false when once per customer limit option is deselected', () => {
      const oncePerCustomer = mockField(true);
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} oncePerCustomer={oncePerCustomer} />,
      );
      usageLimits.find(ChoiceList)!.trigger('onChange', []);

      expect(oncePerCustomer.onChange).toHaveBeenCalledWith(false);
    });
  });

  describe('subscription', () => {
    it('renders RecurringPayment when isRecurring is true', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          isRecurring
          recurringPaymentLimit={mockField('')}
          recurringPaymentType={mockField(RecurringPaymentType.AllPayments)}
        />,
      );

      expect(usageLimits).toContainReactComponent(RecurringPayment);
    });

    it('does not render RecurringPayment when isRecurring is false', () => {
      const usageLimits = mountWithApp(
        <UsageLimitsCard {...defaultProps} isRecurring={false} />,
      );

      expect(usageLimits).not.toContainReactComponent(RecurringPayment);
    });

    it('renders RecurringPayment with passed recurringPaymentType', () => {
      const paymentTypeMock = mockField(RecurringPaymentType.AllPayments);
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          isRecurring
          recurringPaymentType={paymentTypeMock}
          recurringPaymentLimit={mockField('')}
        />,
      );

      expect(usageLimits).toContainReactComponent(RecurringPayment, {
        recurringPaymentType: paymentTypeMock,
      });
    });

    it('renders RecurringPayment with passed recurringPaymentLimit', () => {
      const recurringPaymentLimitMock = mockField('50');
      const usageLimits = mountWithApp(
        <UsageLimitsCard
          {...defaultProps}
          isRecurring
          recurringPaymentType={mockField(RecurringPaymentType.AllPayments)}
          recurringPaymentLimit={recurringPaymentLimitMock}
        />,
      );

      expect(usageLimits).toContainReactComponent(RecurringPayment, {
        recurringPaymentLimit: recurringPaymentLimitMock,
      });
    });
  });
});
