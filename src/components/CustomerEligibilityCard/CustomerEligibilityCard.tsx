import React from 'react';
import {Box, Card, ChoiceList, Text, BlockStack} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';
import {Action} from '@shopify/app-bridge/actions/Navigation/Redirect';
import {parseGid} from '@shopify/admin-graphql-api-utilities';

import {Eligibility} from '../../constants';
import type {Customer, CustomerSegment, Field} from '../../types';
import {SelectedItemsList} from '../SelectedItemsList';
import {AppBridgeLink} from '../AppBridgeLink';

import styles from './CustomerEligibilityCard.scss';

export interface CustomerEligibilityCardProps {
  /**
   * Controls whether the discount is applied to all customers, specific customers, or specific customer groups
   */
  eligibility: Field<Eligibility>;

  /**
   * Widget that enables users to select customers (see docs for an example)
   */
  customerSelector: React.ReactNode;

  /**
   * List of customers that the discount will be applied to
   */
  selectedCustomers: Field<Customer[]>;

  /**
   * Widget that enables users to select customer segments (see docs for an example)
   */
  customerSegmentSelector: React.ReactNode;

  /**
   * List of customer segments that the discount will be applied to
   */
  selectedCustomerSegments: Field<CustomerSegment[]>;
}

const I18N_SCOPE = {
  scope: 'DiscountAppComponents.CustomerEligibilityCard',
};

export function CustomerEligibilityCard({
  eligibility,
  customerSelector,
  selectedCustomers,
  customerSegmentSelector,
  selectedCustomerSegments,
}: CustomerEligibilityCardProps) {
  const [i18n] = useI18n();

  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        <BlockStack gap="400">
          <Text variant="headingMd" as="h2">
            {i18n.translate('title', I18N_SCOPE)}
          </Text>
          <ChoiceList
            title={i18n.translate('title', I18N_SCOPE)}
            titleHidden
            selected={[eligibility.value]}
            choices={[
              {
                label: i18n.translate('everyone', I18N_SCOPE),
                value: Eligibility.Everyone,
              },
              {
                label: i18n.translate('customerSegments', I18N_SCOPE),
                value: Eligibility.CustomerSegments,
              },
              {
                label: i18n.translate('customers', I18N_SCOPE),
                value: Eligibility.Customers,
              },
            ]}
            onChange={(selectedEligibility: Eligibility[]) => {
              eligibility.onChange(selectedEligibility[0]);
            }}
          />

          {eligibility.value === Eligibility.CustomerSegments && (
            <>
              <div className={styles.SelectedItemsActivator}>
                {customerSegmentSelector}
              </div>
              <SelectedCustomerSegmentsList
                selectedCustomerSegments={selectedCustomerSegments}
              />
            </>
          )}

          {eligibility.value === Eligibility.Customers && (
            <>
              <div className={styles.SelectedItemsActivator}>
                {customerSelector}
              </div>
              <SelectedCustomersList selectedCustomers={selectedCustomers} />
            </>
          )}
        </BlockStack>
      </Card>
    </Box>
  );
}

export const SelectedCustomersList = ({
  selectedCustomers,
}: {
  selectedCustomers: Field<Customer[]>;
}) => {
  const renderCustomerItem = ({email, displayName}: Customer) => (
    <div className={styles.CustomerItem}>
      <span>{displayName}</span>
      {email && (
        <span className={styles.Email} title={email}>
          {email}
        </span>
      )}
    </div>
  );

  const handleRemoveCustomer = (customerId: string) => {
    selectedCustomers.onChange(
      selectedCustomers.value.filter(({id}) => id !== customerId),
    );
  };

  return (
    <SelectedItemsList
      items={selectedCustomers.value}
      renderItem={renderCustomerItem}
      onRemoveItem={handleRemoveCustomer}
    />
  );
};

export const SelectedCustomerSegmentsList = ({
  selectedCustomerSegments,
}: {
  selectedCustomerSegments: Field<CustomerSegment[]>;
}) => {
  const renderCustomerSegmentItem = ({name, id}: CustomerSegment) => (
    <AppBridgeLink
      external
      action={Action.ADMIN_PATH}
      url={`/customers?segment_id=${parseGid(id)}`}
    >
      {name}
    </AppBridgeLink>
  );

  const handleRemoveCustomerSegment = (customerSegmentId: string) => {
    selectedCustomerSegments.onChange(
      selectedCustomerSegments.value.filter(({id}) => id !== customerSegmentId),
    );
  };

  return (
    <SelectedItemsList
      items={selectedCustomerSegments.value}
      renderItem={renderCustomerSegmentItem}
      onRemoveItem={handleRemoveCustomerSegment}
    />
  );
};
