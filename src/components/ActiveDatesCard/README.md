# ActiveDatesCard

The ActiveDatesCard component provides functionality to select a start and end date/time.

The card contains a checkbox to toggle the visibility of the end date, and is unchecked initially if the start and end dates are the same OR if the end date is null. Toggling the checkbox from an unchecked state will call `endDate.onChange` with the `startDate.value`'s end of day. Toggling the checkbox from a checked state will call `endDate.onChange` with null.

---

## Usage and best practices

- The start date and time pickers are disabled before the current time.
- The end date and time pickers are disabled before the startDate or the current time, whichever is later.
- The `date` values should be provided as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamps in UTC. For example, 3:30 pm on April 16, 2022 in the time zone of UTC (Coordinated Universal Time) is represented as `2022-04-16T15:50:00Z`.
- `date` values will be displayed according to the `ianaTimezone` passed to the AppProvider. For example:
  - For a date of `2022-04-12T14:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `2022-04-12`.
  - For a date of `2022-04-12T03:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `2022-04-11` since the time in `America/New_York` is `11:31pm`.
- `time` values will be displayed according to the `ianaTimezone` passed to the AppProvider. For example:
  - For a time of `2022-04-12T14:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `10:31 am`.
  - For a time of `2022-04-12T03:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `11:31 pm` (on 2022-04-11).
- Changing the start date or time calls the `startDate.onChange` function with a datetime value in UTC.
- Changing the end date or time calls the `endDate.onChange` function with a datetime value in UTC.
- Whenever any date or time is set, the end date is checked to be after the start date. If it isn't, the time is set to the end of day of the start date.

## Examples

### Basic ActiveDatesCard

```jsx
<ActiveDatesCard
  startDate={startDateField}
  endDate={endDateField}
  timezoneAbbreviation="EST"
/>
```

### ActiveDatesCard with inputs disabled

```jsx
<ActiveDatesCard
  startDate={startDateField}
  endDate={endDateField}
  timezoneAbbreviation="EST"
  disabled
/>
```

### ActiveDatesCard with custom weekStartsOn

Sets which day should be used as the start of week

```jsx
<ActiveDatesCard
  startDate={startDateField}
  endDate={endDateField}
  timezoneAbbreviation="EST"
  disabled
  weekStartsOn={Weekday.Friday}
/>
```

## Related components

- The component renders a [`DatePicker`](https://github.com/Shopify/discount-app-components/tree/main/src/components/DatePicker)
- The component renders a [`TimePicker`](https://github.com/Shopify/discount-app-components/tree/main/src/components/TimePicker)
