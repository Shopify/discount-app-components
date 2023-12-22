import React from 'react';
import {Box, Card, ChoiceList, Text, BlockStack} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {Field} from '../../types';
import {DiscountClass, DiscountApplicationStrategy} from '../../constants';

export interface DiscountAppStrategyProps {
  /**
   * The discount application strategy.
   */
  strategy: Field<DiscountApplicationStrategy>;
  discountClass: DiscountClass;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.DiscountApplicationStrategyCard',
};

export function DiscountApplicationStrategyCard({
  strategy,
  discountClass,
}: DiscountAppStrategyProps) {
  const [i18n] = useI18n();

  const handleChange = (strategies: DiscountApplicationStrategy[]) =>
    strategy.onChange(strategies[0]);

  const isProduct = discountClass === DiscountClass.Product;
  const isOrder = discountClass === DiscountClass.Order;
  const isShipping = discountClass === DiscountClass.Shipping;

  const choices = [
    ...(isProduct || isOrder
      ? [
          {
            value: DiscountApplicationStrategy.First,
            label: i18n.translate('first.label', I18N_SCOPE),
            helpText: i18n.translate('first.helpText', I18N_SCOPE),
          },
          {
            value: DiscountApplicationStrategy.Maximum,
            label: i18n.translate('maximum.label', I18N_SCOPE),
            helpText: i18n.translate('maximum.helpText', I18N_SCOPE),
          },
        ]
      : []),
    ...(isProduct || isShipping
      ? [
          {
            value: DiscountApplicationStrategy.All,
            label: i18n.translate('all.label', I18N_SCOPE),
            helpText: i18n.translate('all.helpText', I18N_SCOPE),
          },
        ]
      : []),
  ];

  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        <BlockStack gap="400">
          <Text variant="headingMd" as="h2">
            {i18n.translate('title', I18N_SCOPE)}
          </Text>
          <ChoiceList
            title={i18n.translate('title', I18N_SCOPE)}
            titleHidden
            choices={choices}
            selected={[strategy.value]}
            onChange={handleChange}
          />
        </BlockStack>
      </Card>
    </Box>
  );
}
