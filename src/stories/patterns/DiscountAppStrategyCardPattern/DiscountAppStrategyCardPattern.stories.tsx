import React from 'react';
import {Provider} from '../../foundation/Provider';
import DiscountAppStrategyCard from './DiscountAppStrategyCardPattern';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DiscountAppStrategyCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

const ApplicationStrategyCardPattern = () => (
  <Provider>
    <DiscountAppStrategyCard />
  </Provider>
);

export {ApplicationStrategyCardPattern};
