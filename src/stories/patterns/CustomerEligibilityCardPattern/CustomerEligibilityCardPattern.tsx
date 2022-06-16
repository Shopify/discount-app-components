import React, {useEffect, useState} from 'react';

import {Button, ChoiceList, Modal, Page} from '@shopify/polaris';
import {
  Customer,
  CustomerEligibilityCard,
  CustomerSegment,
  Field,
} from '../../..';
import {Eligibility} from '../../../constants';

enum VisibleModal {
  None,
  Customers,
  CustomerSegments,
}

const ALL_CUSTOMER_SEGMENTS_IN_SHOP = [
  {
    id: '1',
    name: 'Email subscribers',
  },
  {
    id: '2',
    name: 'Abandoned checkouts in the last 30 days',
  },
];

const ALL_CUSTOMERS_IN_SHOP = [
  {
    id: '1',
    displayName: 'Shopify customer',
    email: 'hello@shopify.com',
  },
  {
    id: '2',
    displayName: 'Shopify customer with long name',
    email: 'hello_shopify_customer_with_long_name@shopify.com',
  },
  {
    id: '3',
    displayName: 'Frodo Baggins',
    email: 'frodo_b@theshire.com',
  },
];

export default function CustomerEligibilityCardPattern() {
  const [visibleModal, setVisibleModal] = useState<VisibleModal>(
    VisibleModal.None,
  );
  const [selectedCustomerSegments, setSelectedCustomerSegments] = useState<
    CustomerSegment[]
  >([ALL_CUSTOMER_SEGMENTS_IN_SHOP[0]]);

  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([
    ALL_CUSTOMERS_IN_SHOP[0],
    ALL_CUSTOMERS_IN_SHOP[1],
  ]);

  const selectedCustomerSegmentsField = {
    value: selectedCustomerSegments,
    onChange: setSelectedCustomerSegments,
  };

  const selectedCustomersField = {
    value: selectedCustomers,
    onChange: setSelectedCustomers,
  };

  const [eligibility, setEligibility] = useState<Eligibility>(
    Eligibility.Customers,
  );

  return (
    <Page>
      <CustomerEligibilityCard
        selectedCustomerSegments={selectedCustomerSegmentsField}
        selectedCustomers={selectedCustomersField}
        customerSegmentSelector={
          <CustomerModal
            customers={ALL_CUSTOMER_SEGMENTS_IN_SHOP}
            selectedCustomers={
              selectedCustomerSegmentsField as Field<GenericCustomer[]>
            }
            open={visibleModal === VisibleModal.CustomerSegments}
            toggleModal={() =>
              setVisibleModal((visibleModal) =>
                visibleModal === VisibleModal.None
                  ? VisibleModal.CustomerSegments
                  : VisibleModal.None,
              )
            }
          />
        }
        customerSelector={
          <CustomerModal
            customers={ALL_CUSTOMERS_IN_SHOP}
            selectedCustomers={
              selectedCustomersField as Field<GenericCustomer[]>
            }
            open={visibleModal === VisibleModal.Customers}
            toggleModal={() =>
              setVisibleModal((visibleModal) =>
                visibleModal === VisibleModal.None
                  ? VisibleModal.Customers
                  : VisibleModal.None,
              )
            }
          />
        }
        eligibility={{
          value: eligibility,
          onChange: setEligibility,
        }}
      />
    </Page>
  );
}

type GenericCustomer = Customer | CustomerSegment;
function CustomerModal({
  customers,
  selectedCustomers,
  open,
  toggleModal,
}: {
  customers: GenericCustomer[];
  selectedCustomers: Field<GenericCustomer[]>;
  open: boolean;
  toggleModal(): void;
}) {
  const [selected, setSelected] = useState<GenericCustomer[]>(
    () => selectedCustomers.value,
  );
  useEffect(
    () => setSelected(selectedCustomers.value),
    [selectedCustomers.value],
  );

  const handleClose = () => {
    selectedCustomers.onChange(selected);
    toggleModal();
  };

  const resetModal = () => {
    setSelected(selectedCustomers.value);
    toggleModal();
  };

  return (
    <Modal
      activator={<Button onClick={toggleModal}>Browse</Button>}
      open={open}
      onClose={handleClose}
      title="Select customers"
      primaryAction={{
        content: 'Confirm',
        onAction: handleClose,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: resetModal,
        },
      ]}
      sectioned
    >
      <ChoiceList
        allowMultiple
        title="Select customers"
        choices={customers.map((customer) => ({
          label: isCustomerSegment(customer)
            ? customer.name
            : customer.displayName,
          value: customer.id,
        }))}
        selected={selected.map((customer) => customer.id)}
        onChange={(nextValue: string[]) => {
          setSelected(
            nextValue.map(
              (id) => customers.find((customer) => customer.id === id)!,
            ),
          );
        }}
      />
    </Modal>
  );
}

function isCustomerSegment(
  customer: GenericCustomer,
): customer is CustomerSegment {
  return 'name' in customer;
}
