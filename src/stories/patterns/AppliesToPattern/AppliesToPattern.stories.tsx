import React from 'react';
import {Provider} from '../../foundation/Provider';
import {AppliesToPattern} from './AppliesToPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'AppliesTo pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CustomerEligibilityCardPattern = () => (
  <Provider>
    <AppliesToPattern />
  </Provider>
);

export {CustomerEligibilityCardPattern};
