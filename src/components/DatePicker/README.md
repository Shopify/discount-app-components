# DatePicker

The DatePicker component provides an input that allows users to select a date from a calendar popover or enter one into a text input.

The calendar is powered by a [Polaris DatePicker](https://polaris.shopify.com/components/selection-and-input/date-picker) under the hood.

---

## Usage and best practices

- The `date` value should be provided as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC. For example, 3:30 pm on April 16, 2022 in the time zone of UTC (Coordinated Universal Time) is represented as `2022-04-16T15:50:00Z`.
- The `date` value will be displayed according to the `ianaTimezone` passed to the AppProvider. For example:
  - For a date of `2022-04-12T14:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `2022-04-12`.
  - For a date of `2022-04-12T03:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `2022-04-11` since the time in `America/New_York` is `11:31pm`.
- The `disableDatesBefore` value should be provided as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC. For example, 3:30 pm on April 16, 2022 in the time zone of UTC (Coordinated Universal Time) is represented as "2022-04-16T15:50:00Z".
- Changing the date calls the `date.onChange` function with a datetime value in UTC. **NOTE** The passed date's time is preserved when the date is changed. For example: for an initial date value of `2022-04-16T15:50:00Z`, if a date of '2022-05-20' is selected the `date.onChange` will be called with a value of `2022-05-20T15:50:00Z`.

## Examples

### Basic DatePicker

```jsx
<DatePicker date={dateField} label="Start date" />
```

### DatePicker with dates prior to today disabled

```jsx
const nowInUTC = new Date().toISOString();

<DatePicker
  date={dateField}
  label="Start date"
  disableDatesBefore={nowInUTC}
/>;
```

### DatePicker with input disabled

```jsx
<DatePicker date={dateField} label="Start date" disabled />
```

### DatePicker with custom weekStartsOn

Sets which day should be used as the start of week

```jsx
<DatePicker date={dateField} label="Start date" weekStartsOn={Weekday.Friday} />
```
