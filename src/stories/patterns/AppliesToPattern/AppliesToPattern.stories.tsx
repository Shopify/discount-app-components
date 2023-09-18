import React from 'react';
import {Provider} from '../../foundation/Provider';
import {AppliesTo} from '../../../components/AppliesTo';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'AppliesTo pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CustomerEligibilityCardPattern = () => (
  <Provider>
    <AppliesTo />
  </Provider>
);

export {CustomerEligibilityCardPattern};
