# CombinationCard

The CombinationCard enables merchants to control how they wish a discount to combine with other combinable discounts in their shop. Currently, the following discount combinations are possible:

| discountClass | can combine with  |
| ------------- | ----------------- |
| PRODUCT       | PRODUCT, SHIPPING |
| ORDER         | SHIPPING          |
| SHIPPING      | PRODUCT, ORDER    |

---

## Examples

### Basic usage

```jsx
<CombinationCard
  combinableDiscountTypes={combinableDiscountTypesField}
  combinableDiscountCounts={{
    orderDiscountsCount: 0,
    productDiscountsCount: 3,
    shippingDiscountsCount: 0,
  }}
  discountClass={DiscountClass.Product}
  discountDescriptor="Spring Sale - 20% off"
/>
```

### Editing mode

When the discount page is in a `editing` (rather than `creating`) state, pass the discount ID to filter the current discount out from the combinations modal.

```jsx
<CombinationCard
  combinableDiscountTypes={combinableDiscountTypesField}
  combinableDiscountCounts={{
    orderDiscountsCount: 0,
    productDiscountsCount: 3,
    shippingDiscountsCount: 0,
  }}
  discountClass={DiscountClass.Product}
  discountDescriptor="Spring Sale - 20% off"
  discountId="gid://Shopify/DiscountNode/1"
/>
```
