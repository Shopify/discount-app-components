import React from 'react';
import {mockField, mountWithApp} from 'tests/utilities';
import {Action} from '@shopify/app-bridge/actions/Navigation/Redirect';
import {composeGid, parseGid} from '@shopify/admin-graphql-api-utilities';
import {ChoiceList, Card, Text} from '@shopify/polaris';

import {
  CustomerEligibilityCard,
  SelectedCustomerSegmentsList,
  SelectedCustomersList,
} from '../CustomerEligibilityCard';
import styles from '../CustomerEligibilityCard.scss';
import {Eligibility} from '../../../constants';
import {SelectedItemsList} from '../../SelectedItemsList';
import {AppBridgeLink} from '../../AppBridgeLink';
import type {Customer, CustomerSegment} from '../../../types';

describe('<CustomerEligibilityCard />', () => {
  const customerSegmentsList = [
    {
      id: composeGid('Segment', 1),
      name: 'New',
    },
    {
      id: composeGid('Segment', 2),
      name: 'Returning',
    },
  ];

  const customersList = [
    {
      id: composeGid('Customer', 66),
      email: 'eriberto@email.com',
      displayName: 'Eriberto Bailey',
    },
    {
      id: composeGid('Customer', 70),
      email: 'amos@email.com',
      displayName: 'Amos Bailey',
    },
  ];

  const MockCustomerSelector = () => <>Customer Selector</>;
  const MockCustomerSegmentsSelector = () => <>Customer Segments Selector</>;

  const mockProps = {
    eligibility: mockField(Eligibility.Everyone),
    customerSelector: <MockCustomerSelector />,
    selectedCustomers: mockField(customersList),
    customerSegmentSelector: <MockCustomerSegmentsSelector />,
    selectedCustomerSegments: mockField(customerSegmentsList),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders with expected children', () => {
    const customerEligibilityCard = mountWithApp(
      <CustomerEligibilityCard {...mockProps} />,
    );

    expect(customerEligibilityCard).toContainReactComponent(Card);
    expect(customerEligibilityCard).toContainReactComponent(Text, {
      children: 'Customer eligibility',
    });
    expect(customerEligibilityCard).toContainReactComponent(ChoiceList, {
      title: 'Customer eligibility',
      titleHidden: true,
      selected: [Eligibility.Everyone],
      choices: [
        {
          label: 'All customers',
          value: Eligibility.Everyone,
        },
        {
          label: 'Specific customer segments',
          value: Eligibility.CustomerSegments,
        },
        {
          label: 'Specific customers',
          value: Eligibility.Customers,
        },
      ],
      onChange: expect.any(Function),
    });
  });

  it('calls eligibility onChange when eligibilty changes', () => {
    const customerEligibilityCard = mountWithApp(
      <CustomerEligibilityCard {...mockProps} />,
    );

    customerEligibilityCard
      .find(ChoiceList)
      ?.trigger('onChange', [Eligibility.Customers]);

    expect(mockProps.eligibility.onChange).toHaveBeenCalledWith(
      Eligibility.Customers,
    );
  });

  describe('Eligibility.Everyone', () => {
    it('renders with "All customers" state', () => {
      const customerEligibilityCard = mountWithApp(
        <CustomerEligibilityCard {...mockProps} />,
      );
      expect(customerEligibilityCard).toContainReactComponent(ChoiceList, {
        selected: [Eligibility.Everyone],
      });

      expect(customerEligibilityCard).not.toContainReactComponent(
        MockCustomerSelector,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        SelectedCustomersList,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        MockCustomerSegmentsSelector,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        SelectedCustomerSegmentsList,
      );
    });
  });

  describe('Eligibility.Customers', () => {
    it('renders with "Selected customers" state', () => {
      const customerEligibilityCard = mountWithApp(
        <CustomerEligibilityCard
          {...mockProps}
          eligibility={mockField(Eligibility.Customers)}
        />,
      );

      expect(customerEligibilityCard).toContainReactComponent(ChoiceList, {
        selected: [Eligibility.Customers],
      });

      expect(customerEligibilityCard).toContainReactComponent(
        MockCustomerSelector,
      );
      expect(customerEligibilityCard).toContainReactComponent(
        SelectedCustomersList,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        MockCustomerSegmentsSelector,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        SelectedCustomerSegmentsList,
      );

      expect(customerEligibilityCard).toContainReactComponent(
        SelectedItemsList,
        {
          items: mockProps.selectedCustomers.value,
          onRemoveItem: expect.any(Function),
        },
      );
      expect(
        JSON.stringify(
          customerEligibilityCard.find(SelectedItemsList)?.prop('renderItem'),
        ),
      ).toStrictEqual(
        JSON.stringify(({email, displayName}: Customer) => (
          <div className={styles.CustomerItem}>
            <span>{displayName}</span>
            {email && (
              <span className={styles.Email} title={email}>
                {email}
              </span>
            )}
          </div>
        )),
      );
    });

    it('calling SelectedItemsList.onRemoveItem calls selectedCustomers.onRemove', () => {
      const customerEligibilityCard = mountWithApp(
        <CustomerEligibilityCard
          {...mockProps}
          eligibility={mockField(Eligibility.Customers)}
        />,
      );

      customerEligibilityCard
        .find(SelectedItemsList)
        ?.trigger('onRemoveItem', mockProps.selectedCustomers.value[0].id);

      expect(mockProps.selectedCustomers.onChange).toHaveBeenCalledWith(
        mockProps.selectedCustomers.value.filter(
          ({id}) => id !== mockProps.selectedCustomers.value[0].id,
        ),
      );
    });
  });

  describe('Customer Segments', () => {
    it('renders with "Selected customer segments" state', () => {
      const customerEligibilityCard = mountWithApp(
        <CustomerEligibilityCard
          {...mockProps}
          eligibility={mockField(Eligibility.CustomerSegments)}
        />,
      );

      expect(customerEligibilityCard).toContainReactComponent(ChoiceList, {
        selected: [Eligibility.CustomerSegments],
      });

      expect(customerEligibilityCard).toContainReactComponent(
        MockCustomerSegmentsSelector,
      );
      expect(customerEligibilityCard).toContainReactComponent(
        SelectedCustomerSegmentsList,
      );

      expect(customerEligibilityCard).not.toContainReactComponent(
        MockCustomerSelector,
      );
      expect(customerEligibilityCard).not.toContainReactComponent(
        SelectedCustomersList,
      );

      expect(customerEligibilityCard).toContainReactComponent(
        SelectedItemsList,
        {
          items: mockProps.selectedCustomerSegments.value,
          onRemoveItem: expect.any(Function),
        },
      );
      expect(
        JSON.stringify(
          customerEligibilityCard.find(SelectedItemsList)?.prop('renderItem'),
        ),
      ).toStrictEqual(
        JSON.stringify(({name, id}: CustomerSegment) => (
          <AppBridgeLink
            external
            action={Action.ADMIN_PATH}
            url={`/customers?segment_id=${parseGid(id)}`}
          >
            {name}
          </AppBridgeLink>
        )),
      );
    });

    it('calling SelectedItemsList.onRemoveItem calls selectedCustomerSegments.onRemove', () => {
      const customerEligibilityCard = mountWithApp(
        <CustomerEligibilityCard
          {...mockProps}
          eligibility={mockField(Eligibility.CustomerSegments)}
        />,
      );

      customerEligibilityCard
        .find(SelectedItemsList)
        ?.trigger(
          'onRemoveItem',
          mockProps.selectedCustomerSegments.value[0].id,
        );

      expect(mockProps.selectedCustomerSegments.onChange).toHaveBeenCalledWith(
        mockProps.selectedCustomerSegments.value.filter(
          ({id}) => id !== mockProps.selectedCustomerSegments.value[0].id,
        ),
      );
    });
  });
});
