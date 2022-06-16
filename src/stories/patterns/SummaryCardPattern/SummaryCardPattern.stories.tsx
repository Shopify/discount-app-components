import React from 'react';
import {Provider} from '../../foundation/Provider';
import SummaryCard from './SummaryCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'SummaryCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const SummaryCardPattern = () => (
  <Provider>
    <SummaryCard />
  </Provider>
);

export {SummaryCardPattern};
