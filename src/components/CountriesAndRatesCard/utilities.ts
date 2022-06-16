import {useMemo} from 'react';
import {useI18n} from '@shopify/react-i18n';

import type {Country, CountryCode} from '~/types';

/**
 * @param countryCodes - a list of country codes or `REST_OF_WORLD`
 * @returns a list of country objects with country names localized in the current locale
 */
export function useLocalizeCountryList(countryCodes: CountryCode[]): Country[] {
  const [i18n] = useI18n();

  const localizedCountryList = useMemo(
    () =>
      countryCodes.map((countryCode) => ({
        id: countryCode,
        name: i18n.translate(countryCode, {
          scope: 'DiscountAppComponents.Countries',
        }),
      })),
    [i18n, countryCodes],
  );

  return localizedCountryList;
}
