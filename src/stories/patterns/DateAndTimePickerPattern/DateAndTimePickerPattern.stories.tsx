import React from 'react';
import {Provider} from '../../foundation/Provider';
import DateAndTimePicker from './DateAndTimePickerPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DateAndTimePickerPattern pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const DateAndTimePickerPattern = () => (
  <Provider>
    <DateAndTimePicker />
  </Provider>
);

export {DateAndTimePickerPattern};
