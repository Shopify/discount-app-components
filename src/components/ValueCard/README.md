# ValueCard

The `ValueCard` component allows merchants to specify the value of a discount and its applicability. It provides options to set the discount as a fixed amount or a percentage, and to specify whether the discount applies to products or collections. The component also provides options for discounts on subscriptions and one-time purchases.

---

## Props

| Prop                       | Type                                              | Description                                                                                                                               |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `fixedAmountDiscountValue` | `Field<string>`                                   | The value of the discount if it's a fixed amount.                                                                                         |
| `percentageDiscountValue`  | `Field<string>`                                   | The value of the discount if it's a percentage.                                                                                           |
| `discountValueType`        | `Field<DiscountValueType>`                        | The type of the discount value. Can be either `DiscountValueType.FixedAmount` or `DiscountValueType.Percentage`.                          |
| `purchaseType`             | `Field<PurchaseType>`                             | The type of purchase the discount applies to. Can be `PurchaseType.OneTimePurchase`, `PurchaseType.Subscription`, or `PurchaseType.Both`. |
| `oncePerOrder`             | `Field<boolean>`                                  | Whether the discount should be applied once per order.                                                                                    |
| `discountClass`            | `DiscountClass`                                   | The class of the discount. Can be `DiscountClass.Product`, `DiscountClass.Order`, or `DiscountClass.Shipping`.                            |
| `currencyCode`             | `CurrencyCode`                                    | The currency code of the discount value.                                                                                                  |
| `sellsSubscriptions`       | `boolean`                                         | Whether the shop sells subscriptions.                                                                                                     |
| `isCodeDiscount`           | `boolean`                                         | Whether the discount is a code discount.                                                                                                  |
| `eligibility`              | `Field<AppliesToEligibility>` (optional)          | The eligibility of the discount. Can be either `AppliesToEligibility.Products` or `AppliesToEligibility.Collections`.                     |
| `selectedItems`            | `Field<ProductOrCollectionResource[]>` (optional) | An array of the selected products or collections.                                                                                         |
| `productSelector`          | `React.ReactNode` (optional)                      | A React node that is used to select products.                                                                                             |
| `collectionSelector`       | `React.ReactNode` (optional)                      | A React node that is used to select collections.                                                                                          |

---

## Examples

### Basic usage

```jsx
<ValueCard
  fixedAmountDiscountValue={fixedAmountDiscountValueField}
  percentageDiscountValue={percentageDiscountValueField}
  discountValueType={discountValueTypeField}
  purchaseType={purchaseTypeField}
  oncePerOrder={oncePerOrderField}
  discountClass={DiscountClass.Product}
  currencyCode="USD"
  sellsSubscriptions={true}
  isCodeDiscount={true}
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  productSelector={<ProductSelector />}
  collectionSelector={<CollectionSelector />}
/>
```

### Without product selector

```jsx
<ValueCard
  fixedAmountDiscountValue={fixedAmountDiscountValueField}
  percentageDiscountValue={percentageDiscountValueField}
  discountValueType={discountValueTypeField}
  purchaseType={purchaseTypeField}
  oncePerOrder={oncePerOrderField}
  discountClass={DiscountClass.Product}
  currencyCode="USD"
  sellsSubscriptions={true}
  isCodeDiscount={true}
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  collectionSelector={<CollectionSelector />}
/>
```

### Without collection selector

```jsx
<ValueCard
  fixedAmountDiscountValue={fixedAmountDiscountValueField}
  percentageDiscountValue={percentageDiscountValueField}
  discountValueType={discountValueTypeField}
  purchaseType={purchaseTypeField}
  oncePerOrder={oncePerOrderField}
  discountClass={DiscountClass.Product}
  currencyCode="USD"
  sellsSubscriptions={true}
  isCodeDiscount={true}
  eligibility={eligibilityField}
  selectedItems={selectedItemsField}
  productSelector={<ProductSelector />}
/>
```

### Without eligibility and selected items

```jsx
<ValueCard
  fixedAmountDiscountValue={fixedAmountDiscountValueField}
  percentageDiscountValue={percentageDiscountValueField}
  discountValueType={discountValueTypeField}
  purchaseType={purchaseTypeField}
  oncePerOrder={oncePerOrderField}
  discountClass={DiscountClass.Product}
  currencyCode="USD"
  sellsSubscriptions={true}
  isCodeDiscount={true}
/>
```

In these examples, `fixedAmountDiscountValueField`, `percentageDiscountValueField`, `discountValueTypeField`, `purchaseTypeField`, `oncePerOrderField`, `eligibilityField`, and `selectedItemsField` are state variables that you would define using the `useState` hook or similar. `ProductSelector` and `CollectionSelector` are hypothetical components that you would replace with your actual product and collection selector components.
