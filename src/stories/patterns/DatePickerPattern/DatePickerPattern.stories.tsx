import React from 'react';
import {Provider} from '../../foundation/Provider';
import DatePicker from './DatePickerPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DatePicker pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const DatePickerPattern = () => (
  <Provider>
    <DatePicker />
  </Provider>
);

export {DatePickerPattern};
