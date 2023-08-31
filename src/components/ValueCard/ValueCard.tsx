import React from 'react';
import {
  Button,
  ButtonGroup,
  LegacyCard,
  Checkbox,
  ChoiceList,
  InlineError,
  LegacyStack,
  TextField,
} from '@shopify/polaris';
import type {CurrencyCode, I18n} from '@shopify/react-i18n';
import {useI18n} from '@shopify/react-i18n';

import {CurrencyField} from '../CurrencyField';
import {DiscountValueType, DiscountClass, PurchaseType} from '../../constants';
import {forcePositiveInteger} from '../../utilities/numbers';

import styles from './ValueCard.scss';

import type {Field} from '~/types';

const FIXED_AMOUNT_VALUE_FIELD_ID = 'fixedAmountValueField';
const PERCENTAGE_VALUE_FIELD_ID = 'percentageValueField';
const ONCE_PER_ORDER_CHECKBOX_ID = 'oncePerOrderCheckbox';

const MAX_PERCENTAGE_LENGTH = 100;
const MIN_PERCENTAGE_LENGTH = 1;

interface Props {
  fixedAmountDiscountValue: Field<string>;
  percentageDiscountValue: Field<string>;
  discountValueType: Field<DiscountValueType>;
  purchaseType: Field<PurchaseType>;
  oncePerOrder: Field<boolean>;
  discountClass: DiscountClass;
  currencyCode: CurrencyCode;
  sellsSubscriptions: boolean;
  isCodeDiscount: boolean;
}

export function ValueCard({
  fixedAmountDiscountValue,
  percentageDiscountValue,
  discountValueType,
  purchaseType,
  oncePerOrder,
  discountClass,
  currencyCode,
  sellsSubscriptions,
  isCodeDiscount,
}: Props) {
  const [i18n] = useI18n();

  const isPercentageDiscount =
    discountValueType.value === DiscountValueType.Percentage;
  const isProductDiscount = discountClass === DiscountClass.Product;

  const purchaseTypeChoices = [
    {
      value: PurchaseType.OneTimePurchase,
      label: i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.choices.oneTime',
      ),
    },
    {
      value: PurchaseType.Subscription,
      label: i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.choices.subscription',
      ),
    },
    {
      value: PurchaseType.Both,
      label: i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.choices.both',
      ),
    },
  ];

  const handlePercentageValueChange = (value: string) => {
    return percentageDiscountValue.onChange(forcePositiveInteger(value));
  };
  const fixedAmountValueFloat = parseFloat(fixedAmountDiscountValue.value);

  const hasPercentageDiscountValueError = Boolean(
    percentageDiscountValue.error,
  );

  return (
    <LegacyCard title={i18n.translate('DiscountAppComponents.ValueCard.title')}>
      <LegacyCard.Section>
        <LegacyStack>
          <ButtonGroup segmented>
            <Button
              size="large"
              pressed={isPercentageDiscount}
              onClick={() =>
                discountValueType.onChange(DiscountValueType.Percentage)
              }
            >
              {i18n.translate(
                'DiscountAppComponents.ValueCard.percentageButton',
              )}
            </Button>
            <Button
              size="large"
              pressed={!isPercentageDiscount}
              onClick={() =>
                discountValueType.onChange(DiscountValueType.FixedAmount)
              }
            >
              {i18n.translate(
                'DiscountAppComponents.ValueCard.fixedAmountButton',
              )}
            </Button>
          </ButtonGroup>
          <LegacyStack.Item fill>
            {!isPercentageDiscount && (
              <CurrencyField
                label={i18n.translate(
                  'DiscountAppComponents.ValueCard.discountValueLabel',
                )}
                labelHidden
                id={FIXED_AMOUNT_VALUE_FIELD_ID}
                value={fixedAmountDiscountValue.value}
                maxLength={15}
                error={fixedAmountDiscountValue.error !== undefined}
                currencyCode={currencyCode}
                onChange={fixedAmountDiscountValue.onChange}
                onBlur={fixedAmountDiscountValue.onBlur}
                positiveOnly
              />
            )}
            {isPercentageDiscount && (
              <TextField
                autoComplete="off"
                label={i18n.translate(
                  'DiscountAppComponents.ValueCard.discountValueLabel',
                )}
                labelHidden
                suffix="%"
                value={percentageDiscountValue.value}
                onBlur={percentageDiscountValue.onBlur}
                maxLength={MAX_PERCENTAGE_LENGTH}
                minLength={MIN_PERCENTAGE_LENGTH}
                onChange={handlePercentageValueChange}
                error={hasPercentageDiscountValueError}
              />
            )}
            {!isPercentageDiscount && fixedAmountDiscountValue.error && (
              <div className={styles.Error}>
                <InlineError
                  fieldID={FIXED_AMOUNT_VALUE_FIELD_ID}
                  message={fixedAmountDiscountValue.error}
                />
              </div>
            )}
            {isPercentageDiscount && percentageDiscountValue.error && (
              <div className={styles.Error}>
                <InlineError
                  fieldID={PERCENTAGE_VALUE_FIELD_ID}
                  message={percentageDiscountValue.error}
                />
              </div>
            )}
          </LegacyStack.Item>
        </LegacyStack>
      </LegacyCard.Section>
      {sellsSubscriptions && (
        <LegacyCard.Section
          title={i18n.translate(
            'DiscountAppComponents.ValueCard.purchaseType.title',
          )}
        >
          {isCodeDiscount ? (
            <ChoiceList
              title={i18n.translate(
                'DiscountAppComponents.ValueCard.purchaseType.choiceListTitle',
              )}
              titleHidden
              choices={purchaseTypeChoices}
              selected={[purchaseType.value]}
              onChange={(values: string[]) =>
                purchaseType.onChange(values[0] as PurchaseType)
              }
            />
          ) : (
            <p>{getPurchaseTypeWarning(discountClass, i18n)}</p>
          )}
        </LegacyCard.Section>
      )}
      {isProductDiscount && !isPercentageDiscount && (
        <LegacyCard.Section>
          <Checkbox
            id={ONCE_PER_ORDER_CHECKBOX_ID}
            label={i18n.translate(
              'DiscountAppComponents.ValueCard.oncePerOrder',
            )}
            checked={oncePerOrder.value}
            onChange={oncePerOrder.onChange}
            helpText={
              isNaN(fixedAmountValueFloat)
                ? i18n.translate(
                    'DiscountAppComponents.ValueCard.oncePerOrderHelpText',
                  )
                : i18n.translate(
                    'DiscountAppComponents.ValueCard.oncePerOrderHelpTextWithAmount',
                    {
                      fixedAmountValue: i18n.formatCurrency(
                        Number(fixedAmountValueFloat),
                        {
                          currency: currencyCode,
                          precision: 0,
                          form: 'explicit',
                        },
                      ),
                    },
                  )
            }
          />
        </LegacyCard.Section>
      )}
    </LegacyCard>
  );
}
const getPurchaseTypeWarning = (discountClass: string, i18n: I18n): string => {
  switch (discountClass) {
    case DiscountClass.Product:
      return i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.warning.product',
      );
    case DiscountClass.Order:
      return i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.warning.order',
      );
    case DiscountClass.Shipping:
      return i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.warning.shipping',
      );
    default:
      return i18n.translate(
        'DiscountAppComponents.ValueCard.purchaseType.warning.product',
      );
  }
};
