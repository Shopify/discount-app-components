# UsageLimitsCard

The `UsageLimitsCard` enables users to set limits on how many times a discount may be used. The user may specify:

- The total number of uses for a discount
- Limit to one use per customer
- (if for a recurring discount) Limit to the 1st payment
- (if for a recurring discount) Limit to a set number of recurring payments
- (if for a recurring discount) Allow the discount to be applied for all recurring payments

---

## Usage and best practices

- The card contains a checkbox to toggle the visibility of the `totalUsageLimit` input, initialized as checked if `totalUsageLimit !== null`. Toggling the checkbox from an unchecked state will call `totalUsageLimit.onChange` with an empty string. Toggling the checkbox from a checked state will call `totalUsageLimit.onChange` with null.
- The recurring payment section is displayed only if `isRecurring` is passed.

## Examples

### Basic UsageLimitsCard

```jsx
<UsageLimitsCard
  totalUsageLimit={totalUsageLimitField}
  oncePerCustomer={oncePerCustomerField}
/>
```

### UsageLimitsCard with recurring payment section

```jsx
<UsageLimitsCard
  totalUsageLimit={totalUsageLimitField}
  oncePerCustomer={oncePerCustomerField}
  isRecurring
  recurringPaymentType={recurringPaymentTypeField}
  recurringPaymentsLimit={recurringPaymentsLimitField}
/>
```
