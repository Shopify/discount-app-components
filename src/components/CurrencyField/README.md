## CurrencyField

A text input that formats a numeric value as a currency, according to currencyCode passed to the component and the locale passed to the AppProvider.

---

## Usage and best practices

- The input expects the passed `value` property to be a valid numeric value OR an empty string
- The component formats the `value` property according to the `props.currencyCode` and the `locale` passed to the AppProvider. For example, given a locale of `fr` and an initial value of `100000.45`, the input will display `100 000,45`.
- **Important note** Unlike other components provided by this repo, this component is _not_ a fully controlled component and the input value of the field is stored in internal component state. The `props.onChange` is triggered with the real numeric (read: not currency formatted) value of the input when the field is blurred. For example, given a locale of `fr` and an input value of `100 000,45`, the `props.onChange` will be called with a value of `100000.45`.
  - If you need to trigger an action when the input is changed but _before_ the `props.onChange` is called on blur (e.g. clearing an error value when the input changes), you can provide a callback to `props.onInput`. It is _strongly_ recommended that you do not use `onInput` to control the internal state of the component as the Shopify graphql API expects non-formatted numbers.
- The component uses [@shopify/react-i18n](https://github.com/Shopify/quilt/blob/main/packages/react-i18n)'s `formatCurrency` and `unformatCurrency` under the hood

## Examples

### Basic usage

```jsx
<CurrencyField
  currencyCode={CurrencyCode.Usd}
  label="Some label"
  onChange={someField.onChange}
  value={someField.value}
/>
```

...

## Related components

- [FormattedNumberField](../FormattedNumberField/)
