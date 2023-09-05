import React from 'react';
import {I18n, useI18n} from '@shopify/react-i18n';
import {List} from '@shopify/polaris';
import {isToday, isSameDay} from '@shopify/dates';

import type {DateTime} from '../../../../types';

export interface ActiveDatesProps {
  /**
   * The start date of the discount. A DateTime value represented as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC.
   */
  startDate: DateTime;

  /**
   * The end date of the discount. A DateTime value represented as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC.
   */
  endDate: DateTime | null;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.SummaryCard.ActiveDates',
};

export function ActiveDates({startDate, endDate}: ActiveDatesProps) {
  const [i18n] = useI18n();

  return <List.Item>{getDateSummary(startDate, endDate, i18n)}</List.Item>;
}

const getDateSummary = (
  startDate: DateTime,
  endDate: DateTime | null,
  i18n: I18n,
) => {
  const ianaTimezone = i18n.defaultTimezone!;

  const startDateAsDate = new Date(startDate);
  const startsAtIsToday = isToday(startDateAsDate, ianaTimezone);

  if (!endDate || startDate === endDate) {
    const date = startsAtIsToday
      ? i18n.translate('today', I18N_SCOPE)
      : formatDateForSummary(startDateAsDate, i18n);

    return i18n.translate('activeFromDate', I18N_SCOPE, {date});
  }

  const endDateAsDate = new Date(endDate);
  const endsAtIsToday = isToday(endDateAsDate, ianaTimezone);
  if (isSameDay(startDateAsDate, endDateAsDate, ianaTimezone)) {
    const date = startsAtIsToday
      ? i18n.translate('today', I18N_SCOPE)
      : formatDateForSummary(startDateAsDate, i18n);

    return i18n.translate('activeSingleDate', I18N_SCOPE, {
      date,
    });
  } else if (startsAtIsToday) {
    return i18n.translate('activeFromTodayUntilDate', I18N_SCOPE, {
      date: formatDateForSummary(endDateAsDate, i18n),
    });
  } else if (endsAtIsToday) {
    return i18n.translate('activeFromDateUntilToday', I18N_SCOPE, {
      date: formatDateForSummary(startDateAsDate, i18n),
    });
  } else {
    return i18n.translate('activeFromDateToDate', I18N_SCOPE, {
      startDate: formatDateForSummary(startDateAsDate, i18n),
      endDate: formatDateForSummary(endDateAsDate, i18n),
    });
  }
};

const DATE_FORMATS: {[key: string]: Intl.DateTimeFormatOptions} = {
  sameYear: {
    month: 'short',
    day: 'numeric',
  },
  differentYear: {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
};

function formatDateForSummary(date: Date, i18n: I18n) {
  const currentYear = new Date().getFullYear();

  return date.getFullYear() === currentYear
    ? i18n.formatDate(date, DATE_FORMATS.sameYear)
    : i18n.formatDate(date, DATE_FORMATS.differentYear);
}
