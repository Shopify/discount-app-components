import React, {Fragment, StrictMode} from 'react';
import {PolarisTestProvider} from '@shopify/polaris';

import {AppProvider} from '../AppProvider';

export interface DiscountAppComponentsTestProviderProps {
  /**
   * Locale of the shop (e.g. `en-US`).
   */
  locale?: string;

  /**
   * The shop's time zone as defined by the IANA (e.g. `America/Los_Angeles`).
   */
  ianaTimezone?: string;

  /** Inner content of the application */
  children?: React.ReactNode;
}

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_IANA_TIMEZONE = 'America/Los_Angeles';

export function DiscountAppComponentsTestProvider(
  props: DiscountAppComponentsTestProviderProps & {
    strict?: boolean;
  },
) {
  const Wrapper = props.strict ? StrictMode : Fragment;

  return (
    <Wrapper>
      <AppProvider
        locale={props.locale || DEFAULT_LOCALE}
        ianaTimezone={props.ianaTimezone || DEFAULT_IANA_TIMEZONE}
      >
        <PolarisTestProvider>
          <>{props.children}</>
        </PolarisTestProvider>
      </AppProvider>
    </Wrapper>
  );
}
