import {
  applyTimeZoneOffset,
  getIanaTimeZone,
  getTimeZoneOffset,
} from '@shopify/dates';
import {memoize} from 'lodash';

import type {DateTime} from '../types';

export const getDateTimeInShopTimeZone = (
  date: DateTime,
  ianaTimezone: string,
) => applyTimeZoneOffset(new Date(date), getIanaTimeZone(), ianaTimezone);

export const getDateInShopTimeZone = (date: Date, ianaTimezone: string) =>
  applyTimeZoneOffset(date, getIanaTimeZone(), ianaTimezone);

/**
 * Removes browser and shop timezone offset from a date.
 */
export const getDateInUTC = (date: Date, ianaTimezone: string) =>
  applyTimeZoneOffset(date, ianaTimezone, getIanaTimeZone());

/**
 * Given the shop timezone, returns a timezone offset in hours between the shop timezone and the browser timezone.
 *
 * @param ianaTimezone - Iana
 */
export const getBrowserAndShopTimeZoneOffset = memoize(
  (ianaTimezone: string) => {
    const browserTimeZone = getIanaTimeZone();

    const timeZoneOffsetMinutes = getTimeZoneOffset(
      new Date(),
      browserTimeZone,
      ianaTimezone,
    );

    return timeZoneOffsetMinutes / 60;
  },
);

/**
 * Given a date, returns a copy of the same date at the start of day.
 */
export const getNewDateAtStartOfDay = (date: Date) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Given a date, returns a copy of the same date at the end of day.
 */
export const getNewDateAtEndOfDay = (date: Date) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};
