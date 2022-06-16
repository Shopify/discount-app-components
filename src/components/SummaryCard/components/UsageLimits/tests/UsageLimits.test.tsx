import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {UsageLimits} from '../UsageLimits';

describe('<UsageLimits />', () => {
  const mockTotalUsageLimit = '8';
  const totalUsageLimitWithOneUsePerCustomerCopy = `Limit of ${mockTotalUsageLimit} uses, one per customer`;
  const totalUsageLimitCopy = `Limit of ${mockTotalUsageLimit} uses`;
  const oneUsePerCustomerCopy = 'One use per customer';
  const noUsageLimitsCopy = 'No usage limits';

  it.each`
    totalUsageLimit        | oncePerCustomer | copy
    ${mockTotalUsageLimit} | ${true}         | ${totalUsageLimitWithOneUsePerCustomerCopy}
    ${mockTotalUsageLimit} | ${false}        | ${totalUsageLimitCopy}
    ${null}                | ${true}         | ${oneUsePerCustomerCopy}
    ${''}                  | ${true}         | ${oneUsePerCustomerCopy}
    ${null}                | ${false}        | ${noUsageLimitsCopy}
    ${''}                  | ${false}        | ${noUsageLimitsCopy}
  `(
    'renders content when totalUsageLimit is $totalUsageLimit and oncePerCustomer is $oncePerCustomer',
    ({totalUsageLimit, oncePerCustomer, copy}) => {
      const usageLimits = mountWithApp(
        <UsageLimits
          totalUsageLimit={totalUsageLimit}
          oncePerCustomer={oncePerCustomer}
        />,
      );

      expect(usageLimits).toContainReactText(copy);
    },
  );
});
