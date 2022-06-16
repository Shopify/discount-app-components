# TimePicker

The TimePicker component provides an input that allows users to select a time from a dropdown or enter one into a text input.

The dropdown contains a set of 30 minute time intervals in the active shop's timezone. By default the dropdown will contain intervals for an entire day (e.g. 12:00a, ..., 11:30p), but is restricted to values after the current time if the passed date is the same as the current date.

---

## Usage and best practices

- The `time` value should be provided as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC. For example, 3:30 pm on April 16, 2022 in the time zone of UTC (Coordinated Universal Time) is represented as "2022-04-16T15:50:00Z".
- The time value will be displayed according to the `ianaTimezone` passed to the AppProvider. For example:
  - For a time of `2022-04-12T14:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `10:31 am`.
  - For a time of `2022-04-12T03:31:55.722Z` and an ianaTimezone of `America/New_York`, the displayed date is `11:31 pm` (on 2022-04-11).
- The `disableTimesBefore` value should be provided as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC. For example, 3:30 pm on April 16, 2022 in the time zone of UTC (Coordinated Universal Time) is represented as "2022-04-16T15:50:00Z".
- Changing the date calls the `time.onChange` function with a datetime value in UTC.
- It is recommended that the `label` contains the timezone that is being applied (e.g. `Start time (PST)`)

## Examples

### Basic TimePicker

```jsx
<TimePicker time={timeField} label="Start time (PST)" />
```

### TimePicker with times before now disabled

```jsx
const nowInUTC = new Date().toISOString();

<TimePicker
  time={timeField}
  label="Start time (PST)"
  disableTimesBefore={nowInUTC}
/>;
```
