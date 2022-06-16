# SummaryCard

The SummaryCard displays basic information about the state of a discount and may display more advanced configuration options if any `OptionalSectionsProps` are passed. None, any, or all optional sections may be displayed. We recommend displaying as many sections as you have data for, in order to give as much information to the merchant about their discount as possible.

---

## Usage and best practices

- The Header and Performance sections are reqiured, everything else is optional
- All top-level `*Card` components exported by the repo have one (or more) associated sections on the SummaryCard.

## Examples

### Basic usage

SummaryCard with only required fields

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
/>
```

### SummaryCard with free-text additional options

The SummaryCard accepts a `additionalDetails: string[]` prop which renders options at the top of the `Details` section

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  additionalDetails={['Additional detail #1', 'Additional detail #2']}
/>
```

### SummaryCard with "purchase type" section

The SummaryCard accepts a `appliesToPurchaseType` prop which renders a purchase type (e.g. one-time, subscription, both) section.

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  appliesToPurchaseType={{
    purchaseType: PurchaseType.Subscription,
  }}
/>
```

### SummaryCard with "active dates" section

The SummaryCard accepts a `activeDates` prop which renders a section that describes the discounts active dates

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  activeDates={{
    startDate: '2022-06-13T04:30:00.000Z',
    endDate: null,
  }}
/>
```

### SummaryCard with a "minimum requirements" section

The SummaryCard accepts a `minimumRequirements` prop which renders a section for the minimum discount purchase requirements (e.g. minimum subtotal, minimum purchase quantity)

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  minimumRequirements={{
    requirementType: RequirementType.Subtotal,
    subtotal: '100',
    currencyCode: CurrencyCode.Usd,
  }}
/>
```

### SummaryCard with a "recurring payment" section

The SummaryCard accepts a `recurringPayment` prop which renders a section that describes how the discount applies on recurring payment orders (e.g. subscription)

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  recurringPayment={{
    isRecurring: true,
    recurringPaymentType: RecurringPaymentType.AllPayments,
  }}
/>
```

### SummaryCard with a "usage limits" section

The SummaryCard accepts a `usageLimits` prop which renders a section that describes how many times the discount may be used

```jsx
<SummaryCard
  header={{
    discountMethod: DiscountMethod.Automatic,
    appDiscountType: 'Custom discount type',
    discountDescriptor: 'Spring Sale - 20% off',
    isEditing: true,
    discountStatus: DiscountStatus.Active,
  }}
  performance={{
    status: DiscountStatus.Scheduled,
    usageCount: 0,
  }}
  usageLimits={{
    totalUsageLimit: '250',
    oncePerCustomer: false,
  }}
/>
```
