import React from 'react';
import {
  ChoiceList,
  Checkbox,
  InlineError,
  Button,
  Text,
} from '@shopify/polaris';
import {CurrencyCode} from '@shopify/react-i18n';
import {mountWithApp, mockField} from 'tests/utilities';

import {CountriesAndRatesCard} from '../CountriesAndRatesCard';
import {CountrySelectionType, SupportedCountryCode} from '../../../constants';
import {CurrencyField} from '../../CurrencyField';
import {SelectedItemsList} from '../../SelectedItemsList';

describe('<CountriesAndRatesCard />', () => {
  const mockProps = {
    countrySelectionType: mockField(CountrySelectionType.AllCountries),
    maximumShippingPrice: mockField('100'),
    selectedCountries: mockField([
      SupportedCountryCode.Ca,
      SupportedCountryCode.Us,
    ]),
    excludeShippingRates: mockField(false),
    countrySelector: null,
    currencyCode: CurrencyCode.Cad,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const countriesAndRatesCard = mountWithApp(
      <CountriesAndRatesCard {...mockProps} />,
    );

    expect(countriesAndRatesCard).toContainReactComponent(Text, {
      children: 'Countries',
    });
    expect(countriesAndRatesCard).toContainReactComponent(ChoiceList, {
      title: 'Countries and rates',
      titleHidden: true,
      choices: expect.arrayContaining([
        {value: CountrySelectionType.AllCountries, label: 'All countries'},
        {
          value: CountrySelectionType.SelectedCountries,
          label: 'Specific countries',
        },
      ]),
    });
    expect(countriesAndRatesCard).toContainReactComponent(Text, {
      children: 'Shipping rates',
    });
    expect(countriesAndRatesCard).toContainReactComponent(Checkbox, {
      label: 'Exclude shipping rates over a certain amount',
    });
  });

  describe('Countries section', () => {
    it('does not render if countrySelectionType is All', () => {
      const props = {
        ...mockProps,
        countrySelectionType: {
          ...mockProps.countrySelectionType,
          value: CountrySelectionType.AllCountries,
        },
      };
      const countriesAndRatesCard = mountWithApp(
        <CountriesAndRatesCard {...props} />,
      );
      expect(countriesAndRatesCard).not.toContainReactComponent(
        SelectedItemsList,
        {
          items: expect.arrayContaining([
            {name: 'Canada', id: 'CA'},
            {name: 'United States', id: 'US'},
          ]),
        },
      );
    });

    it('renders if countrySelectionType is SelectedCountries', () => {
      const props = {
        ...mockProps,
        countrySelectionType: {
          ...mockProps.countrySelectionType,
          value: CountrySelectionType.SelectedCountries,
        },
      };
      const countriesAndRatesCard = mountWithApp(
        <CountriesAndRatesCard {...props} />,
      );
      expect(countriesAndRatesCard).toContainReactComponent(SelectedItemsList, {
        items: expect.arrayContaining([
          {name: 'Canada', id: 'CA'},
          {name: 'United States', id: 'US'},
        ]),
      });
    });

    it('calls onChange when country is removed', () => {
      const props = {
        ...mockProps,
        countrySelectionType: {
          ...mockProps.countrySelectionType,
          value: CountrySelectionType.SelectedCountries,
        },
      };
      const countriesAndRatesCard = mountWithApp(
        <CountriesAndRatesCard {...props} />,
      );
      countriesAndRatesCard?.find(Button)?.trigger('onClick');
      expect(mockProps.selectedCountries.onChange).toHaveBeenCalledWith(['US']);
    });
  });

  describe('Shipping Rates section', () => {
    it('renders CurrencyField when excludeShippingRates is true', () => {
      const props = {
        ...mockProps,
        excludeShippingRates: {
          ...mockProps.excludeShippingRates,
          value: true,
        },
      };
      expect(
        mountWithApp(<CountriesAndRatesCard {...props} />),
      ).toContainReactComponent(CurrencyField, {
        value: props.maximumShippingPrice.value,
      });
    });

    it('does not render CurrencyField when excludeShippingRates is false', () => {
      const props = {
        ...mockProps,
        excludeShippingRates: {
          ...mockProps.excludeShippingRates,
          value: false,
        },
      };
      expect(
        mountWithApp(<CountriesAndRatesCard {...props} />),
      ).not.toContainReactComponent(CurrencyField, {
        value: props.maximumShippingPrice.value,
      });
    });

    it('renders field error', () => {
      const props = {
        ...mockProps,
        excludeShippingRates: {
          ...mockProps.excludeShippingRates,
          error: 'Oh no! An error!',
          value: true,
        },
        maximumShippingPrice: {
          ...mockProps.maximumShippingPrice,
          error: 'Oh no! An error!',
        },
      };
      const countriesAndRatesCard = mountWithApp(
        <CountriesAndRatesCard {...props} />,
      );
      expect(countriesAndRatesCard).toContainReactComponent(InlineError, {
        message: props.maximumShippingPrice.error,
      });
    });

    it('calls maximumShippingPrice.onChange when CurrencyFields onChange is called', () => {
      const props = {
        ...mockProps,
        maximumShippingPrice: mockField(''),
        excludeShippingRates: mockField(true),
      };

      const countriesAndRatesCard = mountWithApp(
        <CountriesAndRatesCard {...props} />,
      );

      const mockValue = '11.00';
      countriesAndRatesCard.find(CurrencyField)?.trigger('onChange', mockValue);

      expect(props.maximumShippingPrice.onChange).toHaveBeenCalledWith(
        mockValue,
      );
    });
  });
});
