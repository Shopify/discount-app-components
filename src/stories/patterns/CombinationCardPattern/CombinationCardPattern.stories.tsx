import React from 'react';
import {Provider} from '../../foundation/Provider';
import CombinationCard from './CombinationCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'CombinationCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CombinationCardPattern = () => (
  <Provider>
    <CombinationCard />
  </Provider>
);

export {CombinationCardPattern};
