import {applyTimeZoneOffset, formatDate, isSameDay} from '@shopify/dates';

import {getBrowserAndShopTimeZoneOffset} from '../../utilities/dates';

const TIME_INCREMENT = 30;
const USER_INPUT_TIME_REGEX =
  /^(\d{1,2})[:\s]?(\d{1,2})?[:-\s]?(?:\d{1,2})?(\s?[APap][Mm])?/;

/**
 * Generates a list of times. If the provided `startDate` is the current day in the shop's TZ, the list will start at the current time.
 *
 * @param startDate - Date to start the list of times from.
 * @param disableTimesBefore - sets a lower bound on the times list if the date is the same as {@param startDate}
 * @returns A list of times that can be selected for the provided `startDate`.
 */
export function generateTimes(
  startDate: Date,
  disableTimesBefore?: Date,
): Date[] {
  if (disableTimesBefore && isSameDay(startDate, disableTimesBefore)) {
    const nowMinutes = disableTimesBefore.getMinutes();
    const startDateWithCurrentTime = new Date(startDate.getTime());
    startDateWithCurrentTime.setHours(
      disableTimesBefore.getHours(),
      nowMinutes,
    );

    const timeNotAlreadyInList =
      nowMinutes !== 0 && nowMinutes !== TIME_INCREMENT;

    return [
      ...(timeNotAlreadyInList ? [startDateWithCurrentTime] : []),
      ...buildTimeListForDate(startDateWithCurrentTime),
    ];
  }

  const startDateAtStartOfDay = new Date(startDate.getTime());
  startDateAtStartOfDay.setHours(0, 0, 0, 0);

  return buildTimeListForDate(startDateAtStartOfDay);
}

/**
 * Given a date and the current date in the current TZ, return a list of times spaced every 30 minutes.
 *
 * @param date: Date for which to get times. If the date contains a time greater than 00:00, will only return times after that time.
 * @returns An array of times, spaced by 30 minute intervals.
 */
function buildTimeListForDate(date: Date): Date[] {
  const timeList: Date[] = [];
  const dayDate = date.getDate();

  const nextDate = roundDateTimeForDisplay(new Date(date.getTime()));

  while (nextDate.getDate() === dayDate) {
    timeList.push(new Date(nextDate.getTime()));
    nextDate.setMinutes(nextDate.getMinutes() + TIME_INCREMENT);
  }

  return timeList;
}

/**
 * Rounds a date's time to the nearest 30 minutes.
 *
 * @param date - Date to round
 * @returns A new `Date` object with the rounded time
 */
function roundDateTimeForDisplay(date: Date) {
  const dateMinutes = date.getMinutes();

  if (dateMinutes === 0) {
    return date;
  }

  const nextDate = new Date(date.getTime());
  if (dateMinutes > 30) {
    nextDate.setHours(date.getHours() + 1);
    nextDate.setMinutes(0);
  } else {
    nextDate.setMinutes(30);
  }

  return nextDate;
}

/**
 * Verifies that a time string can be converted to a time value for a Date object.
 *
 * @param time - Time string to verify
 * @returns `true` if the time string can be converted to a time value for a Date object, `false` otherwise
 */
export function isValidTime(time?: string) {
  if (!time) {
    return false;
  }

  const [, hours = '', minutes = '', period = '', rest] = time.split(
    USER_INPUT_TIME_REGEX,
  );

  const isInvalid =
    (hours && Number(hours) > 24) ||
    (minutes && Number(minutes) > 59) ||
    (period && Number(hours) > 12) ||
    rest;

  return !isInvalid && USER_INPUT_TIME_REGEX.test(time);
}

/**
 * Given a list of dates, returns a list of options that can be used by a {@link https://polaris.shopify.com/components/selection-and-input/select| @shopify/polaris select}
 *
 * @param dates - List of dates to convert to options
 * @param locale - Locale to use for date formatting
 * @param ianaTimezone - IANA timezone to use for date formatting
 * @returns List of options
 */
export function formatDateListAsOptionList(
  dates: Date[],
  locale: string,
  ianaTimezone: string,
) {
  return dates.map((date) => ({
    value: applyTimeZoneOffset(date, ianaTimezone).toISOString(),
    label: getLocalizedTimeForDate(date, locale),
  }));
}

/**
 * Convenience function that wraps the {@link https://github.com/Shopify/quilt/tree/main/packages/dates#formatdate| @shopify/date formatDate} utility.
 *
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 * @returns Time string formatted according to the provided locale
 */
export function getLocalizedTimeForDate(date: Date, locale: string) {
  return formatDate(date, locale, {
    hour: 'numeric',
    minute: 'numeric',
  });
}

/**
 * If the timeInput is a valid time, returns a new Date object with a calendar day of forDate and a time of timeInput.
 * Date is offset by the browser and shop (@param ianaTimezone) timezone.
 *
 * @param timeInput - A string representing a time.
 * @param forDate - A Date object representing the date to set the time on
 * @param ianaTimezone - The IANA timezone of the shop
 *
 * @returns A `Date` object if timeInput is valid, `null` otherwise
 */
export function getValidDateForTime(
  timeInput: string,
  forDate: Date,
  ianaTimezone: string,
): Date | null {
  if (isValidTime(timeInput)) {
    const nextDate = new Date(forDate.getTime());
    const [, hours = '', minutes = '', period = ''] = timeInput.split(
      USER_INPUT_TIME_REGEX,
    );

    nextDate.setHours(
      buildNextDateHour(
        hours,
        period,
        getBrowserAndShopTimeZoneOffset(ianaTimezone),
      ),
      Number(minutes),
    );

    return nextDate;
  }

  return null;
}

function buildNextDateHour(
  hours: string,
  period: string,
  browserAndShopTimeZoneOffset: number,
): number {
  const formattedPeriod = period.toLowerCase();
  const numberHours = Number(hours);

  // User entered time in the shop's timezone, but `new Date()` uses the browser's timezone.
  const hoursWithTimeZoneOffset = numberHours + browserAndShopTimeZoneOffset;

  // When `hours` is 12PM (noon), adding 12 hours would set the time to
  // 12AM (midnight) (12PM + 12 = 24:00 = 12AM). This prevents the user from
  // switching to PM and causes the day to increment incorrectly.
  // Don't increment by 12 when changing time from noon to midnight.
  if (formattedPeriod === 'pm' && numberHours !== 12) {
    return hoursWithTimeZoneOffset + 12;
  }

  // When changing time from noon to midnight, we need to remove
  // 12 hours. Removing 12 hours in other cases could set the time to
  // the afternoon of the day before and prevent user from switching
  // to AM.
  if (formattedPeriod === 'am' && numberHours === 12) {
    return hoursWithTimeZoneOffset - 12;
  }

  return hoursWithTimeZoneOffset;
}
