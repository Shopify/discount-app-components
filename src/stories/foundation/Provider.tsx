import React from 'react';

import enPolarisTranslations from '@shopify/polaris/locales/en.json';

import '@shopify/polaris/build/esm/styles.css';

import {AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {AppProvider} from '../../components/AppProvider';

export function Provider({children}: {children: React.ReactNode}) {
  const i18n = {
    locale: 'en',
    ianaTimezone: 'America/New_York',
  };

  return (
    <>
      <PolarisAppProvider i18n={enPolarisTranslations}>
        <AppProvider ianaTimezone={i18n.ianaTimezone} locale={i18n.locale}>
          {children}

          <pre
            style={{
              position: 'fixed',
              bottom: 0,
              whiteSpace: 'break-spaces',
              margin: '12px',
              background: 'rgb(255 0 0 / 20%)',
            }}
          >
            Rendering with locale={i18n.locale}, timezone={i18n.ianaTimezone}.
            Modify these values in <em>src/stories/foundation/Provider.tsx</em>
          </pre>
        </AppProvider>
      </PolarisAppProvider>
    </>
  );
}
