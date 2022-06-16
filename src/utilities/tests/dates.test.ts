import {
  getBrowserAndShopTimeZoneOffset,
  getNewDateAtEndOfDay,
  getNewDateAtStartOfDay,
} from '../dates';

// Sets the "browser" timezone
jest.mock('@shopify/dates', () => ({
  ...jest.requireActual('@shopify/dates'),
  getIanaTimeZone: () => 'America/Toronto',
}));

describe('Date utilities', () => {
  describe('#getBrowserAndShopTimeZoneOffset', () => {
    it('returns the timezone offset between the browser and shop timezones', () => {
      expect(getBrowserAndShopTimeZoneOffset('America/Los_Angeles')).toBe(3);
    });
  });

  describe('#getNewDateAtStartOfDay', () => {
    it('returns a new date at the start of the day', () => {
      expect(
        getNewDateAtStartOfDay(new Date('2022-04-15T17:31:00.000Z')),
      ).toStrictEqual(new Date('2022-04-15T00:00:00.000Z'));
    });
  });

  describe('#getNewDateAtEndOfDay', () => {
    it('returns a new date at the end of the day', () => {
      expect(
        getNewDateAtEndOfDay(new Date('2022-04-15T17:31:00.000Z')),
      ).toStrictEqual(new Date('2022-04-15T23:59:59.999Z'));
    });
  });
});
