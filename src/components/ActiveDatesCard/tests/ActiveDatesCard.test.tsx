import React from 'react';
import {mockField, mountWithApp} from 'tests/utilities';
import {Checkbox, FormLayout, Text} from '@shopify/polaris';
import _ from 'lodash';
import MockDate from 'mockdate';

import {ActiveDatesCard} from '../ActiveDatesCard';
import {DatePicker} from '../../DatePicker';
import {TimePicker} from '../../TimePicker';
import {Weekday} from '../../../constants';

describe('<ActiveDatesCard />', () => {
  const mockProps = {
    startDate: mockField('2023-02-20T18:23:00.000Z'),
    endDate: mockField('2023-03-20T18:23:00.000Z'),
    locale: 'en-US',
    ianaTimeZone: 'America/Toronto',
    timezoneAbbreviation: 'EDT',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders a Card', () => {
    const activeDates = mountWithApp(<ActiveDatesCard {...mockProps} />);

    expect(activeDates).toContainReactComponent(Text, {
      children: 'Active dates',
    });
  });

  it('renders with a FormLayout', () => {
    const activeDates = mountWithApp(<ActiveDatesCard {...mockProps} />);

    expect(activeDates).toContainReactComponent(FormLayout);
    expect(activeDates).toContainReactComponentTimes(FormLayout.Group, 3);
  });

  describe('StartDate', () => {
    it('renders a date and time picker', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          weekStartsOn={Weekday.Friday}
          disabled
        />,
      );

      expect(activeDates).toContainReactComponent(DatePicker, {
        date: expect.objectContaining({
          value: mockProps.startDate.value,
          onChange: expect.any(Function),
        }),
        weekStartsOn: Weekday.Friday,
        disabled: true,
        label: 'Start date',
      });

      expect(activeDates).toContainReactComponent(TimePicker, {
        time: expect.objectContaining({
          value: mockProps.startDate.value,
          onChange: expect.any(Function),
        }),
        disabled: true,
        label: `Start time (${mockProps.timezoneAbbreviation})`,
      });
    });

    it("prevents user from selecting a start date before the current shop's date", () => {
      const now = new Date('2022-04-15T00:00:00.000Z');
      MockDate.set(now);

      const activeDates = mountWithApp(<ActiveDatesCard {...mockProps} />);

      expect(activeDates).toContainReactComponent(DatePicker, {
        label: 'Start date',
        disableDatesBefore: now.toISOString(),
      });
    });

    it('does not adjust end date when start date is changed if end date is after the new start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      const newDate = '2023-03-20T18:23:00.000Z';
      activeDates
        .find(DatePicker, {
          label: 'Start date',
        })
        ?.triggerKeypath('date.onChange', newDate);

      expect(mockProps.startDate.onChange).toHaveBeenLastCalledWith(newDate);
      expect(mockProps.endDate.onChange).not.toHaveBeenCalled();
    });

    it('does not adjust end date when start time is changed if end date is after the new start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      const newDate = '2023-02-20T22:23:00.000Z';
      activeDates
        .find(TimePicker, {
          label: 'Start time (EDT)',
        })
        ?.triggerKeypath('time.onChange', newDate);

      expect(mockProps.startDate.onChange).toHaveBeenLastCalledWith(newDate);
      expect(mockProps.endDate.onChange).not.toHaveBeenCalled();
    });

    it('adjusts end date when start date is changed if end date is before the new start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      const newDate = '2023-05-20T18:23:00.000Z';
      activeDates
        .find(DatePicker, {
          label: 'Start date',
        })
        ?.triggerKeypath('date.onChange', newDate);

      expect(mockProps.startDate.onChange).toHaveBeenLastCalledWith(newDate);
      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(
        '2023-05-21T03:59:59.999Z',
      );
    });

    it('updates end date when startTime is changed to be after endtime', () => {
      const mockStartChange = jest.fn();
      const mockEndChange = jest.fn();
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            value: '2022-05-12T05:30:00.000Z',
            onChange: mockStartChange,
          }}
          endDate={{
            value: '2022-05-12T07:00:00.000Z',
            onChange: mockEndChange,
          }}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      // change start date to be after end date.
      const newDate = '2022-05-12T07:30:00.000Z';
      activeDates
        .find(TimePicker, {
          label: 'Start time (EDT)',
        })
        ?.triggerKeypath('time.onChange', newDate);

      expect(mockStartChange).toHaveBeenCalledWith(newDate);
      expect(mockEndChange).toHaveBeenCalledWith('2022-05-13T03:59:59.999Z');
    });
  });

  describe('EndDate', () => {
    it('renders a date and time picker when endDate is present', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          weekStartsOn={Weekday.Friday}
          disabled
        />,
      );

      expect(activeDates).toContainReactComponent(DatePicker, {
        date: expect.objectContaining({
          value: mockProps.endDate.value,
          onChange: expect.any(Function),
        }),
        weekStartsOn: Weekday.Friday,
        disabled: true,
        label: 'End date',
      });

      expect(activeDates).toContainReactComponent(TimePicker, {
        time: expect.objectContaining({
          value: mockProps.endDate.value,
          onChange: expect.any(Function),
        }),
        disabled: true,
        label: `End time (${mockProps.timezoneAbbreviation})`,
      });
    });

    it('does not render an enddate/time picker when endDate is null', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: null,
          }}
        />,
      );

      expect(activeDates).not.toContainReactComponent(DatePicker, {
        label: 'End date',
      });

      expect(activeDates).not.toContainReactComponent(TimePicker, {
        label: `End time (${mockProps.timezoneAbbreviation})`,
      });
    });

    it("prevents user from selecting an end datetime before the start date in shop's timezone when startDate is after now", () => {
      const now = new Date('2022-04-15T00:00:00.000Z');
      MockDate.set(now);

      const start = '2022-05-15T00:00:00.000Z';
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: start,
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(DatePicker, {
        label: 'End date',
        disableDatesBefore: start,
      });

      expect(activeDates).toContainReactComponent(TimePicker, {
        label: `End time (${mockProps.timezoneAbbreviation})`,
        disableTimesBefore: start,
      });
    });

    it("prevents user from selecting an end datetime before now in shop's timezone when startDate is before now", () => {
      const now = new Date('2022-04-15T00:00:00.000Z');
      const start = '2022-03-15T00:00:00.000Z';
      MockDate.set(now);

      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: start,
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(DatePicker, {
        label: 'End date',
        disableDatesBefore: now.toISOString(),
      });

      expect(activeDates).toContainReactComponent(TimePicker, {
        label: `End time (${mockProps.timezoneAbbreviation})`,
        disableTimesBefore: now.toISOString(),
      });
    });

    it('does not adjust end date to EndOfDay when end date is changed if new end date is after the start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      const newDate = '2023-05-20T18:23:00.000Z';
      activeDates
        .find(DatePicker, {
          label: 'End date',
        })
        ?.triggerKeypath('date.onChange', newDate);

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(newDate);
    });

    it('does not adjust end date to EndOfDay when end time is changed if new end date is after the start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      const newDate = '2023-05-20T18:23:00.000Z';
      activeDates
        .find(TimePicker, {
          label: 'End time (EDT)',
        })
        ?.triggerKeypath('time.onChange', newDate);

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(newDate);
    });

    it('adjusts end date to EndOfDay when end date is changed if end date is before the start date', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-06-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-08-20T18:23:00.000Z',
          }}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      const newDate = '2023-05-20T18:23:00.000Z';
      activeDates
        .find(DatePicker, {
          label: 'End date',
        })
        ?.triggerKeypath('date.onChange', newDate);

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(
        '2023-06-21T03:59:59.999Z',
      );
    });

    it('adjusts end date to EndOfDay when end time is changed if new end time is before the start time', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-06-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-08-20T18:23:00.000Z',
          }}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      const newDate = '2023-06-20T12:23:00.000Z';
      activeDates
        .find(TimePicker, {
          label: 'End time (EDT)',
        })
        ?.triggerKeypath('time.onChange', newDate);

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(
        '2023-06-21T03:59:59.999Z',
      );
    });

    it('sets end date error on the date field if end date is not the same day as start date', () => {
      const mockError = 'Oh no!';

      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
            error: mockError,
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(DatePicker, {
        label: 'End date',
        date: expect.objectContaining({
          error: mockError,
        }),
      });
    });

    it('sets end date error on the time field if end date is the same day as start date', () => {
      const startEndDate = '2023-02-20T18:23:00.000Z';
      const mockError = 'Oh no!';

      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: startEndDate,
          }}
          endDate={{
            ...mockProps.endDate,
            value: startEndDate,
            error: mockError,
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(TimePicker, {
        label: 'End time (EDT)',
        time: expect.objectContaining({
          error: mockError,
        }),
      });
    });

    it('updates checked value to checked when end date prop is changed to have a value', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          weekStartsOn={Weekday.Friday}
          endDate={mockField(null)}
        />,
      );

      expect(activeDates).not.toContainReactComponent(TimePicker, {
        label: 'End time (EDT)',
      });

      activeDates.act(() => {
        activeDates.setProps({
          endDate: mockField('2023-04-20T18:23:00.000Z'),
        });
      });

      expect(activeDates).toContainReactComponent(TimePicker, {
        label: 'End time (EDT)',
      });

      activeDates.act(() => {
        activeDates.setProps({
          endDate: mockField(null),
        });
      });

      expect(activeDates).not.toContainReactComponent(TimePicker, {
        label: 'End time (EDT)',
      });
    });
  });

  describe('showEndDate checkbox', () => {
    it('renders a checked checkbox when endDate is present', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(Checkbox, {
        label: 'Set end date',
        checked: true,
        onChange: expect.any(Function),
      });
    });

    it('renders an unchecked checkbox when endDate is null', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: null,
          }}
        />,
      );

      expect(activeDates).toContainReactComponent(Checkbox, {
        checked: false,
      });
    });

    it('checking the unchecked checkbox sets endDate to the end of day of the startDate', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-05-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: null,
          }}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      activeDates.find(Checkbox)!.trigger('onChange');

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(
        '2023-05-21T03:59:59.999Z',
      );
    });

    it('unchecking the checked checkbox sets endDate to null', () => {
      const activeDates = mountWithApp(
        <ActiveDatesCard
          {...mockProps}
          startDate={{
            ...mockProps.startDate,
            value: '2023-02-20T18:23:00.000Z',
          }}
          endDate={{
            ...mockProps.endDate,
            value: '2023-04-20T18:23:00.000Z',
          }}
        />,
      );

      activeDates.find(Checkbox)!.trigger('onChange');

      expect(mockProps.endDate.onChange).toHaveBeenLastCalledWith(null);
    });
  });
});
