import React from 'react';
import {Provider} from '../../foundation/Provider';
import UsageLimits from './UsageLimitsPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'UsageLimits pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const UsageLimitsPattern = () => (
  <Provider>
    <UsageLimits />
  </Provider>
);

export {UsageLimitsPattern};
