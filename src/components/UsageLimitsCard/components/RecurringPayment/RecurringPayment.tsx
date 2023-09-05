import React from 'react';
import {
  ChoiceList,
  TextField,
  Text,
  InlineError,
  VerticalStack,
} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {RecurringPaymentType} from '../../../../constants';
import type {Field, PositiveNumericString} from '../../../../types';
import {forcePositiveInteger} from '../../../../utilities/numbers';

import styles from './RecurringPayment.scss';

const RECURRING_PAYMENT_FIELD_ID = 'RECURRING_PAYMENT_FIELD_ID';

interface Props {
  /**
   * The recurring payment type (e.g. "All payments", "First payment", etc.)
   */
  recurringPaymentType: Field<RecurringPaymentType>;

  /**
   * The number of times the discount can be used for a recurring payment.
   */
  recurringPaymentLimit: Field<PositiveNumericString>;
}

export function RecurringPayment({
  recurringPaymentType,
  recurringPaymentLimit,
}: Props) {
  const [i18n] = useI18n();
  const choices = [
    {
      label: i18n.translate(
        'DiscountAppComponents.RecurringPayment.firstPayment',
      ),
      value: RecurringPaymentType.FirstPayment,
    },
    {
      label: i18n.translate(
        'DiscountAppComponents.RecurringPayment.multiplePayments',
      ),
      value: RecurringPaymentType.MultiplePayments,
      renderChildren: (isSelected: boolean) => {
        return (
          isSelected && (
            <VerticalStack gap="4">
              <div className={styles.RecurringPaymentTextField}>
                <TextField
                  id={RECURRING_PAYMENT_FIELD_ID}
                  label={i18n.translate(
                    'DiscountAppComponents.RecurringPayment.multiplePayments',
                  )}
                  labelHidden
                  value={recurringPaymentLimit.value}
                  autoComplete="off"
                  onChange={(nextValue) => {
                    recurringPaymentLimit.onChange(
                      forcePositiveInteger(nextValue),
                    );
                  }}
                  onBlur={recurringPaymentLimit.onBlur}
                  error={Boolean(recurringPaymentLimit.error)}
                />
              </div>
              <Text as="span" color="subdued">
                {i18n.translate(
                  'DiscountAppComponents.RecurringPayment.includesFirstPayment',
                )}
              </Text>
              {recurringPaymentLimit.error && (
                <InlineError
                  fieldID={RECURRING_PAYMENT_FIELD_ID}
                  message={recurringPaymentLimit.error}
                />
              )}
            </VerticalStack>
          )
        );
      },
    },
    {
      label: i18n.translate(
        'DiscountAppComponents.RecurringPayment.allPayments',
      ),
      value: RecurringPaymentType.AllPayments,
    },
  ];

  return (
    <VerticalStack gap="4">
      <Text variant="headingXs" as="h3">
        {i18n.translate('DiscountAppComponents.RecurringPayment.title')}
      </Text>
      <ChoiceList
        title={i18n.translate('DiscountAppComponents.RecurringPayment.options')}
        titleHidden
        selected={[recurringPaymentType.value]}
        choices={choices}
        onChange={(paymentChoice) =>
          recurringPaymentType.onChange(
            paymentChoice[0] as RecurringPaymentType,
          )
        }
      />
    </VerticalStack>
  );
}
