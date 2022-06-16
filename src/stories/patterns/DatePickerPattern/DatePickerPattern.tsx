import React, {useState} from 'react';

import {FormLayout, Page} from '@shopify/polaris';
import {DatePicker} from '../../../../src';

export default function DatePickerPattern() {
  const [selectedTime, setSelectedTime] = useState('2022-05-12T03:31:55.722Z');

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
            disableDatesBefore={'2022-05-22T23:00:00.000Z'}
          />
        </FormLayout.Group>
      </FormLayout>

      {selectedTime}
    </Page>
  );
}
