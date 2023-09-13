import React from 'react';
import {
  Card,
  ChoiceList,
  Checkbox,
  InlineError,
  VerticalStack,
  Text,
  Box,
} from '@shopify/polaris';
import {CurrencyCode, useI18n} from '@shopify/react-i18n';

import {SelectedItemsList} from '../SelectedItemsList';
import {CurrencyField} from '../CurrencyField';
import type {
  Field,
  PositiveNumericString,
  CountryCode,
  Country,
} from '../../types';
import {AppliesTo} from '../../constants';

export interface AppliesToCardProps {
  /**
   * Specific collections or products
   */
  selectedItems: Field<Products[]> | Field<Collections[]>;
}

export function AppliesToCard({selectedItems}: AppliesToCardProps) {
  const [i18n] = useI18n();

  return (
    <Box paddingBlockEnd="4">
      <Card padding="4">
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
                value: AppliesTo.Products,
                label: i18n.translate(
                  'DiscountAppComponents.AppliesToCard.choiceList.products',
                ),
              },
              {
                value: AppliesTo.Collections,
                label: i18n.translate(
                  'DiscountAppComponents.AppliesToCard.choiceList.collections',
                ),
              },
            ]}
            selected={[]}
            onChange={(values: CountrySelectionType[]) =>
              countrySelectionType.onChange(values[0])
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
          {/* > */}
          <Checkbox
            label={i18n.translate(
              'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.checkboxLabel',
            )}
            checked={excludeShippingRates.value}
            onChange={(value: boolean) => excludeShippingRates.onChange(value)}
          />
          {excludeShippingRates.value && (
            <>
              <div className={styles.ShippingRatesTextField}>
                <CurrencyField
                  id={EXCLUDE_SHIPPING_RATES_FIELD_ID}
                  currencyCode={currencyCode}
                  error={Boolean(maximumShippingPrice.error)}
                  labelHidden
                  label={i18n.translate(
                    'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.checkboxLabel',
                  )}
                  onChange={maximumShippingPrice.onChange}
                  value={String(maximumShippingPrice.value)}
                  positiveOnly
                />
              </div>
              {maximumShippingPrice?.error && (
                <InlineError
                  fieldID={EXCLUDE_SHIPPING_RATES_FIELD_ID}
                  message={maximumShippingPrice.error}
                />
              )}
            </>
          )}
          {/* </Card.Section> */}
        </VerticalStack>
      </Card>
    </Box>
  );
}
