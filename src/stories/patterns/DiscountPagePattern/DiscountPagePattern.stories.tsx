import React from 'react';
import {Provider} from '../../foundation/Provider';
import DiscountPage from './DiscountPagePattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DiscountPage pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const DiscountPagePattern = () => (
  <Provider>
    <DiscountPage />
  </Provider>
);

export {DiscountPagePattern};
