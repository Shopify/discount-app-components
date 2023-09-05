import React from 'react';
import {List} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import {CountrySelectionType} from '../../../../constants';
import type {CountryCode} from '../../../../types';

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.SelectedCountries',
};

export interface SelectedCountriesProps {
  /**
   * The country selection type that the discount applies to (all, selected countries)
   */
  countrySelectionType: CountrySelectionType;

  /**
   * List of country codes where the discount applies
   */
  selectedCountries: CountryCode[];
}

export function SelectedCountries({
  countrySelectionType,
  selectedCountries,
}: SelectedCountriesProps) {
  const [i18n] = useI18n();

  if (
    countrySelectionType === CountrySelectionType.SelectedCountries &&
    selectedCountries.length === 0
  ) {
    return null;
  }

  if (countrySelectionType === CountrySelectionType.AllCountries) {
    return (
      <List.Item>{i18n.translate('forAllCountries', I18N_SCOPE)}</List.Item>
    );
  }

  return selectedCountries.length === 1 ? (
    <List.Item>
      {i18n.translate('forSpecificCountry', I18N_SCOPE, {
        countryName: i18n.translate(selectedCountries[0], {
          scope: 'DiscountAppComponents.Countries',
        }),
      })}
    </List.Item>
  ) : (
    <List.Item>
      {i18n.translate('forNumberOfCountries', I18N_SCOPE, {
        numberOfCountries: selectedCountries.length,
      })}
    </List.Item>
  );
}
