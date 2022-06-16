import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {TimePicker} from '../../../../src';

export default function TimePickerPattern() {
  const now = new Date();

  const selected = new Date(now);
  selected.setHours(selected.getHours() + 3);
  const [selectedTime, setSelectedTime] = useState(selected.toISOString());

  return (
    <Page>
      <TimePicker
        label="Start Time"
        time={{
          value: selectedTime,
          onChange: setSelectedTime,
        }}
        disableTimesBefore={now.toISOString()}
      />
      {selectedTime}
    </Page>
  );
}
