import React from 'react';
import {
  DatePicker as PolarisDatePicker,
  Icon,
  Popover,
  TextField,
} from '@shopify/polaris';
import {mockField, mountWithApp} from 'tests/utilities';
import {CalendarMajor} from '@shopify/polaris-icons';

import {DatePicker} from '../DatePicker';
import {Weekday} from '../../../constants';
import {getDateTimeInShopTimeZone} from '../../../utilities/dates';

describe('<DatePicker />', () => {
  const mockDate = '2023-05-20';
  const mockProps = {
    date: mockField(`${mockDate}T18:23:00.000Z`),
    ianaTimeZone: 'America/Toronto',
    label: "What's the date?",
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('<TextField />', () => {
    it('renders a TextField', () => {
      const mockError = 'Oh no!';
      const datePicker = mountWithApp(
        <DatePicker
          {...mockProps}
          date={{
            ...mockProps.date,
            error: mockError,
          }}
          disabled
        />,
      );

      expect(datePicker).toContainReactComponent(TextField, {
        value: mockDate,
        label: mockProps.label,
        labelHidden: false,
        prefix: expect.any(Object),
        placeholder: 'YYYY-MM-DD',
        error: mockError,
        onFocus: expect.any(Function),
        onChange: expect.any(Function),
        onBlur: expect.any(Function),
        disabled: true,
      });

      expect(datePicker.find(TextField)).toContainReactComponent(Icon, {
        source: CalendarMajor,
        tone: 'subdued',
      });
    });

    it('removes invalid characters when onChange is triggered', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      const newDate = '2022-05-12 lorem ipsum';
      datePicker.find(TextField)?.trigger('onChange', newDate);
      datePicker.find(TextField)?.trigger('onBlur');

      expect(datePicker).toContainReactComponent(TextField, {
        value: '2022-05-12',
      });
    });

    it('resets the field after field is blurred if the userInput is blank', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      expect(datePicker).toContainReactComponent(TextField, {
        value: mockDate,
      });

      // set an error value on the field
      datePicker.find(TextField)?.trigger('onChange', '--------');
      datePicker.find(TextField)?.trigger('onBlur');
      expect(datePicker).toContainReactComponent(TextField, {
        error: 'Date should be formatted YYYY-MM-DD',
      });

      datePicker.find(TextField)?.trigger('onChange', '');
      datePicker.find(TextField)?.trigger('onBlur');

      expect(datePicker).toContainReactComponent(TextField, {
        value: mockDate,
        error: false,
      });
    });

    it('clears error and sets value after field is blurred with valid userInput', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      // set an error value on the field
      datePicker.find(TextField)?.trigger('onChange', '--------');
      datePicker.find(TextField)?.trigger('onBlur');

      const newDate = '2023-04-01';
      datePicker.find(TextField)?.trigger('onChange', newDate);
      datePicker.find(TextField)?.trigger('onBlur');

      expect(datePicker).toContainReactComponent(TextField, {
        value: newDate,
        error: false,
      });

      expect(mockProps.date.onChange).toHaveBeenLastCalledWith(
        `${newDate}T18:23:00.000Z`,
      );
      datePicker.find(TextField)?.trigger('onFocus');
      expect(datePicker).toContainReactComponent(PolarisDatePicker, {
        month: 3,
        year: 2023,
      });
    });

    it('does not trigger date.onBlur after field is blurred if value is not changed', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      expect(mockProps.date.onBlur).not.toHaveBeenCalled();

      datePicker.find(TextField)?.trigger('onBlur');

      expect(mockProps.date.onBlur).not.toHaveBeenCalled();
    });

    it('triggers date.onBlur after field value is changed and blurred', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      expect(mockProps.date.onBlur).not.toHaveBeenCalled();

      datePicker.find(TextField)?.trigger('onChange', '2023-04-01');
      datePicker.find(TextField)?.trigger('onBlur');

      expect(mockProps.date.onBlur).toHaveBeenCalled();
    });

    it('does not clear the time when the date value is changed', () => {
      const onChangeSpy = jest.fn();
      const datePicker = mountWithApp(
        <DatePicker
          {...mockProps}
          date={{
            value: `${mockDate}T12:23:56.000Z`,
            onChange: onChangeSpy,
          }}
        />,
      );

      const newDate = '2023-04-01';
      datePicker.find(TextField)?.trigger('onChange', newDate);
      datePicker.find(TextField)?.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenLastCalledWith(`${newDate}T12:23:56.000Z`);
    });

    it('does not call date.onChange if the entered date value is before disableDatesBefore', () => {
      const mockDate = '2023-04-01';
      const mockDisableDatesBefore = new Date(mockDate);
      const onChangeSpy = jest.fn();
      const datePicker = mountWithApp(
        <DatePicker
          {...mockProps}
          date={{
            value: `${mockDate}T12:23:56.000Z`,
            onChange: onChangeSpy,
          }}
          disableDatesBefore={mockDisableDatesBefore.toISOString()}
        />,
      );

      datePicker.find(TextField)?.trigger('onChange', '2000-04-01');
      datePicker.find(TextField)?.trigger('onBlur');

      expect(onChangeSpy).not.toHaveBeenCalled();

      expect(datePicker).toContainReactComponent(TextField, {
        value: mockDate,
      });
    });
  });

  describe('<Popover />', () => {
    it('renders a Popover', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      expect(datePicker).toContainReactComponent(Popover, {
        activator: expect.any(Object),
        active: false,
        onClose: expect.any(Function),
        sectioned: true,
      });
    });

    it('renders closed by default', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      expect(datePicker).toContainReactComponent(Popover, {
        active: false,
      });
      expect(datePicker.find(Popover)).not.toContainReactComponent(
        PolarisDatePicker,
      );
    });

    it('can be opened and closed', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      datePicker.find(TextField)!.trigger('onFocus');
      expect(datePicker).toContainReactComponent(Popover, {
        active: true,
      });

      datePicker.find(Popover)!.trigger('onClose');

      expect(datePicker).toContainReactComponent(Popover, {
        active: false,
      });
    });
  });

  describe('PolarisDatePicker', () => {
    it('renders a Polaris DatePicker', () => {
      const datePicker = mountWithApp(
        <DatePicker
          {...mockProps}
          disableDatesBefore="2019-04-01T12:23:56.000Z"
          weekStartsOn={Weekday.Friday}
        />,
        {
          ianaTimezone: 'America/New_York',
        },
      );

      datePicker.find(TextField)!.trigger('onFocus');

      expect(datePicker).toContainReactComponent(PolarisDatePicker, {
        month: 4,
        year: 2023,
        disableDatesBefore: new Date('2019-04-01T00:00:00.000Z'),
        weekStartsOn: Weekday.Friday,
        selected: getDateTimeInShopTimeZone(
          mockProps.date.value,
          mockProps.ianaTimeZone,
        ),
      });
    });

    it('starts the week on Weekday.Sunday by default', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      datePicker.find(TextField)!.trigger('onFocus');
      expect(datePicker).toContainReactComponent(PolarisDatePicker, {
        weekStartsOn: Weekday.Sunday,
      });
    });

    it('updates the month and year on month change', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      datePicker.find(TextField)!.trigger('onFocus');

      const mockYear = 2025;
      const mockMonth = 10;
      datePicker
        .find(PolarisDatePicker)!
        .trigger('onMonthChange', mockMonth, mockYear);

      expect(datePicker).toContainReactComponent(PolarisDatePicker, {
        year: mockYear,
        month: mockMonth,
      });
    });

    it('updates on picker selection', () => {
      const datePicker = mountWithApp(<DatePicker {...mockProps} />);

      datePicker.find(TextField)!.trigger('onFocus');

      // set an error value on the field
      datePicker.find(TextField)?.trigger('onChange', '--------');
      datePicker.find(TextField)?.trigger('onBlur');

      const newDateSelection = '2025-04-01';
      const mockNewDate = new Date(newDateSelection);
      datePicker.find(PolarisDatePicker)!.trigger('onChange', {
        start: mockNewDate,
        end: mockNewDate,
      });

      expect(datePicker).toContainReactComponent(TextField, {
        value: newDateSelection,
        error: false,
      });

      expect(datePicker).toContainReactComponent(Popover, {
        active: false,
      });

      datePicker.find(TextField)!.trigger('onFocus');
      expect(datePicker).toContainReactComponent(PolarisDatePicker, {
        year: 2025,
        month: 3,
      });

      expect(mockProps.date.onChange).toHaveBeenLastCalledWith(
        `${newDateSelection}T18:23:00.000Z`,
      );
    });
  });
});
