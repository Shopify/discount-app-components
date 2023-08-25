import React from 'react';
import MockDate from 'mockdate';
import {mountWithApp} from 'tests/utilities';

import {ActiveDates} from '../ActiveDates';

describe('<ActiveDates />', () => {
  const todayInShopTimeZone = new Date('2022-05-15T12:00:00.000Z');

  function addMonthToNow(offset: number) {
    const oneMonthFromNow = new Date(todayInShopTimeZone);
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + offset);
    return oneMonthFromNow;
  }

  beforeEach(() => {
    MockDate.set(todayInShopTimeZone);
  });

  const mockProps = {
    startDate: todayInShopTimeZone,
    endDate: todayInShopTimeZone,
    displayEndDate: false,
    shopIanaTimeZone: 'America/Montreal',
  };

  it('displays active from today when no end date is passed and start date is today', () => {
    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={todayInShopTimeZone.toISOString()}
        endDate={null}
      />,
    );

    expect(activeDates).toContainReactText('Active from today');
  });

  it('displays active from date summary when no end date is passed and start date is within current year', () => {
    const oneMonthFromNow = new Date(
      todayInShopTimeZone.setMonth(todayInShopTimeZone.getMonth() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneMonthFromNow.toISOString()}
        endDate={null}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jun 15');
  });

  it('displays active from date summary when no end date is passed and start date is after current year', () => {
    const oneYearFromNow = new Date(
      todayInShopTimeZone.setFullYear(todayInShopTimeZone.getFullYear() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneYearFromNow.toISOString()}
        endDate={null}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jun 15, 2023');
  });

  it('displays active single date summary when both start and end date are today', () => {
    const laterTodayInShopTimeZone = new Date(
      todayInShopTimeZone.setUTCHours(22),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={todayInShopTimeZone.toISOString()}
        endDate={laterTodayInShopTimeZone.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from today');
  });

  it('displays active single date summary when both start and end date are the same and within current year', () => {
    const oneMonthFromNow = new Date(
      todayInShopTimeZone.setMonth(todayInShopTimeZone.getMonth() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneMonthFromNow.toISOString()}
        endDate={oneMonthFromNow.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jul 15');
  });

  it('displays active single date summary when both start and end date are the same and after current year', () => {
    const oneYearFromNow = new Date(
      todayInShopTimeZone.setFullYear(todayInShopTimeZone.getFullYear() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneYearFromNow.toISOString()}
        endDate={oneYearFromNow.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jul 15, 2024');
  });

  it('displays active from date until today summary when start date is within current year and end date is today', () => {
    const oneMonthAgo = addMonthToNow(-1);

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneMonthAgo.toISOString()}
        endDate={todayInShopTimeZone.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jun 15 until today');
  });

  it('displays active from today until date summary when start date is today and end date is after current year', () => {
    const oneYearFromNow = new Date(
      todayInShopTimeZone.setFullYear(todayInShopTimeZone.getFullYear() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={todayInShopTimeZone.toISOString()}
        endDate={oneYearFromNow.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from Jul 15, 2025');
  });

  it('displays active from date to date summary when both start dates are in the future and after current year', () => {
    const oneYearFromNow = new Date(
      todayInShopTimeZone.setFullYear(todayInShopTimeZone.getFullYear() + 1),
    );
    const twoYearsFromNow = new Date(
      todayInShopTimeZone.setFullYear(todayInShopTimeZone.getFullYear() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneYearFromNow.toISOString()}
        endDate={twoYearsFromNow.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText(
      'Active from Jul 15, 2026 to Jul 15, 2027',
    );
  });

  it('displays active from date to date summary when both start dates are in the future and within current year', () => {
    const oneMonthFromNow = new Date(
      todayInShopTimeZone.setMonth(todayInShopTimeZone.getMonth() + 1),
    );
    const twoMonthsFromNow = new Date(
      todayInShopTimeZone.setMonth(todayInShopTimeZone.getMonth() + 1),
    );

    const activeDates = mountWithApp(
      <ActiveDates
        {...mockProps}
        startDate={oneMonthFromNow.toISOString()}
        endDate={twoMonthsFromNow.toISOString()}
      />,
    );

    expect(activeDates).toContainReactText('Active from Aug 15 to Sep 15');
  });
});
