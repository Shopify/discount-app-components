import React from 'react';
import {Provider} from '../../foundation/Provider';
import MinimumRequirementsCard from './MinimumRequirementsCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'MinimumRequirementsCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const MinimumRequirementsCardPattern = () => (
  <Provider>
    <MinimumRequirementsCard />
  </Provider>
);

export {MinimumRequirementsCardPattern};
