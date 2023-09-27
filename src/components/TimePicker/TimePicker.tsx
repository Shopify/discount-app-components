import React, {useEffect, useMemo, useState} from 'react';
import {Autocomplete, Icon} from '@shopify/polaris';
import {ClockMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';

import type {DateTime, Field} from '../../types';
import {
  getDateInShopTimeZone,
  getDateTimeInShopTimeZone,
} from '../../utilities/dates';

import {
  formatDateListAsOptionList,
  generateTimes,
  getLocalizedTimeForDate,
  getValidDateForTime,
} from './utilities';

const TIME_BLOCKLIST_REGEX = /[^\d\s:apmAPM]/g;

export interface TimePickerProps {
  /**
   * Time field to be used for the time picker. The value should be in UTC.
   */
  time: Field<DateTime>;

  /**
   * Label to be displayed above the time picker input
   */
  label: string;

  /**
   * (optional) Controls visibility of the time picker input label
   *
   * @default false
   */
  labelHidden?: boolean;

  /**
   * (optional) Disables the time picker input
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * (optional) If provided, sets a lower bound on the time if the date of {@param disableTimesBefore} is the same as the date of {@param time}. The value should be in UTC.
   */
  disableTimesBefore?: DateTime;
}

export function TimePicker({
  label,
  labelHidden = false,
  time,
  disabled = false,
  disableTimesBefore,
}: TimePickerProps) {
  const [i18n] = useI18n();
  const ianaTimezone = i18n.defaultTimezone!;
  const locale = i18n.locale;

  const selectedDate = getDateTimeInShopTimeZone(time.value, ianaTimezone);
  const localeFormattedTime = getLocalizedTimeForDate(selectedDate, locale);
  const [userInput, setUserInput] = useState(localeFormattedTime);

  const disableTimesBeforeInShopTZ = useMemo(() => {
    return disableTimesBefore
      ? getDateTimeInShopTimeZone(disableTimesBefore, ianaTimezone)
      : undefined;
  }, [disableTimesBefore, ianaTimezone]);

  const options = useMemo(
    () =>
      formatDateListAsOptionList(
        generateTimes(selectedDate, disableTimesBeforeInShopTZ),
        locale,
        ianaTimezone,
      ),
    [selectedDate, disableTimesBeforeInShopTZ, locale, ianaTimezone],
  );

  useEffect(() => {
    setUserInput(localeFormattedTime);
  }, [localeFormattedTime]);

  const handleTextFieldChange = (inputValue: DateTime) =>
    setUserInput(inputValue.replace(TIME_BLOCKLIST_REGEX, ''));

  const handleTextFieldBlur = () => {
    if (userInput === localeFormattedTime) {
      return;
    }

    const requestedNewTime = getValidDateForTime(
      userInput,
      selectedDate,
      ianaTimezone,
    );

    const userInputInShopTimeZone =
      requestedNewTime && getDateInShopTimeZone(requestedNewTime, ianaTimezone);

    const hasDisabledTimesAndInputIsAfterDisabledTime =
      userInputInShopTimeZone &&
      disableTimesBeforeInShopTZ &&
      userInputInShopTimeZone >= disableTimesBeforeInShopTZ;

    // set the time if the user input is a valid time string and the browser time in the shop TZ is not before disableTimesBefore
    if (
      requestedNewTime &&
      (!disableTimesBeforeInShopTZ ||
        hasDisabledTimesAndInputIsAfterDisabledTime)
    ) {
      time.onChange(requestedNewTime.toISOString());
    } else {
      setUserInput(localeFormattedTime);
    }

    time.onBlur?.();
  };

  return (
    <Autocomplete
      options={options}
      selected={[time.value]}
      onSelect={(selected) => time.onChange(selected[0])}
      textField={
        <Autocomplete.TextField
          label={label}
          labelHidden={labelHidden}
          prefix={<Icon source={ClockMinor} tone="subdued" />}
          placeholder={i18n.translate(
            'DiscountAppComponents.TimePicker.timePlaceholder',
          )}
          autoComplete="off"
          error={time.error}
          onBlur={handleTextFieldBlur}
          onChange={handleTextFieldChange}
          value={userInput}
          disabled={disabled}
        />
      }
    />
  );
}
