import React from 'react';
import {Provider} from '../../foundation/Provider';
import CountriesAndRatesCard from './CountriesAndRatesCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'ContriesAndRatesCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CountriesAndRatesCardPattern = () => (
  <Provider>
    <CountriesAndRatesCard />
  </Provider>
);

export {CountriesAndRatesCardPattern};
