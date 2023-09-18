import React, {useCallback, useState} from 'react';
import {Box, Card, ChoiceList, Text, VerticalStack} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {DiscountApplicationStrategy} from '../../types';

export interface DiscountAppStrategyProps {
  /**
   * The discount application strategy.
   */
  strategy: DiscountApplicationStrategy;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.DiscountAppStrategyCard',
};

export function DiscountAppStrategyCard({strategy}: DiscountAppStrategyProps) {
  const [i18n] = useI18n();
  const [selected, setSelected] = useState<string[]>([strategy]);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);

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
                label: i18n.translate('first.label', I18N_SCOPE),
                value: i18n.translate('first.label', I18N_SCOPE),
                helpText: i18n.translate('first.helpText', I18N_SCOPE),
              },
              {
                label: i18n.translate('maximum.label', I18N_SCOPE),
                value: i18n.translate('maximum.label', I18N_SCOPE),
                helpText: i18n.translate('maximum.helpText', I18N_SCOPE),
              },
            ]}
            selected={selected}
            onChange={handleChange}
          />
        </VerticalStack>
      </Card>
    </Box>
  );
}
