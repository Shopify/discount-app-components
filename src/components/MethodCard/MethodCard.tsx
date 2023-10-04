import React from 'react';
import {
  Card,
  ChoiceList,
  BlockStack,
  TextField,
  Text,
  InlineStack,
  Box,
} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import {DiscountCodeGenerator} from '../DiscountCodeGenerator';
import {
  DEFAULT_DISCOUNT_CODE_LENGTH,
  DiscountClass,
  DiscountMethod,
} from '../../constants';
import type {Field} from '../../types';

const DISCOUNT_TITLE_MAX_LENGTH = 255;

export interface MethodCardProps {
  /**
   * Title of the discount type
   */
  title: string;

  /**
   * Used to generate the subtitle of the card
   */
  discountClass: DiscountClass;

  /**
   * The discount method (e.g. code, automatic). Used to control whether a text input or a code generator is shown.
   */
  discountMethod: Field<DiscountMethod>;

  /**
   * (optional) When provided, the discount method picker will be hidden
   */
  discountMethodHidden?: boolean;

  /**
   * Field to be used for the discount title.
   */
  discountTitle: Field<string>;

  /**
   * Field to be used for the discount code.
   */
  discountCode: Field<string>;

  /**
   * (optional) If provided, sets the default length of generated discount codes
   *
   * @default DEFAULT_DISCOUNT_CODE_LENGTH
   */
  defaultDiscountCodeLength?: number;
}

export function MethodCard({
  title,
  discountClass,
  discountMethod,
  discountMethodHidden,
  discountTitle,
  discountCode,
  defaultDiscountCodeLength = DEFAULT_DISCOUNT_CODE_LENGTH,
}: MethodCardProps) {
  const [i18n] = useI18n();
  const handleChangeMethod = (methods: DiscountMethod[]) => {
    discountMethod.onChange(methods[0]);
  };

  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        <BlockStack gap="400">
          <InlineStack align="start" blockAlign="center" gap="100">
            <Text variant="headingMd" as="h2">
              {title}
            </Text>
            <Text as="span" tone="subdued">
              {getDiscountClassLabel(discountClass, i18n)}
            </Text>
          </InlineStack>

          {!discountMethodHidden && (
            <Text variant="headingMd" as="h2">
              {i18n.translate(
                'DiscountAppComponents.MethodCard.methodSubtitle',
              )}
            </Text>
          )}
          <BlockStack gap="400">
            {!discountMethodHidden && (
              <ChoiceList
                title={i18n.translate(
                  'DiscountAppComponents.MethodCard.choiceList.title',
                )}
                titleHidden
                choices={[
                  {
                    value: DiscountMethod.Code,
                    label: i18n.translate(
                      'DiscountAppComponents.MethodCard.choiceList.code',
                    ),
                  },
                  {
                    value: DiscountMethod.Automatic,
                    label: i18n.translate(
                      'DiscountAppComponents.MethodCard.choiceList.automatic',
                    ),
                  },
                ]}
                selected={[discountMethod.value]}
                onChange={handleChangeMethod}
              />
            )}
            {discountMethod.value === DiscountMethod.Code ? (
              <DiscountCodeGenerator
                defaultLength={defaultDiscountCodeLength}
                discountCode={discountCode}
              />
            ) : (
              <TextField
                autoComplete="off"
                label={i18n.translate(
                  'DiscountAppComponents.MethodCard.discountField.label',
                )}
                helpText={i18n.translate(
                  'DiscountAppComponents.MethodCard.discountField.helpText',
                )}
                maxLength={DISCOUNT_TITLE_MAX_LENGTH}
                {...discountTitle}
              />
            )}
          </BlockStack>
        </BlockStack>
      </Card>
    </Box>
  );
}

const getDiscountClassLabel = (discountClass: DiscountClass, i18n: I18n) => {
  switch (discountClass) {
    case DiscountClass.Order:
      return i18n.translate(
        'DiscountAppComponents.MethodCard.discountClassLabel.order',
      );
    case DiscountClass.Product:
      return i18n.translate(
        'DiscountAppComponents.MethodCard.discountClassLabel.product',
      );
    case DiscountClass.Shipping:
      return i18n.translate(
        'DiscountAppComponents.MethodCard.discountClassLabel.shipping',
      );
    default:
      return '';
  }
};
