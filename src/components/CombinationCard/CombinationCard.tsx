import React from 'react';
import {
  Banner,
  Link,
  Card,
  ChoiceList,
  BlockStack,
  Text,
  ChoiceListProps,
  Box,
} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import {DiscountClass} from '../../constants';
import type {CombinableDiscountTypes, Field} from '../../types';

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.CombinationCard',
};

export interface CombinationCardProps {
  /**
   * The class of the current discount (shipping, product, order)
   */
  discountClass: DiscountClass;

  /**
   * The discount title for Automatic discounts, or discount code for Code discounts.
   */
  discountDescriptor: string;

  /**
   * Field used for setting which discount classes may be combined with this discount
   */
  combinableDiscountTypes: Field<CombinableDiscountTypes>;
}

export function CombinationCard({
  discountClass,
  discountDescriptor,
  combinableDiscountTypes,
}: CombinationCardProps) {
  const [i18n] = useI18n();

  const handleDiscountCombinesWithChange = (selectedChoices: string[]) => {
    combinableDiscountTypes.onChange({
      orderDiscounts: selectedChoices.includes(DiscountClass.Order),
      productDiscounts: selectedChoices.includes(DiscountClass.Product),
      shippingDiscounts: selectedChoices.includes(DiscountClass.Shipping),
    });
  };

  const trimmedDescriptor = discountDescriptor.trim();

  const selectedChoices = getSelectedChoices(combinableDiscountTypes.value);

  const shouldShowBanner =
    (discountClass === DiscountClass.Order &&
      (selectedChoices.includes(DiscountClass.Product) ||
        selectedChoices.includes(DiscountClass.Order))) ||
    (discountClass === DiscountClass.Product &&
      selectedChoices.includes(DiscountClass.Order));

  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        <BlockStack gap="400">
          <Text variant="headingMd" as="h2">
            {i18n.translate('title', I18N_SCOPE)}
          </Text>
          {shouldShowBanner && (
            <Banner
              title={i18n.translate('warning.title', I18N_SCOPE)}
              tone="warning"
            >
              <p>
                {i18n.translate('warning.description', I18N_SCOPE)}{' '}
                <Link
                  url={`https://help.shopify.com/${i18n.locale}/manual/discounts/combining-discounts`}
                  target="_blank"
                >
                  {i18n.translate('warning.link', I18N_SCOPE)}
                </Link>
              </p>
            </Banner>
          )}
          <p>
            {trimmedDescriptor ? (
              <>
                <Text as="span" fontWeight="semibold">
                  {trimmedDescriptor}
                </Text>{' '}
                {i18n.translate('discountNameFilled', I18N_SCOPE)}
              </>
            ) : (
              i18n.translate('discountNameNotFilled', I18N_SCOPE, {
                discountClass: i18n.translate(
                  `discountClass.${discountClass.toLowerCase()}`,
                  I18N_SCOPE,
                ),
              })
            )}
          </p>
          <ChoiceList
            title={i18n.translate('combinesWith', I18N_SCOPE)}
            titleHidden
            allowMultiple
            choices={buildChoices({
              discountClass,
              i18n,
            })}
            selected={getSelectedChoices(combinableDiscountTypes.value)}
            onChange={handleDiscountCombinesWithChange}
          />
        </BlockStack>
      </Card>
    </Box>
  );
}

function buildChoices({
  discountClass: currentDiscountClass,
  i18n,
}: {
  discountClass: DiscountClass;
  i18n: I18n;
}): ChoiceListProps['choices'] {
  const productOption = {
    label: i18n.translate('options.productLabel', I18N_SCOPE),
    value: DiscountClass.Product,
  };
  const orderOption = {
    label: i18n.translate('options.orderLabel', I18N_SCOPE),
    value: DiscountClass.Order,
  };
  const shippingOption = {
    label: i18n.translate('options.shippingLabel', I18N_SCOPE),
    value: DiscountClass.Shipping,
  };

  switch (currentDiscountClass) {
    case DiscountClass.Product:
      return [productOption, orderOption, shippingOption];
    case DiscountClass.Order:
      return [productOption, orderOption, shippingOption];
    case DiscountClass.Shipping:
      return [productOption, orderOption];
    default:
      return [
        {
          label: '',
          value: '',
        },
      ];
  }
}

const getSelectedChoices = (
  combinableDiscountTypes: CombinableDiscountTypes,
): ChoiceListProps['selected'] => [
  ...(combinableDiscountTypes.productDiscounts ? [DiscountClass.Product] : []),
  ...(combinableDiscountTypes.orderDiscounts ? [DiscountClass.Order] : []),
  ...(combinableDiscountTypes.shippingDiscounts
    ? [DiscountClass.Shipping]
    : []),
];
