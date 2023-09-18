import React from 'react';
import {
  ChoiceList,
  InlineError,
  VerticalStack,
  Text,
  Box,
} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';
import {
  type Product,
  type Collection,
} from '@shopify/app-bridge/actions/ResourcePicker';

import {SelectedItemsList} from '../SelectedItemsList';
import type {Field, Country} from '../../types';
import {AppliesToEligibility, AppliesToType} from '../../constants';

export interface AppliesToCardProps {
  /**
   * Specific collections or products
   */
  eligibility: Field<AppliesToEligibility>;
  selectedItems: Field<Product[]> | Field<Collection[]>;
  itemSelector: React.ReactNode;
}

export function AppliesTo({
  eligibility,
  selectedItems,
  itemSelector,
}: AppliesToCardProps) {
  const [i18n] = useI18n();

  return (
    <Box paddingBlockEnd="4">
      <VerticalStack gap="4">
        <Text variant="headingMd" as="h2">
          {i18n.translate('DiscountAppComponents.AppliesToCard.title')}
        </Text>
        <ChoiceList
          title={i18n.translate(
            'DiscountAppComponents.AppliesToCard.choiceList.titleProducts',
          )}
          titleHidden
          choices={[
            {
              value: AppliesToType.Products,
              label: i18n.translate(
                'DiscountAppComponents.AppliesToCard.choiceList.products',
              ),
            },
            {
              value: AppliesToType.Collections,
              label: i18n.translate(
                'DiscountAppComponents.AppliesToCard.choiceList.collections',
              ),
            },
          ]}
          selected={[]}
          onChange={(values: AppliesToType[]) =>
            eligibility.onChange(values[0])
          }
        />
        {countrySelectionType.value ===
          CountrySelectionType.SelectedCountries && (
          <>
            <div className={styles.countrySelectorActivator}>
              {countrySelector}
            </div>
            <SelectedItemsList
              items={selectedCountries.value.map(localizeCountry)}
              renderItem={(item: Country) => <div>{item.name}</div>}
              onRemoveItem={(itemId: string) =>
                selectedCountries.onChange(
                  selectedCountries.value.filter(
                    (countryCode) => countryCode !== itemId,
                  ),
                )
              }
            />
          </>
        )}
        <Text variant="headingMd" as="h2">
          {i18n.translate(
            'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.title',
          )}
        </Text>

        {excludeShippingRates.value && (
          <>
            <div className={styles.ShippingRatesTextField} />
            {maximumShippingPrice?.error && (
              <InlineError
                fieldID={EXCLUDE_SHIPPING_RATES_FIELD_ID}
                message={maximumShippingPrice.error}
              />
            )}
          </>
        )}
      </VerticalStack>
    </Box>
  );
}
