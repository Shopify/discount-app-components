# App provider

App provider is a required component that enables sharing global settings throughout the hierarchy of your application.

## Examples

### Usage

```js
import {Page, AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {AppProvider} from '@shopify/discount-app-components';

// See [Polaris AppProvider documentation](https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/AppProvider/README.md#using-translations) for more details on using Polaris translations
import enPolarisTranslations from '@shopify/polaris/locales/en.json';

// Import polaris styles
import "@shopify/polaris/build/esm/styles.css";

// Import this discount-app-components styles
import "@shopify/discount-app-components/build/esm/styles.css";

export default function App() {

  ...

  return (
      <PolarisAppProvider i18n={enPolarisTranslations}>
        <AppProvider locale="en-US" ianaTimezone="America/Los_Angeles">
          <Page title="Example app">
            {/* Add your discount components here */}
          </Page>
        </AppProvider>
      </PolarisAppProvider>
  );
}
```

---

## Using translations

Translations for `@shopify/discount-app-components` reside in the repository and are loaded by the AppProvider. Translations are loaded based on the locale passed into the `AppProvider`. You can see the full set of supported locales in the top level [/locales](https://github.com/Shopify/discount-app-components/tree/main/locales) folder.

---

## Testing components

You must include the discounts app context and polaris app context when writing tests that include `@shopify/discount-app-components` components. For your convenience, we've provided a [DiscountAppComponentsTestProvider component](https://github.com/Shopify/discount-app-components/blob/main/src/components/DiscountAppComponentsTestProvider/DiscountAppComponentsTestProvider.tsx) to provide these contexts.
