import {clock} from '@shopify/jest-dom-mocks';

import {
  formatDateListAsOptionList,
  generateTimes,
  getLocalizedTimeForDate,
  getValidDateForTime,
  isValidTime,
} from '../utilities';

// Sets the "browser" timezone
jest.mock('@shopify/dates', () => ({
  ...jest.requireActual('@shopify/dates'),
  getIanaTimeZone: () => 'America/Toronto',
}));

describe('TimePicker utilities', () => {
  afterEach(() => {
    if (clock.isMocked()) {
      clock.restore();
    }
  });

  describe('#generateTimes', () => {
    it('returns a list of times for the startDate when disableTimesBefore is in the past', () => {
      const now = new Date('2022-04-15T04:00:00.000Z');
      const times = generateTimes(new Date('2022-04-17T00:00:00.000Z'), now);

      expect(times).toStrictEqual([
        new Date('2022-04-17T00:00:00.000Z'),
        new Date('2022-04-17T00:30:00.000Z'),
        new Date('2022-04-17T01:00:00.000Z'),
        new Date('2022-04-17T01:30:00.000Z'),
        new Date('2022-04-17T02:00:00.000Z'),
        new Date('2022-04-17T02:30:00.000Z'),
        new Date('2022-04-17T03:00:00.000Z'),
        new Date('2022-04-17T03:30:00.000Z'),
        new Date('2022-04-17T04:00:00.000Z'),
        new Date('2022-04-17T04:30:00.000Z'),
        new Date('2022-04-17T05:00:00.000Z'),
        new Date('2022-04-17T05:30:00.000Z'),
        new Date('2022-04-17T06:00:00.000Z'),
        new Date('2022-04-17T06:30:00.000Z'),
        new Date('2022-04-17T07:00:00.000Z'),
        new Date('2022-04-17T07:30:00.000Z'),
        new Date('2022-04-17T08:00:00.000Z'),
        new Date('2022-04-17T08:30:00.000Z'),
        new Date('2022-04-17T09:00:00.000Z'),
        new Date('2022-04-17T09:30:00.000Z'),
        new Date('2022-04-17T10:00:00.000Z'),
        new Date('2022-04-17T10:30:00.000Z'),
        new Date('2022-04-17T11:00:00.000Z'),
        new Date('2022-04-17T11:30:00.000Z'),
        new Date('2022-04-17T12:00:00.000Z'),
        new Date('2022-04-17T12:30:00.000Z'),
        new Date('2022-04-17T13:00:00.000Z'),
        new Date('2022-04-17T13:30:00.000Z'),
        new Date('2022-04-17T14:00:00.000Z'),
        new Date('2022-04-17T14:30:00.000Z'),
        new Date('2022-04-17T15:00:00.000Z'),
        new Date('2022-04-17T15:30:00.000Z'),
        new Date('2022-04-17T16:00:00.000Z'),
        new Date('2022-04-17T16:30:00.000Z'),
        new Date('2022-04-17T17:00:00.000Z'),
        new Date('2022-04-17T17:30:00.000Z'),
        new Date('2022-04-17T18:00:00.000Z'),
        new Date('2022-04-17T18:30:00.000Z'),
        new Date('2022-04-17T19:00:00.000Z'),
        new Date('2022-04-17T19:30:00.000Z'),
        new Date('2022-04-17T20:00:00.000Z'),
        new Date('2022-04-17T20:30:00.000Z'),
        new Date('2022-04-17T21:00:00.000Z'),
        new Date('2022-04-17T21:30:00.000Z'),
        new Date('2022-04-17T22:00:00.000Z'),
        new Date('2022-04-17T22:30:00.000Z'),
        new Date('2022-04-17T23:00:00.000Z'),
        new Date('2022-04-17T23:30:00.000Z'),
      ]);
    });

    it('returns a list of times after the current time when disableTimesBefore is the current day', () => {
      const today = new Date('2022-04-15T17:31:00.000Z');
      const times = generateTimes(today, today);

      expect(times).toStrictEqual([
        new Date('2022-04-15T17:31:00.000Z'),
        new Date('2022-04-15T18:00:00.000Z'),
        new Date('2022-04-15T18:30:00.000Z'),
        new Date('2022-04-15T19:00:00.000Z'),
        new Date('2022-04-15T19:30:00.000Z'),
        new Date('2022-04-15T20:00:00.000Z'),
        new Date('2022-04-15T20:30:00.000Z'),
        new Date('2022-04-15T21:00:00.000Z'),
        new Date('2022-04-15T21:30:00.000Z'),
        new Date('2022-04-15T22:00:00.000Z'),
        new Date('2022-04-15T22:30:00.000Z'),
        new Date('2022-04-15T23:00:00.000Z'),
        new Date('2022-04-15T23:30:00.000Z'),
      ]);
    });

    it('includes the current time only once if the current time ends in :00 or :30', () => {
      const today = new Date('2022-04-15 12:30 EST');
      const times = generateTimes(today, today);

      expect(times).toStrictEqual([
        new Date('2022-04-15T17:30:00.000Z'),
        new Date('2022-04-15T18:00:00.000Z'),
        new Date('2022-04-15T18:30:00.000Z'),
        new Date('2022-04-15T19:00:00.000Z'),
        new Date('2022-04-15T19:30:00.000Z'),
        new Date('2022-04-15T20:00:00.000Z'),
        new Date('2022-04-15T20:30:00.000Z'),
        new Date('2022-04-15T21:00:00.000Z'),
        new Date('2022-04-15T21:30:00.000Z'),
        new Date('2022-04-15T22:00:00.000Z'),
        new Date('2022-04-15T22:30:00.000Z'),
        new Date('2022-04-15T23:00:00.000Z'),
        new Date('2022-04-15T23:30:00.000Z'),
      ]);
    });
  });

  describe('#isValidTime', () => {
    it('returns false if the hours are invalid', () => {
      expect(isValidTime('26:00')).toBe(false);
    });

    it('returns false if the minutes are invalid', () => {
      expect(isValidTime('22:88')).toBe(false);
    });

    it('returns false if a period is provided with an hour > 12', () => {
      expect(isValidTime('17:22 am')).toBe(false);
      expect(isValidTime('17:22 pm')).toBe(false);
    });

    it('returns true if the time is valid', () => {
      expect(isValidTime('10:22 am')).toBe(true);
      expect(isValidTime('10:22 AM')).toBe(true);
      expect(isValidTime('10:22')).toBe(true);
      expect(isValidTime('10')).toBe(true);

      expect(isValidTime('1:22 PM')).toBe(true);
      expect(isValidTime('13:22')).toBe(true);
      expect(isValidTime('13:22')).toBe(true);
      expect(isValidTime('13')).toBe(true);
    });
  });

  describe('#formatDateListAsOptionList', () => {
    it('returns a list of dates formatted as an option list', () => {
      expect(
        formatDateListAsOptionList(
          [
            new Date('2022-04-15T17:30:00.000Z'),
            new Date('2022-04-15T18:00:00.000Z'),
            new Date('2022-04-15T18:30:00.000Z'),
          ],
          'en-CA',
          'America/Toronto',
        ),
      ).toStrictEqual([
        {
          label: '5:30 p.m.',
          value: '2022-04-15T21:30:00.000Z',
        },
        {
          label: '6:00 p.m.',
          value: '2022-04-15T22:00:00.000Z',
        },
        {
          label: '6:30 p.m.',
          value: '2022-04-15T22:30:00.000Z',
        },
      ]);
    });

    it('returns an empty list when an empty list is passed', () => {
      expect(
        formatDateListAsOptionList([], 'en-CA', 'America/Toronto'),
      ).toStrictEqual([]);
    });
  });

  describe('#getLocalizedTimeForDate', () => {
    it('returns the time formatted for the provided locale', () => {
      expect(
        getLocalizedTimeForDate(new Date('2022-04-15T17:31:00.000Z'), 'en-CA'),
      ).toBe('5:31 p.m.');

      expect(
        getLocalizedTimeForDate(new Date('2022-04-15T17:31:00.000Z'), 'de-DE'),
      ).toBe('17:31');
    });
  });

  describe('#getValidDateForTime', () => {
    it('returns a date for a valid time string', () => {
      // 10:22am in EST on 2022-04-15 => 2022-04-15T14:22:00.000Z (UTC)
      expect(
        getValidDateForTime(
          '10:22 am',
          new Date('2022-04-15T12:00:00.000Z'),
          'America/Toronto',
        ),
      ).toStrictEqual(new Date('2022-04-15T10:22:00.000Z'));
    });

    it('returns a date when time is 12am', () => {
      // 12:22am in EST on 2022-04-15 => 2022-04-15T04:22:00.000Z (UTC)
      expect(
        getValidDateForTime(
          '12:22 am',
          new Date('2022-04-15T12:00:00.000Z'),
          'America/Toronto',
        ),
      ).toStrictEqual(new Date('2022-04-15T00:22:00.000Z'));
    });

    it('returns a date when time is 12pm', () => {
      // 12:22pm in EST on 2022-04-15 => 2022-04-15T14:22:00.000Z (UTC)
      expect(
        getValidDateForTime(
          '12:22 pm',
          new Date('2022-04-15T12:00:00.000Z'),
          'America/Toronto',
        ),
      ).toStrictEqual(new Date('2022-04-15T12:22:00.000Z'));
    });

    it('returns null for an invalid time string', () => {
      expect(
        getValidDateForTime(
          '9999 am',
          new Date('2022-04-15T12:00:00.000Z'),
          'America/Toronto',
        ),
      ).toBeNull();
    });
  });
});
