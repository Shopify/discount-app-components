import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SelectedCountries} from '../SelectedCountries';
import {
  CountrySelectionType,
  SupportedCountryCode,
} from '../../../../../constants';

const COUNTRIES = [
  SupportedCountryCode.Ca,
  SupportedCountryCode.Us,
  SupportedCountryCode.De,
];

describe('<SelectedCountries />', () => {
  it('displays for all countries message for free shipping discount applying to all countries', () => {
    const selectedCountries = mountWithApp(
      <SelectedCountries
        selectedCountries={[]}
        countrySelectionType={CountrySelectionType.AllCountries}
      />,
    );

    expect(selectedCountries).toContainReactText('For all countries');
  });

  it('displays selected countries count for free shipping discount applying to multiple countries', () => {
    const countries = [...COUNTRIES];

    const selectedCountries = mountWithApp(
      <SelectedCountries
        countrySelectionType={CountrySelectionType.SelectedCountries}
        selectedCountries={countries}
      />,
    );

    expect(selectedCountries).toContainReactText(
      `For ${countries.length} countries`,
    );
  });

  it('displays selected country for free shipping discount applying to single country', () => {
    const countries = [COUNTRIES[0]];

    const selectedCountries = mountWithApp(
      <SelectedCountries
        countrySelectionType={CountrySelectionType.SelectedCountries}
        selectedCountries={countries}
      />,
    );

    expect(selectedCountries).toContainReactText('For Canada');
  });
});
