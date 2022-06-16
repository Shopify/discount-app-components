# CustomerEligibilityCard

This component enables merchants to select if a discount will apply to all customers or to a select set of customers or customer segments. The app developer should supply modal selectors for both customer and customer segment selection (see documentation).

---

## Examples

### Basic usage

```jsx
<CustomerEligibilityCard
  eligibility={eligibilityField}
  selectedCustomerSegments={selectedCustomerSegmentsField}
  selectedCustomers={selectedCustomersField}
  customerSegmentSelector={
    <CustomerSegmentSelector
      selectedCustomerSegments={selectedCustomerSegmentsField}
    />
  }
  customerSelector={
    <CustomerSegmentSelector selectedCustomers={selectedCustomersField} />
  }
/>
```
