import React from 'react';
import {Provider} from '../../foundation/Provider';
import DiscountApplicationStrategyCard from './DiscountApplicationStrategyCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DiscountApplicationStrategyCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const ApplicationStrategyCardPattern = () => (
  <Provider>
    <DiscountApplicationStrategyCard />
  </Provider>
);

export {ApplicationStrategyCardPattern};
