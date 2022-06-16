TODO: this file should be reviewed and updated before releasing publicly

# App provider

App provider is a required component that enables sharing global settings throughout the hierarchy of your application.

---

## Usage and best practices

The app provider component is required to use @shopify/discount-app-components-internal. Without it the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component.

**NOTE**
The @shopify/discount-app-components-internal project uses [@shopify/polaris](https://github.com/Shopify/polaris) and [@shopify/app-bridge-react](https://github.com/Shopify/app-bridge/tree/main/packages/app-bridge-react) under the hood, and you will also need to wrap your app root in the [Polaris AppProvider](https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/AppProvider/README.md) and the [AppBridge Provider](https://github.com/Shopify/app-bridge/blob/main/packages/app-bridge-react/src/components/Provider/README.md).

---

TODO include content and examples similar to polaris-react
