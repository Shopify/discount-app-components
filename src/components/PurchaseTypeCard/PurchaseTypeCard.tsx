import React from 'react';
import {ChoiceList, Card, Text, VerticalStack, Box} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import type {Field} from '../../types';
import {PurchaseType} from '../../constants';

export interface PurchaseTypeCardProps {
  /**
   * The selected purchase type
   */
  purchaseType: Field<PurchaseType>;
}

export function PurchaseTypeCard({purchaseType}: PurchaseTypeCardProps) {
  const [i18n] = useI18n();
  return (
    <Box paddingBlockEnd="4">
      <Card padding="4">
        <VerticalStack gap="4">
          <Text variant="headingMd" as="h2">
            {i18n.translate('DiscountAppComponents.PurchaseTypeList.title')}
          </Text>
          <ChoiceList
            title={i18n.translate(
              'DiscountAppComponents.PurchaseTypeList.choiceList.title',
            )}
            titleHidden
            selected={[purchaseType.value]}
            choices={[
              {
                label: i18n.translate(
                  'DiscountAppComponents.PurchaseTypeList.choiceList.oneTimePurchase',
                ),
                value: PurchaseType.OneTimePurchase,
              },
              {
                label: i18n.translate(
                  'DiscountAppComponents.PurchaseTypeList.choiceList.subscription',
                ),
                value: PurchaseType.Subscription,
              },
              {
                label: i18n.translate(
                  'DiscountAppComponents.PurchaseTypeList.choiceList.both',
                ),
                value: PurchaseType.Both,
              },
            ]}
            onChange={(purchaseTypeList) => {
              purchaseType.onChange(purchaseTypeList[0] as PurchaseType);
            }}
          />
        </VerticalStack>
      </Card>
    </Box>
  );
}
