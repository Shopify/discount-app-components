import React, {useEffect} from 'react';
import {ChoiceList, BlockStack, Text, Box} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {SelectedItemsList} from '../SelectedItemsList';
import type {Field, ProductOrCollectionResource} from '../../types';
import {AppliesToEligibility} from '../../constants';

import styles from './AppliesTo.scss';

export interface AppliesToProps {
  /**
   * Specific collections or products
   */
  eligibility: Field<AppliesToEligibility>;
  selectedItems: Field<ProductOrCollectionResource[]>;
  productSelector?: React.ReactNode;
  collectionSelector?: React.ReactNode;
}

export function AppliesTo({
  eligibility,
  selectedItems,
  productSelector,
  collectionSelector,
}: AppliesToProps) {
  const [i18n] = useI18n();
  useEffect(() => {
    if (!productSelector) {
      eligibility.onChange(AppliesToEligibility.Collections);
    } else if (!collectionSelector) {
      eligibility.onChange(AppliesToEligibility.Products);
    }
  }, [productSelector, collectionSelector, eligibility]);
  return (
    <>
      {productSelector || collectionSelector ? (
        <Box paddingBlockEnd="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              {i18n.translate('DiscountAppComponents.AppliesToCard.title')}
            </Text>
            <ChoiceList
              title={i18n.translate(
                'DiscountAppComponents.AppliesToCard.choiceList.titleProducts',
              )}
              disabled={!productSelector || !collectionSelector}
              titleHidden
              choices={[
                {
                  value: AppliesToEligibility.Products,
                  label: i18n.translate(
                    'DiscountAppComponents.AppliesToCard.choiceList.products',
                  ),
                },
                {
                  value: AppliesToEligibility.Collections,
                  label: i18n.translate(
                    'DiscountAppComponents.AppliesToCard.choiceList.collections',
                  ),
                },
              ]}
              selected={[eligibility.value]}
              onChange={(values: AppliesToEligibility[]) =>
                eligibility.onChange(values[0])
              }
            />

            {eligibility.value === AppliesToEligibility.Products && (
              <>
                <div className={styles.SelectedItemsActivator}>
                  {productSelector}
                </div>
                <SelectedItemsList
                  items={selectedItems.value.map((item) => item)}
                  renderItem={(item: ProductOrCollectionResource) => (
                    <div>{item.title}</div>
                  )}
                  onRemoveItem={(itemId: string) =>
                    selectedItems.onChange(
                      selectedItems.value.filter((item) => item.id !== itemId),
                    )
                  }
                />
              </>
            )}
            {eligibility.value === AppliesToEligibility.Collections && (
              <>
                <div className={styles.SelectedItemsActivator}>
                  {collectionSelector}
                </div>
                <SelectedItemsList
                  items={selectedItems.value.map((item) => item)}
                  renderItem={(item: ProductOrCollectionResource) => (
                    <div>{item.title}</div>
                  )}
                  onRemoveItem={(itemId: string) =>
                    selectedItems.onChange(
                      selectedItems.value.filter((item) => item.id !== itemId),
                    )
                  }
                />
              </>
            )}
          </BlockStack>
        </Box>
      ) : null}
    </>
  );
}
