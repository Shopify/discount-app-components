import {useI18n} from '@shopify/react-i18n';

import type {
  REST_OF_WORLD,
  SupportedCountryCode as CountryCode,
} from '../../constants';
import type {Country} from '../../types';

/**
 * @returns a function that takes a country code or `REST_OF_WORLD` and returns a localized country object
 */
export function useLocalizeCountry(): (
  countryCode: CountryCode | typeof REST_OF_WORLD,
) => Country {
  const [i18n] = useI18n();

  return (countryCode) => ({
    id: countryCode,
    name: i18n.translate(countryCode, {
      scope: 'DiscountAppComponents.Countries',
    }),
  });
}
