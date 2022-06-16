import React, {useMemo} from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

import {DiscountsI18nProvider} from './components';

import './AppProvider.scss';

export interface AppProviderProps {
  /**
   * Locale of the shop (e.g. `en-US`).
   */
  locale: string;

  /**
   * The shop's time zone as defined by the IANA (e.g. `America/Los_Angeles`).
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
      <DiscountsI18nProvider>{props.children}</DiscountsI18nProvider>
    </I18nContext.Provider>
  );
}
