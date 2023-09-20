import React, {useEffect} from 'react';
import {
  Card,
  TextField,
  ChoiceList,
  InlineError,
  Text,
  VerticalStack,
  Box,
} from '@shopify/polaris';
import {CurrencyCode, I18n, useI18n} from '@shopify/react-i18n';

import {CurrencyField} from '../CurrencyField';
import {forcePositiveInteger} from '../../utilities/numbers';
import type {Field, PositiveNumericString} from '../../types';
import {AppliesToType, DiscountMethod, RequirementType} from '../../constants';

import styles from './MinimumRequirementsCard.scss';

export interface MinimumRequirementsCardProps {
  /**
   * Field that controls the selected requirement type (e.g. none, minimum amount, minimum quantity)
   */
  requirementType: Field<RequirementType>;

  /**
   * Field for the subtotal minimum requirement
   */
  subtotal: Field<PositiveNumericString | undefined>;

  /**
   * Field for the quantity minimum requirement
   */
  quantity: Field<PositiveNumericString | undefined>;

  /**
   * The discount method (e.g. code, automatic) of the current discount
   */
  discountMethod: DiscountMethod;

  /**
   * Used to render a string describing what entity the minimum requirements apply to (collections, selected products, all products)
   */
  appliesTo: AppliesToType;

  /**
   * The currency code that should be used to format the input value
   */
  currencyCode: CurrencyCode;

  /**
   * (optional) If this discount supports selling plans, adds selling plan specific language
   */
  isRecurring?: boolean;
}

const SUBTOTAL_FIELD_ID = 'discountSubtotal';
const QUANTITY_FIELD_ID = 'discountQuantity';
const AUTOMATIC_REQUIREMENT_TYPES = [
  RequirementType.Subtotal,
  RequirementType.Quantity,
];

// see https://github.com/Shopify/web/pull/12361
const SUBTOTAL_MAX_LENGTH = 15;

// see https://github.com/Shopify/web/pull/11506
const QUANTITY_MAX_LENGTH = 10;

export function MinimumRequirementsCard({
  appliesTo,
  currencyCode,
  requirementType,
  subtotal,
  quantity,
  discountMethod,
  isRecurring = false,
}: MinimumRequirementsCardProps) {
  const [i18n] = useI18n();

  // RequirementType.None is not valid for an automatic discount, so if the discount method changes we adjust the requirementType if the new state is invalid.
  useEffect(() => {
    if (
      discountMethod === DiscountMethod.Automatic &&
      requirementType.value === RequirementType.None
    ) {
      requirementType.onChange(RequirementType.Subtotal);
    }
  }, [discountMethod, requirementType]);

  const currencySymbol = i18n.getCurrencySymbol(currencyCode).symbol;

  const minimumPurchaseLabel = i18n.translate(
    'DiscountAppComponents.MinimumRequirementsCard.minimumSubtotal',
    {
      currencySymbol: currencySymbol.trim(),
    },
  );

  const minimumQuantityLabel = i18n.translate(
    'DiscountAppComponents.MinimumRequirementsCard.minimumQuantity',
  );

  const fieldHelpTextMarkup = (
    <Text as="span" color="subdued">
      {getFieldHelpText(isRecurring, appliesTo, i18n)}
    </Text>
  );

  const allMinimumRequirementChoices = [
    {
      label: i18n.translate(
        'DiscountAppComponents.MinimumRequirementsCard.none',
      ),
      value: RequirementType.None,
    },
    {
      label: minimumPurchaseLabel,
      value: RequirementType.Subtotal,
      renderChildren: (isSelected: boolean) => {
        return (
          isSelected && (
            <VerticalStack gap="4">
              <div className={styles.TextField}>
                <CurrencyField
                  id={SUBTOTAL_FIELD_ID}
                  label={minimumPurchaseLabel}
                  labelHidden
                  value={subtotal.value}
                  maxLength={SUBTOTAL_MAX_LENGTH}
                  error={Boolean(subtotal.error)}
                  currencyCode={currencyCode}
                  onChange={subtotal.onChange}
                  onBlur={subtotal.onBlur}
                  positiveOnly
                />
              </div>
              {fieldHelpTextMarkup}
              {subtotal.error && (
                <InlineError
                  fieldID={SUBTOTAL_FIELD_ID}
                  message={subtotal.error}
                />
              )}
            </VerticalStack>
          )
        );
      },
    },
    {
      label: minimumQuantityLabel,
      value: RequirementType.Quantity,
      renderChildren: (isSelected: boolean) => {
        return (
          isSelected && (
            <VerticalStack gap="4">
              <div className={styles.TextField}>
                <TextField
                  id={QUANTITY_FIELD_ID}
                  label={minimumQuantityLabel}
                  labelHidden
                  autoComplete="off"
                  error={Boolean(quantity.error)}
                  value={quantity.value}
                  maxLength={QUANTITY_MAX_LENGTH}
                  onChange={(nextValue: string) =>
                    quantity.onChange(forcePositiveInteger(nextValue))
                  }
                  onBlur={quantity.onBlur}
                />
              </div>
              {fieldHelpTextMarkup}
              {quantity.error && (
                <InlineError
                  fieldID={QUANTITY_FIELD_ID}
                  message={quantity.error}
                />
              )}
            </VerticalStack>
          )
        );
      },
    },
  ];

  const minimumRequirementChoicesToRender =
    discountMethod === DiscountMethod.Automatic
      ? allMinimumRequirementChoices.filter(({value}) =>
          AUTOMATIC_REQUIREMENT_TYPES.includes(value),
        )
      : allMinimumRequirementChoices;

  return (
    <Box paddingBlockEnd="4">
      <Card padding="4">
        <VerticalStack gap="4">
          <Text variant="headingMd" as="h2">
            {i18n.translate(
              'DiscountAppComponents.MinimumRequirementsCard.title',
            )}
          </Text>
          <ChoiceList
            title={i18n.translate(
              'DiscountAppComponents.MinimumRequirementsCard.title',
            )}
            titleHidden
            choices={minimumRequirementChoicesToRender}
            selected={[requirementType.value]}
            onChange={(nextValue: RequirementType[]) =>
              requirementType.onChange(nextValue[0])
            }
          />
        </VerticalStack>
      </Card>
    </Box>
  );
}

function getFieldHelpText(
  isRecurring: boolean,
  appliesTo: AppliesToType,
  i18n: I18n,
) {
  const scope = isRecurring
    ? 'DiscountAppComponents.MinimumRequirementsCard.subscriptions'
    : 'DiscountAppComponents.MinimumRequirementsCard.oneTime';
  switch (appliesTo) {
    case AppliesToType.Order:
      return i18n.translate('appliesToAllProducts', {scope});
    case AppliesToType.Products:
      return i18n.translate('appliesToProducts', {scope});
    case AppliesToType.Collections:
      return i18n.translate('appliesToCollections', {scope});
  }
}
