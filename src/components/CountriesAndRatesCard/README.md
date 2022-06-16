## Countries and Rates Card

This component enables merchants to select if a discount will apply to all countries or specific countries. The merchant may also provide an upper bound for shipping rates so that a discount can be limited only to shipping situations that are financially viable for the merchant.

---

## Usage and best practices

- This component is typically used in discounts that impact shipping rates
- The `Country` object expects a country code and a localized country name. We recommend using [@shopify/address's `getCountries()` utility](https://github.com/Shopify/quilt/tree/main/packages/address#async-getcountries-promisecountry) as your source for localized country names.

## Examples

### Basic usage

```jsx
<CountriesAndRatesCard
  selectedCountries={selectedCountriesField}
  countrySelectionType={countrySelectionTypeField}
  maximumShippingPrice={maximumShippingPriceField}
  excludeShippingRates={excludeShippingRatesField}
  countrySelector={
    <CountrySelector selectedCountries={selectedCountriesField} />
  }
/>
```
