import React from 'react';
import {Provider} from '../../foundation/Provider';
import DiscountApplicationStrategyCard from './DiscountApplicationStrategyCardPattern';
import {DiscountClass} from '../../../constants';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'DiscountApplicationStrategyCard pattern',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ApplicationStrategyCardOrderPattern = () => (
  <Provider>
    <DiscountApplicationStrategyCard discountClass={DiscountClass.Order} />
  </Provider>
);

export const ApplicationStrategyCardProductPattern = () => (
  <Provider>
    <DiscountApplicationStrategyCard discountClass={DiscountClass.Product} />
  </Provider>
);

export const ApplicationStrategyCardShippingPattern = () => (
  <Provider>
    <DiscountApplicationStrategyCard discountClass={DiscountClass.Shipping} />
  </Provider>
);
