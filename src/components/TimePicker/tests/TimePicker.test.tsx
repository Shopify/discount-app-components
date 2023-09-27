import React from 'react';
import {clock} from '@shopify/jest-dom-mocks';
import {mockField, mountWithApp} from 'tests/utilities';
import {Autocomplete, Icon} from '@shopify/polaris';
import {ClockMinor} from '@shopify/polaris-icons';

import {TimePicker} from '../TimePicker';

jest.mock('@shopify/dates', () => ({
  ...jest.requireActual('@shopify/dates'),
  getIanaTimeZone: () => 'America/Toronto',
}));

const DEFAULT_TIME_ZONE = 'America/New_York';

describe('<TimePicker />', () => {
  const selectedDate = '2023-05-20';
  const mockProps = {
    time: mockField(`${selectedDate}T18:23:00.000Z`),
    locale: 'en-US',
    ianaTimeZone: 'America/Toronto',
    label: "What's the time?",
    labelHidden: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    if (clock.isMocked()) {
      clock.restore();
    }
  });

  describe('Autocomplete', () => {
    it('renders an Autocomplete with values in UTC and labels in the ianaTimezone', () => {
      clock.mock(new Date('2022-04-16T00:00:00.000Z'));
      const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
        ianaTimezone: DEFAULT_TIME_ZONE,
      });

      expect(timePicker).toContainReactComponent(Autocomplete, {
        options: [
          {value: '2023-05-20T04:00:00.000Z', label: '12:00 AM'},
          {value: '2023-05-20T04:30:00.000Z', label: '12:30 AM'},
          {value: '2023-05-20T05:00:00.000Z', label: '1:00 AM'},
          {value: '2023-05-20T05:30:00.000Z', label: '1:30 AM'},
          {value: '2023-05-20T06:00:00.000Z', label: '2:00 AM'},
          {value: '2023-05-20T06:30:00.000Z', label: '2:30 AM'},
          {value: '2023-05-20T07:00:00.000Z', label: '3:00 AM'},
          {value: '2023-05-20T07:30:00.000Z', label: '3:30 AM'},
          {value: '2023-05-20T08:00:00.000Z', label: '4:00 AM'},
          {value: '2023-05-20T08:30:00.000Z', label: '4:30 AM'},
          {value: '2023-05-20T09:00:00.000Z', label: '5:00 AM'},
          {value: '2023-05-20T09:30:00.000Z', label: '5:30 AM'},
          {value: '2023-05-20T10:00:00.000Z', label: '6:00 AM'},
          {value: '2023-05-20T10:30:00.000Z', label: '6:30 AM'},
          {value: '2023-05-20T11:00:00.000Z', label: '7:00 AM'},
          {value: '2023-05-20T11:30:00.000Z', label: '7:30 AM'},
          {value: '2023-05-20T12:00:00.000Z', label: '8:00 AM'},
          {value: '2023-05-20T12:30:00.000Z', label: '8:30 AM'},
          {value: '2023-05-20T13:00:00.000Z', label: '9:00 AM'},
          {value: '2023-05-20T13:30:00.000Z', label: '9:30 AM'},
          {value: '2023-05-20T14:00:00.000Z', label: '10:00 AM'},
          {value: '2023-05-20T14:30:00.000Z', label: '10:30 AM'},
          {value: '2023-05-20T15:00:00.000Z', label: '11:00 AM'},
          {value: '2023-05-20T15:30:00.000Z', label: '11:30 AM'},
          {value: '2023-05-20T16:00:00.000Z', label: '12:00 PM'},
          {value: '2023-05-20T16:30:00.000Z', label: '12:30 PM'},
          {value: '2023-05-20T17:00:00.000Z', label: '1:00 PM'},
          {value: '2023-05-20T17:30:00.000Z', label: '1:30 PM'},
          {value: '2023-05-20T18:00:00.000Z', label: '2:00 PM'},
          {value: '2023-05-20T18:30:00.000Z', label: '2:30 PM'},
          {value: '2023-05-20T19:00:00.000Z', label: '3:00 PM'},
          {value: '2023-05-20T19:30:00.000Z', label: '3:30 PM'},
          {value: '2023-05-20T20:00:00.000Z', label: '4:00 PM'},
          {value: '2023-05-20T20:30:00.000Z', label: '4:30 PM'},
          {value: '2023-05-20T21:00:00.000Z', label: '5:00 PM'},
          {value: '2023-05-20T21:30:00.000Z', label: '5:30 PM'},
          {value: '2023-05-20T22:00:00.000Z', label: '6:00 PM'},
          {value: '2023-05-20T22:30:00.000Z', label: '6:30 PM'},
          {value: '2023-05-20T23:00:00.000Z', label: '7:00 PM'},
          {value: '2023-05-20T23:30:00.000Z', label: '7:30 PM'},
          {value: '2023-05-21T00:00:00.000Z', label: '8:00 PM'},
          {value: '2023-05-21T00:30:00.000Z', label: '8:30 PM'},
          {value: '2023-05-21T01:00:00.000Z', label: '9:00 PM'},
          {value: '2023-05-21T01:30:00.000Z', label: '9:30 PM'},
          {value: '2023-05-21T02:00:00.000Z', label: '10:00 PM'},
          {value: '2023-05-21T02:30:00.000Z', label: '10:30 PM'},
          {value: '2023-05-21T03:00:00.000Z', label: '11:00 PM'},
          {value: '2023-05-21T03:30:00.000Z', label: '11:30 PM'},
        ],
        selected: [mockProps.time.value],
        onSelect: expect.any(Function),
        textField: expect.any(Object),
      });
    });

    it('triggers time.onChange when an option is selected', () => {
      clock.mock(new Date('2022-04-15 23:30 EST'));
      const timePicker = mountWithApp(<TimePicker {...mockProps} />);

      const mockSelectedTime = '2023-05-20T18:23:00.000Z';
      timePicker.find(Autocomplete)!.prop('onSelect')([mockSelectedTime]);

      expect(mockProps.time.onChange).toHaveBeenCalledWith(mockSelectedTime);
    });

    it('includes only available time slots options if mockProps.time.value is from today', () => {
      clock.mock(new Date('2022-04-16T21:30:59.000Z'));

      const timePicker = mountWithApp(
        <TimePicker
          {...mockProps}
          time={mockField('2022-04-16T23:30:59.000Z')}
          disableTimesBefore="2022-04-16T21:30:59.000Z"
        />,
        {
          ianaTimezone: DEFAULT_TIME_ZONE,
        },
      );

      expect(timePicker.find(Autocomplete)).toHaveReactProps({
        options: [
          {value: '2022-04-17T01:30:59.000Z', label: '9:30 PM'},
          {value: '2022-04-17T02:00:59.000Z', label: '10:00 PM'},
          {value: '2022-04-17T02:30:59.000Z', label: '10:30 PM'},
          {value: '2022-04-17T03:00:59.000Z', label: '11:00 PM'},
          {value: '2022-04-17T03:30:59.000Z', label: '11:30 PM'},
        ],
      });
    });

    it('renders with no additional time slots options if time.value is today but the current time is after 23:30', () => {
      clock.mock(new Date('2022-04-17T23:31:00.000Z'));

      const timePicker = mountWithApp(
        <TimePicker
          {...mockProps}
          time={mockField('2022-04-17T02:31:00.000Z')}
          disableTimesBefore="2022-04-17T23:31:00.000Z"
        />,
        {
          ianaTimezone: DEFAULT_TIME_ZONE,
        },
      );

      expect(timePicker.find(Autocomplete)).toHaveReactProps({
        options: [{value: '2022-04-18T03:31:00.000Z', label: '11:31 PM'}],
      });
    });

    it('renders next xx:30 as the second option if current time is in todays xx:01-xx:30 range', () => {
      clock.mock(new Date('2022-04-15T21:01:00.000Z'));

      const timePicker = mountWithApp(
        <TimePicker
          {...mockProps}
          time={mockField('2022-04-15T21:01:00.000Z')}
          disableTimesBefore="2022-04-15T21:01:00.000Z"
        />,
        {
          ianaTimezone: DEFAULT_TIME_ZONE,
        },
      );

      expect(timePicker.find(Autocomplete)).toHaveReactProps({
        options: [
          {value: '2022-04-16T01:01:00.000Z', label: '9:01 PM'},
          {value: '2022-04-16T01:30:00.000Z', label: '9:30 PM'},
          {value: '2022-04-16T02:00:00.000Z', label: '10:00 PM'},
          {value: '2022-04-16T02:30:00.000Z', label: '10:30 PM'},
          {value: '2022-04-16T03:00:00.000Z', label: '11:00 PM'},
          {value: '2022-04-16T03:30:00.000Z', label: '11:30 PM'},
        ],
      });
    });

    it('renders next hour as the second option if current time is in todays xx:31-xx:00 range', () => {
      clock.mock(new Date('2022-04-15T21:31:00.000Z'));

      const timePicker = mountWithApp(
        <TimePicker
          {...mockProps}
          time={mockField('2022-04-15T21:01:00.000Z')}
          disableTimesBefore="2022-04-15T21:31:00.000Z"
        />,
        {
          ianaTimezone: DEFAULT_TIME_ZONE,
        },
      );

      expect(timePicker.find(Autocomplete)).toHaveReactProps({
        options: [
          {value: '2022-04-16T01:31:00.000Z', label: '9:31 PM'},
          {value: '2022-04-16T02:00:00.000Z', label: '10:00 PM'},
          {value: '2022-04-16T02:30:00.000Z', label: '10:30 PM'},
          {value: '2022-04-16T03:00:00.000Z', label: '11:00 PM'},
          {value: '2022-04-16T03:30:00.000Z', label: '11:30 PM'},
        ],
      });
    });

    it('generates options with a lower bound of disableTimesBefore', () => {
      clock.mock(new Date('2022-04-15T21:31:00.000Z'));

      const timePicker = mountWithApp(
        <TimePicker
          {...mockProps}
          time={mockField('2022-04-15T21:01:00.000Z')}
          disableTimesBefore="2022-04-15T23:01:00.000Z"
        />,
        {
          ianaTimezone: DEFAULT_TIME_ZONE,
        },
      );

      expect(timePicker.find(Autocomplete)).toHaveReactProps({
        options: [
          {value: '2022-04-16T03:01:00.000Z', label: '11:01 PM'},
          {value: '2022-04-16T03:30:00.000Z', label: '11:30 PM'},
        ],
      });
    });
  });

  describe('Autocomplete.TextField', () => {
    it('renders an Autocomplete.TextField with a timezone-ified value', () => {
      const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
        ianaTimezone: DEFAULT_TIME_ZONE,
      });

      expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
        label: mockProps.label,
        labelHidden: mockProps.labelHidden,
        prefix: expect.any(Object),
        placeholder: 'Enter time',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        value: '6:23 PM',
      });

      expect(timePicker.find(Autocomplete.TextField)).toContainReactComponent(
        Icon,
        {
          source: ClockMinor,
          tone: 'subdued',
        },
      );
    });

    it('prevents inputting invalid characters', () => {
      const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
        ianaTimezone: DEFAULT_TIME_ZONE,
      });

      expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
        value: '6:23 PM',
      });

      timePicker
        .find(Autocomplete.TextField)!
        .trigger('onChange', 'T9:45D AM@X.%&*(+-');

      expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
        value: '9:45 AM',
      });
    });

    describe('onBlur', () => {
      it('does not trigger time.onBlur callback when the text field has not been changed and loses focus', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onBlur).not.toHaveBeenCalled();
      });

      it('triggers time.onBlur callback when the text field has been changed and loses focus', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '4:23 PM');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onBlur).toHaveBeenCalled();
      });

      it('triggers time.onChange with valid 24h time input when the field is blurred', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '13:59');
        expect(mockProps.time.onChange).not.toHaveBeenCalled();
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');
        expect(mockProps.time.onChange).toHaveBeenLastCalledWith(
          '2023-05-20T13:59:00.000Z',
        );

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '10:59');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onChange).toHaveBeenLastCalledWith(
          '2023-05-20T10:59:00.000Z',
        );
      });

      it('triggers time.onChange with valid 12h time input when the field is blurred', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '1:59 pm');
        expect(mockProps.time.onChange).not.toHaveBeenCalled();
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onChange).toHaveBeenLastCalledWith(
          '2023-05-20T13:59:00.000Z',
        );

        timePicker
          .find(Autocomplete.TextField)!
          .trigger('onChange', '10:59 am');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onChange).toHaveBeenLastCalledWith(
          '2023-05-20T10:59:00.000Z',
        );
      });

      it('does not trigger time.onChange event if the entered time is invalid', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '12:69');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onChange).not.toHaveBeenCalled();
      });

      it('resets the input value to its initial value if the entered time is invalid', () => {
        const timePicker = mountWithApp(<TimePicker {...mockProps} />, {
          ianaTimezone: DEFAULT_TIME_ZONE,
        });

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '12:69');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(timePicker.find(Autocomplete.TextField)).toHaveReactProps({
          value: '6:23 PM',
        });
      });

      it('displays an error message if time.error is set', () => {
        const mockError = 'Time is invalid';
        const timePicker = mountWithApp(
          <TimePicker
            {...mockProps}
            time={{
              ...mockProps.time,
              error: mockError,
            }}
          />,
          {
            ianaTimezone: DEFAULT_TIME_ZONE,
          },
        );

        expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
          error: mockError,
        });
      });

      it('displays a disabled Autocomplete.TextField if disabled prop is set', () => {
        const timePicker = mountWithApp(
          <TimePicker {...mockProps} disabled />,
          {
            ianaTimezone: DEFAULT_TIME_ZONE,
          },
        );

        expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
          disabled: true,
        });
      });

      it('resets the input field if the entered time is before the lower bound of disableTimesBefore', () => {
        clock.mock(new Date('2022-04-15T21:31:00.000Z'));

        const timePicker = mountWithApp(
          <TimePicker
            {...mockProps}
            time={mockField('2022-04-15T21:01:00.000Z')}
            disableTimesBefore="2022-04-15T23:01:00.000Z"
          />,
          {
            ianaTimezone: DEFAULT_TIME_ZONE,
          },
        );

        timePicker.find(Autocomplete.TextField)!.trigger('onChange', '8:00 pm');
        timePicker.find(Autocomplete.TextField)!.trigger('onBlur');

        expect(mockProps.time.onChange).not.toHaveBeenCalled();
        expect(timePicker).toContainReactComponent(Autocomplete.TextField, {
          value: '9:01 PM',
        });
      });
    });
  });
});
