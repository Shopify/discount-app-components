import React from 'react';
import {Provider} from '../../foundation/Provider';
import ActiveDates from './ActiveDatesPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'ActiveDates pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const ActiveDatesPattern = () => (
  <Provider>
    <ActiveDates />
  </Provider>
);

export {ActiveDatesPattern};
