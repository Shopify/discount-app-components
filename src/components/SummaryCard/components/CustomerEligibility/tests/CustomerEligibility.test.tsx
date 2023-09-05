import React from 'react';
import {composeGid} from '@shopify/admin-graphql-api-utilities';
import {mountWithApp} from 'tests/utilities';
import {List} from '@shopify/polaris';

import {CustomerEligibility} from '../CustomerEligibility';
import {Eligibility} from '../../../../../constants';
import type {Customer, CustomerSegment} from '../../../../../types';

describe('<CustomerEligibility />', () => {
  const mockProps = {
    customerEligibility: Eligibility.Everyone,
    selectedCustomerGroups: [],
    selectedCustomerSegments: [],
    selectedCustomers: [],
  };

  it('displays customer segment name if only one customer segment is eligible', () => {
    const segmentName = 'Email subscribers';
    const customerSegment = {
      name: segmentName,
      id: composeGid('Segment', 1),
    } as CustomerSegment;

    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.CustomerSegments}
        selectedCustomerSegments={[customerSegment]}
      />,
    );

    expect(customerEligibility).toContainReactText(`For ${segmentName}`);
  });

  it('displays customer segment count if multiple customer segments are eligible', () => {
    const customerSegments = [
      {
        name: 'Email subscribers',
        id: composeGid('Segment', 1),
      },
      {
        name: 'Canada',
        id: composeGid('Segment', 2),
      },
    ] as CustomerSegment[];

    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.CustomerSegments}
        selectedCustomerSegments={customerSegments}
      />,
    );

    expect(customerEligibility).toContainReactText('For 2 customer segments');
  });

  it('does not display customer segment eligibility if specific customer segments option is selected but no customer segments are eligible', () => {
    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.CustomerSegments}
        selectedCustomerSegments={[]}
      />,
    );

    expect(customerEligibility).not.toContainReactText('For');
    expect(customerEligibility).not.toContainReactText('customer segments');
  });

  it('displays customer name if only one customer is eligible', () => {
    const customer = {
      id: composeGid('Customer', 1),
      displayName: 'Customer 1',
      email: 'customer1@email.com',
    } as Customer;

    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.Customers}
        selectedCustomers={[customer]}
      />,
    );

    expect(customerEligibility).toContainReactComponent(List.Item, {
      children: 'For Customer 1',
    });
  });

  it('displays customer count if multiple customers are eligible', () => {
    const customers = [
      {
        id: composeGid('Customer', 1),
        displayName: 'Customer 1',
        email: 'customer1@email.com',
      },
      {
        id: composeGid('Customer', 2),
        displayName: 'Customer 2',
        email: 'customer2@email.com',
      },
    ] as Customer[];

    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.Customers}
        selectedCustomers={customers}
      />,
    );

    expect(customerEligibility).toContainReactComponent(List.Item, {
      children: 'For 2 customers',
    });
  });

  it('does not display customer eligibility if specific customer option is selected but no customers are eligible', () => {
    const customerEligibility = mountWithApp(
      <CustomerEligibility
        {...mockProps}
        eligibility={Eligibility.Customers}
        selectedCustomers={[]}
      />,
    );

    expect(customerEligibility.find(CustomerEligibility)).toBeNull();
  });
});
