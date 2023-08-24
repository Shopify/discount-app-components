import React from 'react';
import {Provider} from '../../foundation/Provider';
import TimePicker from './TimePickerPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'TimePicker pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const TimePickerPattern = () => (
  <Provider>
    <TimePicker />
  </Provider>
);

export {TimePickerPattern};
