import React, {useState, useEffect} from 'react';

import {Page, Button, Modal, ChoiceList} from '@shopify/polaris';
import {CountriesAndRatesCard} from '../../../components/CountriesAndRatesCard';

import {useLocalizeCountry} from '../../../';

import {
  CountrySelectionType,
  REST_OF_WORLD,
  SupportedCountryCode,
} from '../../../constants';
import {CountryCode, Field} from '../../../types';
import {CurrencyCode} from '@shopify/react-i18n';

const ALL_SHOP_COUNTRIES: CountryCode[] = [
  SupportedCountryCode.Ca,
  SupportedCountryCode.Us,
  SupportedCountryCode.De,
  REST_OF_WORLD,
];

export default function CountriesAndRatesCardPattern() {
  const [countrySelectionType, setCountrySelectionType] = useState(
    CountrySelectionType.SelectedCountries,
  );
  const [excludeShippingRates, setExcludeShippingRates] =
    useState<boolean>(false);
  const [maximumShippingPrice, setMaximumShippingPrice] = useState<string>("");
  const [countries, setCountries] = useState<CountryCode[]>([
    ALL_SHOP_COUNTRIES[0],
    ALL_SHOP_COUNTRIES[1],
  ]);
  const selectedCountriesField = {value: countries, onChange: setCountries};
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onBlur = () => {
    setMaximumShippingPrice("");
  };

  return (
    <Page>
      <CountriesAndRatesCard
        selectedCountries={selectedCountriesField}
        countrySelectionType={{
          value: countrySelectionType,
          onChange: setCountrySelectionType,
        }}
        maximumShippingPrice={{
          value: maximumShippingPrice,
          onChange: setMaximumShippingPrice,
          onBlur: onBlur,
        }}
        excludeShippingRates={{
          value: excludeShippingRates,
          onChange: setExcludeShippingRates,
        }}
        countrySelector={
          <CountryModal
            selectedCountries={selectedCountriesField}
            open={modalOpen}
            toggleModal={() => setModalOpen((open) => !open)}
            countries={ALL_SHOP_COUNTRIES}
          />
        }
        currencyCode={CurrencyCode.Cad}
      />
    </Page>
  );
}

function CountryModal({
  selectedCountries,
  open,
  toggleModal,
  countries,
}: {
  selectedCountries: Field<CountryCode[]>;
  open: boolean;
  toggleModal(): void;
  countries: CountryCode[];
}) {
  const localizeCountry = useLocalizeCountry();

  const [selected, setSelected] = useState<CountryCode[]>(
    () => selectedCountries.value,
  );
  useEffect(
    () => setSelected(selectedCountries.value),
    [selectedCountries.value],
  );

  const handleClose = () => {
    selectedCountries.onChange(selected);
    toggleModal();
  };

  const resetModal = () => {
    setSelected(selectedCountries.value);
    toggleModal();
  };

  return (
    <Modal
      activator={<Button onClick={toggleModal}>Browse</Button>}
      open={open}
      onClose={handleClose}
      title="Select countries"
      primaryAction={{
        content: 'Confirm',
        onAction: handleClose,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: resetModal,
        },
      ]}
      sectioned
    >
      <ChoiceList
        allowMultiple
        title="Select countries"
        choices={countries.map((countryCode) => {
          const country = localizeCountry(countryCode);

          return {
            label: country.name,
            value: country.id,
          };
        })}
        selected={selected.map((countryCode) => countryCode)}
        onChange={(nextValue: string[]) => {
          setSelected(
            nextValue.map(
              (selectedCountryCode) =>
                countries.find(
                  (countryCode) => countryCode === selectedCountryCode,
                )!,
            ),
          );
        }}
      />
    </Modal>
  );
}
