TODO: this file should be reviewed and updated before releasing publicly

# discount-app-components-internal

[![Build status](https://badge.buildkite.com/efd5a5b2a2543346b71426e60643af346fe06d0531f0827d27.svg)](https://buildkite.com/shopify/discount-app-components-internal)
[![npm Package Version](https://img.shields.io/npm/v/@shopify/discount-app-components)](https://www.npmjs.com/package/@shopify/discount-app-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

discount-app-components-internal is our working version of the eventual @shopify/discount-app-components-internal library, which will provide a set of stateless discount components to help 3p app developers create discount details pages with AppBridge.

## App development

For more information about creating apps for the Shopify App Store, see the [app development documentation](https://shopify.dev/apps).

## Using the repo

### Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/discount-app-components-internal --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/discount-app-components-internal
```

**Note** the project has `peerDependencies` on `@shopify/app-bridge`, `@shopify/app-bridge-react`, and `@shopify/polaris` which must be installed as well.

### Usage

1.  Import the CSS directly into your project if your asset packager supports it:

```js
import '@shopify/discount-app-components-internal/build/esm/styles.css';
```

Otherwise include the CSS in your HTML. We suggest copying the styles file into your own project, but you may also use it directly:

TODO we need to update this once we have a prod url

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/discount-app-components-internal@1.0.0/build/esm/styles.css"
/>
```

2. The component repository uses `@shopify/polaris` internally. Repeat step 1 with the styles.css from `@shopify/polaris` to include basic Polaris styles.

3. This library contains a number of locale-specific components, and you will be required to pass a `locale` and a `ianaTimezone` to the discounts AppProvider. Also, this library will require you to wrap your app in a Polaris AppProvider and an AppBridge AppProvider. A full example of an app root can be found below:

```js
import {Page, AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {Provider as AppBridgeProvider} from '@shopify/app-bridge-react';
import {AppProvider} from '@shopify/discount-app-components-internal';

import enPolarisTranslations from '@shopify/polaris/locales/en.json';

import "@shopify/polaris/build/esm/styles.css";
import "@shopify/discount-app-components-internal/build/esm/styles.css";

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

## Development

### Testing local changes in a consuming project

0. In your terminal, install [yalc](https://github.com/wclr/yalc) globally. `npm i yalc -g`

1. In your terminal, run `yalc publish --private` from the discount-app-components-internal repo

2. In your terminal, open a second tab in your consuming project's directory and run `yalc add @shopify/discount-app-components-internal`. This will the dependency to your project's package.json that resembles the following:

```json
"dependencies": {
...
"@shopify/discount-app-components-internal": "file:.yalc/@shopify/discount-app-components-internal",
...
}
```

3. Build your project to install the @shopify/discount-app-components-internal's dependencies (e.g. `yarn`). **NOTE** This may update your project's dependency lockfile, be cautious about committing changes added by importing @shopify/discount-app-components-internal locally.

#### To make changes in @shopify/discount-app-components-internal and update your yalc link

1. Republish your changes from @shopify/discount-app-components-internal with `yalc publish --private`
2. Update the dependency in your consuming project with `yalc update @shopify/discount-app-components-internal`

### Deploying a new version of the package to the internal registry

While building internally, we will deploy the NPM package to an internal [Cloudsmith](https://Cloudsmith.io/~shopify/repos) registry so we can test in consuming projects. We need to bump the package version whenever we deploy to Cloudsmith, otherwise it ignores the deploy.

0. If you haven't previously, request access to Cloudsmith through Okta. It will send you an email with a verification link.

**Carefully read _all_ the instructions before proceeding**

1. Create a PR to bump the version by running `yarn bump-version`.
   - By default, this will bump the version by one `minor` version
   - If you wish to bump by another version type, you can pass any of the flags from [yarn version]() (e.g. `yarn bump-version --patch`, `yarn bump-version --minor`, `yarn bump-version --major`)
2. After you merge the PR, wait for it to show up in shipit: https://shipit.shopify.io/shopify/discount-app-components-internal/package
3. Once the build finishes, click the Deploy button for the PR you wish to deploy. After you are redirected, click "Create deploy". (_\*note: this will also deploy any prior undeployed PRs_)
4. The deploy kicked off a build in shipit, which in turn triggers a [Buildkite build that deploys to Cloudsmith](https://buildkite.com/shopify/discount-app-components-internal-publish-package/builds).
5. Once the buildkite job completes, it should have deployed the package with your changes to Cloudsmith. Verify this by checking that the version number of [the package in Cloudsmith](https://cloudsmith.io/~shopify/repos/node/packages/detail/npm/@shopify%252Fdiscount-app-components-internal) matches what you deployed.

_(\*NOTE: The above is a convenience to bump the version. If you want to have more control over the version bump, you can follow the [steps from the handbook](https://development.shopify.io/engineering/keytech/reference/packages/Cloudsmith_nodejs#2_Versioning_and_tagging))_

## Troubleshooting

### Can't import the named export `XYZ` from non EcmaScript module (only default export is available)

If you run into an error that resembles the following

```shell
ERROR in ./node_modules/@shopify/react-i18n/build/esm/i18n.mjs 406:68-76
Can't import the named export 'TimeUnit' from non EcmaScript module (only default export is available)
 @ ./node_modules/@shopify/react-i18n/build/esm/index.mjs
 @ ./node_modules/@shopify/react-i18n/index.mjs
 @ ./node_modules/@shopify/discount-app-components-internal/build/esm/components/FormattedNumberField/FormattedNumberField.js
 @ ./node_modules/@shopify/discount-app-components-internal/build/esm/index.js
 @ ./src/App.js
 @ ./src/index.js
```

you will need to update your webpack.config.js to include a module.rules of:

```json
{
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
}
```
