import React, {useMemo} from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import {Frame} from '@shopify/polaris';

import {DiscountsI18nProvider} from './components';

import './AppProvider.scss';

export interface AppProviderProps {
  /**
   * Locale of the shop (e.g. `en-US`).
   */
  locale: string;

  /**
   * The shop's time zone as defined by the IANA (e.g. `America/Los_Angeles`). This can be queried from the [Shop gql object](https://shopify.dev/api/admin-graphql/2022-07/objects/Shop#field-shop-ianatimezone).
   */
  ianaTimezone: string;

  children?: React.ReactNode;
}

const FALLBACK_TRANSLATIONS_LOCALE = 'en';

export function AppProvider(props: AppProviderProps) {
  if (!props.locale) {
    throw new Error('DiscountsAppProvider: locale is required');
  } else if (!props.ianaTimezone) {
    throw new Error('DiscountsAppProvider: ianaTimezone is required');
  }

  const i18nManager = useMemo(
    () =>
      new I18nManager({
        locale: props.locale,
        timezone: props.ianaTimezone,
        fallbackLocale: FALLBACK_TRANSLATIONS_LOCALE,
      }),
    [props.locale, props.ianaTimezone],
  );

  return (
    <I18nContext.Provider value={i18nManager}>
      <DiscountsI18nProvider>
        <Frame>{props.children}</Frame>
      </DiscountsI18nProvider>
    </I18nContext.Provider>
  );
}
