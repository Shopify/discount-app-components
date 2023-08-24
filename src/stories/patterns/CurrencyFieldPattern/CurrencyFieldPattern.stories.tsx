import React from 'react';
import {Provider} from '../../foundation/Provider';
import CurrencyField from './CurrencyFieldPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'CurrencyField pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const CurrencyFieldPattern = () => (
  <Provider>
    <CurrencyField />
  </Provider>
);

export {CurrencyFieldPattern};
