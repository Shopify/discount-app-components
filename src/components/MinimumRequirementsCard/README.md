# MinimumRequirementsCard

The minimum requirements card enables a merchant to set the minimum subtotal or quantity for an automatic discount, or subtotal, quantity, or "no minimum" for code discounts.

---

## Usage and best practices

- The MinimumRequirementsCard listens for changes to `discountMethod`, and updates the default selection to `Subtotal` if the new `discountMethod` is `Automatic` and the selection was `None` (not a valid selection for `discountMethod=Code`)

## Examples

### Basic usage

```jsx
<MinimumRequirementsCard
  appliesTo={AppliesTo.Products}
  currencyCode={CurrencyCode.Cad}
  requirementType={requirementTypeField}
  subtotal={subtotalField}
  quantity={quantityField}
  discountMethod={discountMethod}
/>
```

### When used in a recurring discount context

```jsx
<MinimumRequirementsCard
  appliesTo={AppliesTo.Products}
  currencyCode={CurrencyCode.Cad}
  requirementType={requirementTypeField}
  subtotal={subtotalField}
  quantity={quantityField}
  discountMethod={discountMethod}
  isRecurring
/>
```

## Related components

- [CurrencyField](../CurrencyField/)
