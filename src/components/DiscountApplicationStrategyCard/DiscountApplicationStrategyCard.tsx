import React from 'react';
import {Box, Card, ChoiceList, Text, VerticalStack} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {DiscountApplicationStrategy, Field} from '../../types';

export interface DiscountAppStrategyProps {
  /**
   * The discount application strategy.
   */
  strategy: Field<DiscountApplicationStrategy>;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.DiscountApplicationStrategyCard',
};

export function DiscountApplicationStrategyCard({
  strategy,
}: DiscountAppStrategyProps) {
  const [i18n] = useI18n();

  const handleChange = (strategies: DiscountApplicationStrategy[]) =>
    strategy.onChange(strategies[0]);

  return (
    <Box paddingBlockEnd="4">
      <Card padding="4">
        <VerticalStack gap="4">
          <Text variant="headingMd" as="h2">
            {i18n.translate('title', I18N_SCOPE)}
          </Text>
          <ChoiceList
            title={i18n.translate('title', I18N_SCOPE)}
            titleHidden
            choices={[
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
            ]}
            selected={[strategy.value]}
            onChange={handleChange}
          />
        </VerticalStack>
      </Card>
    </Box>
  );
}
