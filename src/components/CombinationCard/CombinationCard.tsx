import React from 'react';
import {
  Card,
  ChoiceList,
  Stack,
  TextStyle,
  ChoiceListProps,
} from '@shopify/polaris';
import {I18n, useI18n} from '@shopify/react-i18n';

import {HelpText} from './components';

import {DiscountClass} from '~/constants';
import type {
  CombinableDiscountTypes,
  CombinableDiscountCounts,
  Field,
} from '~/types';

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

  /**
   * (optional) The number of existing product, order, and shipping discount classes in the shop which can be combined with this discount
   */
  combinableDiscountCounts?: CombinableDiscountCounts;

  /**
   * (optional) The full GID of the current discount. Used to filter out the current discount from the combinations modal.
   */
  discountId?: string;
}

export function CombinationCard({
  discountClass,
  discountDescriptor,
  combinableDiscountTypes,
  combinableDiscountCounts,
  discountId,
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

  return (
    <Card title={i18n.translate('title', I18N_SCOPE)} sectioned>
      <Stack vertical spacing="baseTight">
        <p>
          {trimmedDescriptor ? (
            <>
              <TextStyle variation="strong">{trimmedDescriptor}</TextStyle>{' '}
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
            discountId,
            discountDescriptor,
            i18n,
            combinableDiscountCounts,
          })}
          selected={getSelectedChoices(combinableDiscountTypes.value)}
          onChange={handleDiscountCombinesWithChange}
        />
      </Stack>
    </Card>
  );
}

function buildChoices({
  discountClass: currentDiscountClass,
  combinableDiscountCounts,
  discountId: currentDiscountId,
  discountDescriptor,
  i18n,
}: {
  discountClass: DiscountClass;
  discountId?: string;
  discountDescriptor: string;
  i18n: I18n;
  combinableDiscountCounts?: CombinableDiscountCounts;
}): ChoiceListProps['choices'] {
  const hasCounts = typeof combinableDiscountCounts !== 'undefined';

  const productOption = {
    label:
      currentDiscountClass === DiscountClass.Product
        ? i18n.translate('options.productLabelOther', I18N_SCOPE)
        : i18n.translate('options.productLabel', I18N_SCOPE),
    value: DiscountClass.Product,
    renderChildren: (isSelected: boolean) =>
      isSelected && hasCounts ? (
        <HelpText
          currentDiscountClass={currentDiscountClass}
          targetDiscountClass={DiscountClass.Product}
          count={getActualCombiningDiscountsCount(
            combinableDiscountCounts!.productDiscountsCount,
            currentDiscountClass === DiscountClass.Product,
            currentDiscountId,
          )}
          currentDiscountId={currentDiscountId}
          currentDiscountName={discountDescriptor}
        />
      ) : null,
  };
  const orderOption = {
    label: i18n.translate('options.orderLabel', I18N_SCOPE),
    value: DiscountClass.Order,
    renderChildren: (isSelected: boolean) =>
      isSelected && hasCounts ? (
        <HelpText
          currentDiscountClass={currentDiscountClass}
          targetDiscountClass={DiscountClass.Order}
          count={getActualCombiningDiscountsCount(
            combinableDiscountCounts!.orderDiscountsCount,
            currentDiscountClass === DiscountClass.Order,
            currentDiscountId,
          )}
          currentDiscountId={currentDiscountId}
          currentDiscountName={discountDescriptor}
        />
      ) : null,
  };
  const shippingOption = {
    label: i18n.translate('options.shippingLabel', I18N_SCOPE),
    value: DiscountClass.Shipping,
    renderChildren: (isSelected: boolean) =>
      isSelected && hasCounts ? (
        <HelpText
          currentDiscountClass={currentDiscountClass}
          targetDiscountClass={DiscountClass.Shipping}
          count={getActualCombiningDiscountsCount(
            combinableDiscountCounts!.shippingDiscountsCount,
            currentDiscountClass === DiscountClass.Shipping,
            currentDiscountId,
          )}
          currentDiscountId={currentDiscountId}
          currentDiscountName={discountDescriptor}
        />
      ) : null,
  };

  switch (currentDiscountClass) {
    case DiscountClass.Product:
      return [productOption, shippingOption];
    case DiscountClass.Order:
      return [shippingOption];
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

/**
 * The combines with count needs to exclude the current discount if:
 *  - the current discount is of the same type as the combination discount type
 *  - the current discount is saved
 */
function getActualCombiningDiscountsCount(
  numCombinableDiscountsForClass: number,
  discountClassesMatch: boolean,
  currentDiscountId?: string,
): number {
  if (discountClassesMatch && Boolean(currentDiscountId)) {
    return numCombinableDiscountsForClass - 1;
  }

  return numCombinableDiscountsForClass;
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
