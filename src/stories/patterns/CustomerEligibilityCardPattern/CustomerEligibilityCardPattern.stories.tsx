import React from 'react';
import {Provider} from '../../foundation/Provider';
import CustomerEligibilityCard from './CustomerEligibilityCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'CustomerEligibilityCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CustomerEligibilityCardPattern = () => (
  <Provider>
    <CustomerEligibilityCard />
  </Provider>
);

export {CustomerEligibilityCardPattern};
