# AppliesTo

The `AppliesTo` component allows merchants to specify the eligibility of a discount to either products or collections. The component provides a choice list for the merchant to select between products and collections, and then displays a list of the selected items.

---

## Props

| Prop                 | Type                                   | Description                                                                                                                     |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `eligibility`        | `Field<AppliesToEligibility>`          | Specifies the eligibility of the discount. Can be either `AppliesToEligibility.Products` or `AppliesToEligibility.Collections`. |
| `selectedItems`      | `Field<ProductOrCollectionResource[]>` | An array of the selected products or collections.                                                                               |
| `productSelector`    | `React.ReactNode` (optional)           | A React node that is used to select products.                                                                                   |
| `collectionSelector` | `React.ReactNode` (optional)           | A React node that is used to select collections.                                                                                |

---

## Examples

### Basic usage

```jsx
<AppliesTo
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  productSelector={<ProductSelector />}
  collectionSelector={<CollectionSelector />}
/>
```

In this example, `eligibilityField` and `selectedItemsField` are state variables that you would define using the `useState` hook or similar. `ProductSelector` and `CollectionSelector` are hypothetical components that you would replace with your actual product and collection selector components.

### Without product selector

```jsx
<AppliesTo
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  collectionSelector={<CollectionSelector />}
/>
```

In this example, the `productSelector` prop is omitted, so the `AppliesTo` component will automatically set the `eligibility` to `AppliesToEligibility.Collections`.

### Without collection selector

```jsx
<AppliesTo
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  productSelector={<ProductSelector />}
/>
```

In this example, the `collectionSelector` prop is omitted, so the `AppliesTo` component will automatically set the `eligibility` to `AppliesToEligibility.Products`.
