import React, {useState} from 'react';

import {FormLayout, Page} from '@shopify/polaris';
import {TimePicker, DatePicker} from '../../..';

export default function DateAndTimePickerPattern() {
  const [selectedTime, setSelectedTime] = useState('2022-04-29T03:30:00.000Z');

  return (
    <Page>
      <FormLayout>
        <FormLayout.Group>
          <DatePicker
            label="Start Date"
            date={{
              value: selectedTime,
              onChange: setSelectedTime,
            }}
            disableDatesBefore={new Date().toISOString()}
          />
          <TimePicker
            label="Start Time"
            time={{
              value: selectedTime,
              onChange: setSelectedTime,
            }}
            disableTimesBefore={new Date().toISOString()}
          />
        </FormLayout.Group>
      </FormLayout>

      {selectedTime}
    </Page>
  );
}
