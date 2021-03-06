# discount-app-components

[![npm Package Version](https://img.shields.io/npm/v/@shopify/discount-app-components)](https://www.npmjs.com/package/@shopify/discount-app-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

`@shopify/discount-app-components` provides a set of stateless discount components to help 3p app developers create [AppBridge](https://shopify.dev/apps/tools/app-bridge)-powered discounts apps.

## App development

For more information about creating apps for the Shopify App Store, see the [app development documentation](https://shopify.dev/apps).

---

## Using the repo

### Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/discount-app-components --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/discount-app-components
```

> 🛑 The project has `peerDependencies` of `@shopify/app-bridge`, `@shopify/app-bridge-react`, and `@shopify/polaris` which must also be installed in your app.

### Usage

1.  Import the CSS for this repo and Polaris directly into your project if your asset packager supports it:

    ```js
    import '@shopify/discount-app-components/build/esm/styles.css';
    import '@shopify/polaris/build/esm/styles.css';
    ```

    Otherwise include the CSS in your HTML. We suggest copying the styles file into your own project, but you may also use it directly:

    ```html
    <link
      rel="stylesheet"
      href="https://unpkg.com/@shopify/discount-app-components@<your version number>/build/esm/styles.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@shopify/polaris@<your version number>/build/esm/styles.css"
    />
    ```

2.  This library contains a number of locale-specific components, and you will be required to pass a `locale` and a `ianaTimezone` to the discounts AppProvider. Also, this library will require you to wrap your app in a Polaris AppProvider and an AppBridge AppProvider. A full example of an app root can be found below:

    ```js
    import {Page, AppProvider as PolarisAppProvider} from '@shopify/polaris';
    import {Provider as AppBridgeProvider} from '@shopify/app-bridge-react';
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
        <AppBridgeProvider config={/* pass your app bridge config here */}>
          <PolarisAppProvider i18n={enPolarisTranslations}>
            <AppProvider locale="en-US" ianaTimezone="America/Los_Angeles">
              <Page title="Example app">
                {/* Add your discount components here */}
              </Page>
            </AppProvider>
          </PolarisAppProvider>
        </AppBridgeProvider>
      );
    }
    ```

---

## Development

### Testing local changes in a consuming project

0. In your terminal, install [yalc](https://github.com/wclr/yalc) globally. `npm i yalc -g`

1. In your terminal, run `yalc publish --private` from the discount-app-components repo

2. In your terminal, open a second tab in your consuming project's directory and run `yalc add @shopify/discount-app-components`. This will the dependency to your project's package.json that resembles the following:

```json
"dependencies": {
...
"@shopify/discount-app-components": "file:.yalc/@shopify/discount-app-components",
...
}
```

3. Build your project to install the @shopify/discount-app-components's dependencies (e.g. `yarn`). **NOTE** This may update your project's dependency lockfile, be cautious about committing changes added by importing @shopify/discount-app-components locally.

#### To make changes in @shopify/discount-app-components and update your yalc link

1. Republish your changes from @shopify/discount-app-components with `yalc publish --private`
2. Update the dependency in your consuming project with `yalc update @shopify/discount-app-components`
   - Note that you may need to `rm -rf ./node_modules && rm -rf .yalc && yarn` for the changes to apply.

---

## Troubleshooting

### Can't import the named export `XYZ` from non EcmaScript module (only default export is available)

If you run into an error that resembles the following:

```shell
ERROR in ./node_modules/@shopify/react-i18n/build/esm/i18n.mjs 406:68-76
Can't import the named export 'TimeUnit' from non EcmaScript module (only default export is available)
 @ ./node_modules/@shopify/react-i18n/build/esm/index.mjs
 @ ./node_modules/@shopify/react-i18n/index.mjs
 @ ./node_modules/@shopify/discount-app-components/build/esm/components/FormattedNumberField/FormattedNumberField.js
 @ ./node_modules/@shopify/discount-app-components/build/esm/index.js
 @ ./src/App.js
 @ ./src/index.js
```

You may need to update your webpack.config.js to include a `module.rules` of:

```json
{
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
}
```
