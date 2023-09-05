import React from 'react';
import {Text, Card, Checkbox, FormLayout, Box} from '@shopify/polaris';
import {isSameDay} from '@shopify/dates';
import {useI18n} from '@shopify/react-i18n';

import {DatePicker} from '../DatePicker';
import {TimePicker} from '../TimePicker';
import {
  getDateInUTC,
  getDateTimeInShopTimeZone,
  getNewDateAtEndOfDay,
} from '../../utilities/dates';
import {DEFAULT_WEEK_START_DAY, Weekday} from '../../constants';
import type {DateTime, Field} from '../../types';

export interface ActiveDatesCardProps {
  /**
   * Field to be used for the start date picker, with a DateTime value represented as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC
   */
  startDate: Field<DateTime>;

  /**
   * Field to be used for the end date picker, with a DateTime value represented as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC
   */
  endDate: Field<DateTime | null>;

  /**
   * The shop's time zone abbreviation. This can be queried from the [Shop gql object](https://shopify.dev/api/admin-graphql/2022-07/objects/Shop#field-shop-timezoneabbreviation).
   */
  timezoneAbbreviation: string;

  /**
   * (optional) The day that should be used as the start of the week.
   *
   * @default Weekday.Sunday
   */
  weekStartsOn?: Weekday;

  /**
   * (optional) Disables all inputs
   *
   * @default false
   */
  disabled?: boolean;
}

export function ActiveDatesCard({
  startDate,
  endDate,
  timezoneAbbreviation,
  weekStartsOn = DEFAULT_WEEK_START_DAY,
  disabled,
}: ActiveDatesCardProps) {
  const [i18n] = useI18n();
  const nowInUTC = new Date();

  const ianaTimezone = i18n.defaultTimezone!;
  const showEndDate = Boolean(endDate.value);

  // When start date or time changes, updates the end date to be later than start date (if applicable)
  const handleStartDateTimeChange = (nextStart: DateTime) => {
    startDate.onChange(nextStart);

    if (endDate.value) {
      const nextEndDate = getValidEndDateTime(
        nextStart,
        endDate.value,
        ianaTimezone,
      );

      if (nextEndDate !== endDate.value) {
        endDate.onChange(nextEndDate);
      }
    }
  };

  // When end date or time changes, verify that the new end date is later than the start time
  const handleEndDateTimeChange = (requestedEndDate: DateTime) => {
    const nextEndDate = getValidEndDateTime(
      startDate.value,
      requestedEndDate,
      ianaTimezone,
    );

    endDate.onChange(nextEndDate);
  };

  const handleShowEndDateChange = () => {
    if (showEndDate) {
      endDate.onChange(null);
    } else {
      const startDateInShopTZ = getDateTimeInShopTimeZone(
        startDate.value,
        ianaTimezone,
      );

      const endDateAtEndOfDay = getDateInUTC(
        getNewDateAtEndOfDay(startDateInShopTZ),
        ianaTimezone,
      );

      endDate.onChange(endDateAtEndOfDay.toISOString());
    }
  };

  const endDateIsStartDate =
    endDate.value &&
    isSameDay(new Date(endDate.value), new Date(startDate.value));

  const disableEndDatesBefore = getEndDatePickerDisableDatesBefore(
    nowInUTC,
    new Date(startDate.value),
  );

  return (
    <Box paddingBlockEnd="4">
      <Card padding="4">
        <FormLayout>
          <Text variant="headingMd" as="h2">
            {i18n.translate('DiscountAppComponents.ActiveDatesCard.title')}
          </Text>
          <FormLayout.Group>
            <DatePicker
              date={{
                ...startDate,
                onChange: handleStartDateTimeChange,
              }}
              weekStartsOn={weekStartsOn}
              disabled={disabled}
              label={i18n.translate(
                'DiscountAppComponents.ActiveDatesCard.startDate',
              )}
              disableDatesBefore={nowInUTC.toISOString()}
            />
            <TimePicker
              time={{
                ...startDate,
                onChange: handleStartDateTimeChange,
              }}
              disabled={disabled}
              label={i18n.translate(
                'DiscountAppComponents.ActiveDatesCard.startTime',
                {
                  timezoneAbbreviation,
                },
              )}
              disableTimesBefore={nowInUTC.toISOString()}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Checkbox
              label={i18n.translate(
                'DiscountAppComponents.ActiveDatesCard.setEndDate',
              )}
              checked={showEndDate}
              disabled={disabled}
              onChange={handleShowEndDateChange}
            />
          </FormLayout.Group>

          {showEndDate && endDate.value && (
            <FormLayout.Group>
              <DatePicker
                date={{
                  ...(endDate as Field<string>),
                  onChange: handleEndDateTimeChange,
                  error: endDateIsStartDate ? undefined : endDate.error,
                }}
                weekStartsOn={weekStartsOn}
                disabled={disabled}
                label={i18n.translate(
                  'DiscountAppComponents.ActiveDatesCard.endDate',
                )}
                disableDatesBefore={disableEndDatesBefore.toISOString()}
              />
              <TimePicker
                time={{
                  ...(endDate as Field<string>),
                  onChange: handleEndDateTimeChange,
                  error: endDateIsStartDate ? endDate.error : undefined,
                }}
                disabled={disabled}
                label={i18n.translate(
                  'DiscountAppComponents.ActiveDatesCard.endTime',
                  {
                    timezoneAbbreviation,
                  },
                )}
                disableTimesBefore={disableEndDatesBefore.toISOString()}
              />
            </FormLayout.Group>
          )}
        </FormLayout>
      </Card>
    </Box>
  );
}

/**
 * The end date picker is disabled before the current time or the startDate, whichever is later
 */
function getEndDatePickerDisableDatesBefore(now: Date, startDate: Date) {
  return now > startDate ? now : startDate;
}

/**
 * Given a start and end date in UTC, returns a new valid end date in UTC if start date is after end date
 */
function getValidEndDateTime(
  startDateTime: DateTime,
  endDateTime: DateTime,
  ianaTimezone: string,
): DateTime {
  const startDate = getDateTimeInShopTimeZone(startDateTime, ianaTimezone);
  const endDate = getDateTimeInShopTimeZone(endDateTime, ianaTimezone);

  return startDate >= endDate
    ? getDateInUTC(getNewDateAtEndOfDay(startDate), ianaTimezone).toISOString()
    : endDateTime;
}
