import React, {useEffect, useState} from 'react';
import {
  LegacyCard as Card,
  ChoiceList,
  TextField,
  LegacyStack as Stack,
  Text,
  InlineError,
} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import styles from './UsageLimitsCard.scss';
import {RecurringPayment} from './components';

import type {Field, PositiveNumericString} from '~/types';
import type {RecurringPaymentType} from '~/constants';
import {forcePositiveInteger} from '~/utilities/numbers';

export enum UsageLimitType {
  TotalUsageLimit = 'TOTAL_USAGE_LIMIT',
  OncePerCustomerLimit = 'ONCE_PER_CUSTOMER_LIMIT',
}

interface UsageLimitProps {
  /**
   * The total number of times the discount can be used.
   */
  totalUsageLimit: Field<PositiveNumericString | null>;

  /**
   * When selected, the discount may be used at most once per customer
   */
  oncePerCustomer: Field<boolean>;

  /**
   * (optional) When true, displays the "Recurring payments" section. (see {@interface UsageLimitsCardMultiplePaymentsProps})
   */
  isRecurring?: false;
}

interface UsageLimitsCardMultiplePaymentsProps
  extends Omit<UsageLimitProps, 'isRecurring'> {
  /**
   * Displays the "Recurring payments" section.
   */
  isRecurring: true;

  /**
   * The recurring payment type (FIRST_PAYMENT, MULTIPLE_PAYMENTS, ALL_PAYMENTS)
   */
  recurringPaymentType: Field<RecurringPaymentType>;

  /**
   * The number of times the discount can be used for a recurring payment.
   */
  recurringPaymentLimit: Field<PositiveNumericString>;
}

export type UsageLimitsCardProps =
  | UsageLimitProps
  | UsageLimitsCardMultiplePaymentsProps;

export const DISCOUNT_TOTAL_USAGE_LIMIT_FIELD = 'totalUsageLimit';

export function UsageLimitsCard(props: UsageLimitsCardProps) {
  const {totalUsageLimit, oncePerCustomer, isRecurring} = props;

  const [showUsageLimit, setShowUsageLimit] = useState(
    totalUsageLimit.value !== null,
  );

  const [i18n] = useI18n();

  useEffect(
    () => setShowUsageLimit(totalUsageLimit.value !== null),
    [totalUsageLimit.value],
  );

  const handleUsageLimitsChoicesChange = (
    selectedUsageLimitTypes: UsageLimitType[],
  ) => {
    const newOncePerCustomer = selectedUsageLimitTypes.includes(
      UsageLimitType.OncePerCustomerLimit,
    );

    // When the checkbox is toggled, either set the totalUsageLimit value to null (null === checkbox off) or an empty string (non-null === checkbox on)
    if (!selectedUsageLimitTypes.includes(UsageLimitType.TotalUsageLimit)) {
      totalUsageLimit.onChange(null);
    } else if (totalUsageLimit.value === null) {
      totalUsageLimit.onChange('');
    }

    newOncePerCustomer !== oncePerCustomer.value &&
      oncePerCustomer.onChange(newOncePerCustomer);
  };

  return (
    <Card title={i18n.translate('DiscountAppComponents.UsageLimitsCard.title')}>
      <Card.Section>
        <ChoiceList
          title={i18n.translate(
            'DiscountAppComponents.UsageLimitsCard.options',
          )}
          titleHidden
          allowMultiple
          selected={[
            ...(showUsageLimit ? [UsageLimitType.TotalUsageLimit] : []),
            ...(oncePerCustomer.value
              ? [UsageLimitType.OncePerCustomerLimit]
              : []),
          ]}
          choices={[
            {
              label: i18n.translate(
                'DiscountAppComponents.UsageLimitsCard.totalUsageLimitLabel',
              ),
              value: UsageLimitType.TotalUsageLimit,
              renderChildren: (isSelected: boolean) => (
                <Stack vertical spacing="extraTight">
                  {isSelected && (
                    <div className={styles.TotalUsageLimitTextField}>
                      <TextField
                        id={DISCOUNT_TOTAL_USAGE_LIMIT_FIELD}
                        label={i18n.translate(
                          'DiscountAppComponents.UsageLimitsCard.totalUsageLimitLabel',
                        )}
                        autoComplete="off"
                        labelHidden
                        value={totalUsageLimit.value || ''}
                        onChange={(nextValue) => {
                          totalUsageLimit.onChange(
                            forcePositiveInteger(nextValue),
                          );
                        }}
                        onBlur={totalUsageLimit.onBlur}
                        error={Boolean(totalUsageLimit.error)}
                      />
                    </div>
                  )}
                  {isRecurring && (
                    <Text as="span" color="subdued">
                      {i18n.translate(
                        'DiscountAppComponents.UsageLimitsCard.totalUsageLimitHelpTextSubscription',
                      )}
                    </Text>
                  )}
                  {isSelected && totalUsageLimit.error && (
                    <InlineError
                      fieldID={DISCOUNT_TOTAL_USAGE_LIMIT_FIELD}
                      message={totalUsageLimit.error}
                    />
                  )}
                </Stack>
              ),
            },
            {
              label: i18n.translate(
                'DiscountAppComponents.UsageLimitsCard.oncePerCustomerLimitLabel',
              ),
              value: UsageLimitType.OncePerCustomerLimit,
            },
          ]}
          onChange={handleUsageLimitsChoicesChange}
        />
      </Card.Section>
      {isShowRecurringPaymentSection(props) && (
        <Card.Section>
          <RecurringPayment
            recurringPaymentType={props.recurringPaymentType}
            recurringPaymentLimit={props.recurringPaymentLimit}
          />
        </Card.Section>
      )}
    </Card>
  );
}

function isShowRecurringPaymentSection(
  props: UsageLimitsCardProps,
): props is UsageLimitsCardMultiplePaymentsProps {
  return Boolean(props.isRecurring);
}
