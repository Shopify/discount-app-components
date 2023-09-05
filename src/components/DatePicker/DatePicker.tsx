import React, {useEffect, useMemo, useState} from 'react';
import {
  DatePicker as PolarisDatePicker,
  Icon,
  Popover,
  TextField,
  Range,
} from '@shopify/polaris';
import {CalendarMajor} from '@shopify/polaris-icons';
import {timeParse, timeFormat} from 'd3-time-format';
import {useI18n} from '@shopify/react-i18n';

import type {DateTime, Field} from '../../types';
import {Weekday, DEFAULT_WEEK_START_DAY} from '../../constants';
import {
  getDateInUTC,
  getDateTimeInShopTimeZone,
  getNewDateAtStartOfDay,
} from '../../utilities/dates';

const DATE_BLOCKLIST_REGEX = /[^\d-]/g;

const VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;

export interface DatePickerProps {
  /**
   * Date field to be used for the Date picker.
   */
  date: Field<DateTime>;

  /**
   * Label to be displayed above the date picker input
   */
  label: string;

  /**
   * (optional) Controls visibility of the date picker input label
   *
   * @default false
   */
  labelHidden?: boolean;

  /**
   * (optional) Disables the date picker input
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * (optional) Disable date selection before this date.  The value should be in UTC.
   */
  disableDatesBefore?: DateTime;

  /**
   * (optional) The day that should be used as the start of the week.
   *
   * @default Weekday.Sunday
   */
  weekStartsOn?: Weekday;
}

export function DatePicker({
  date,
  label,
  labelHidden = false,
  disabled = false,
  disableDatesBefore,
  weekStartsOn = DEFAULT_WEEK_START_DAY,
}: DatePickerProps) {
  const [i18n] = useI18n();
  const ianaTimezone = i18n.defaultTimezone!;
  const selectedDate = getDateTimeInShopTimeZone(date.value, ianaTimezone);
  const localeFormattedDate = getFormattedDate(selectedDate);
  const [datePickerView, setDatePickerView] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });
  const [userInput, setUserInput] = useState(localeFormattedDate);
  const [error, setError] = useState<string | null>();
  const [isActive, setIsActive] = useState(false);

  const disableDatesBeforeInShopTZAtStartOfDay = useMemo(() => {
    return disableDatesBefore
      ? getNewDateAtStartOfDay(
          getDateTimeInShopTimeZone(disableDatesBefore, ianaTimezone),
        )
      : undefined;
  }, [disableDatesBefore, ianaTimezone]);

  useEffect(() => {
    const selectedDate = getDateTimeInShopTimeZone(date.value, ianaTimezone);

    setDatePickerView({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
    setUserInput(getFormattedDate(selectedDate));
  }, [date.value, ianaTimezone]);

  const handleMonthChange = (month: number, year: number) => {
    setDatePickerView({
      month,
      year,
    });
  };

  const handleTextFieldChange = (inputValue: DateTime) =>
    setUserInput(inputValue.replace(DATE_BLOCKLIST_REGEX, ''));

  const handleTextFieldBlur = () => {
    if (userInput === localeFormattedDate) {
      return;
    }

    setError(null);

    if (userInput === '') {
      setUserInput(localeFormattedDate);
    } else if (isValidDateString(userInput)) {
      const newDate: Date = timeParse('%Y-%m-%d')(userInput)!;

      const hasDisabledDatesAndInputIsAfterDisabledDate =
        disableDatesBeforeInShopTZAtStartOfDay &&
        newDate >= disableDatesBeforeInShopTZAtStartOfDay;

      if (
        !disableDatesBeforeInShopTZAtStartOfDay ||
        hasDisabledDatesAndInputIsAfterDisabledDate
      ) {
        setDatePickerView({
          month: newDate.getMonth(),
          year: newDate.getFullYear(),
        });

        handleDateChange(
          getDateTimeInShopTimeZone(date.value, ianaTimezone),
          newDate,
          date.onChange,
          ianaTimezone,
        );
      } else {
        setUserInput(localeFormattedDate);
      }
    } else {
      setError(
        i18n.translate('DiscountAppComponents.DatePicker.dateFormatError'),
      );
    }

    date.onBlur?.();
  };

  const handleDatePickerChange = (value: Range) => {
    const formattedDate = getFormattedDate(value.start);

    setError(null);
    setUserInput(formattedDate);
    setIsActive(false);
    setDatePickerView({
      month: value.start.getMonth(),
      year: value.start.getFullYear(),
    });

    handleDateChange(
      getDateTimeInShopTimeZone(date.value, ianaTimezone),
      value.start,
      date.onChange,
      ianaTimezone,
    );
  };

  return (
    <Popover
      activator={
        <TextField
          value={userInput}
          label={label}
          labelHidden={labelHidden}
          prefix={<Icon source={CalendarMajor} color="subdued" />}
          placeholder={i18n.translate(
            'DiscountAppComponents.DatePicker.datePlaceholder',
          )}
          error={date.error || error || false}
          autoComplete="off"
          onFocus={() => setIsActive(true)}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          disabled={disabled}
        />
      }
      active={isActive}
      onClose={() => setIsActive(false)}
      autofocusTarget="none"
      sectioned
    >
      <PolarisDatePicker
        month={datePickerView.month}
        year={datePickerView.year}
        disableDatesBefore={disableDatesBeforeInShopTZAtStartOfDay}
        weekStartsOn={weekStartsOn}
        onMonthChange={handleMonthChange}
        selected={selectedDate}
        onChange={handleDatePickerChange}
      />
    </Popover>
  );
}

function isValidDateString(date?: string) {
  if (!date) {
    return false;
  }
  return VALID_DATE_REGEX.test(date) && !isNaN(new Date(date).getTime());
}

const getFormattedDate = (selectedDate: Date) =>
  timeFormat('%Y-%m-%d')(selectedDate);

const handleDateChange = (
  oldDate: Date,
  newDate: Date,
  onChange: (dateTime: DateTime) => void,
  ianaTimezone: string,
) => {
  // Re-apply the current time before firing the datetime field onChange.
  newDate.setHours(
    oldDate.getHours(),
    oldDate.getMinutes(),
    oldDate.getSeconds(),
    oldDate.getMilliseconds(),
  );

  if (oldDate.getTime() !== newDate.getTime()) {
    // Persist date in UTC
    onChange(getDateInUTC(newDate, ianaTimezone).toISOString());
  }
};
