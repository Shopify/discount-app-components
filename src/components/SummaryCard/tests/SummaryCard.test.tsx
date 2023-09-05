import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {Card, List, Text} from '@shopify/polaris';
import {CurrencyCode} from '@shopify/react-i18n';

import {SummaryCard, SummaryCardProps} from '../SummaryCard';
import {
  ActiveDates,
  AppliesToPurchaseType,
  Header,
  MaximumShippingPrice,
  MinimumRequirements,
  RecurringPayment,
  UsageLimits,
  Performance,
  Combinations,
  CustomerEligibility,
  SelectedCountries,
} from '../components';
import {
  CountrySelectionType,
  DiscountMethod,
  DiscountStatus,
  Eligibility,
  PurchaseType,
  RecurringPaymentType,
  RequirementType,
  SupportedCountryCode,
} from '../../../constants';

describe('<SummaryCard />', () => {
  const mockProps: SummaryCardProps = {
    header: {
      discountMethod: DiscountMethod.Automatic,
      appDiscountType: 'Custom Discount Type',
      discountDescriptor: 'My cool discount',
    },
    performance: {
      status: DiscountStatus.Scheduled,
    },
  };

  it('renders a default SummaryCard', () => {
    const summaryCard = mountWithApp(<SummaryCard {...mockProps} />);

    expect(summaryCard).toContainReactComponent(Card);
    expect(summaryCard).toContainReactComponent(Text, {
      children: 'My cool discount',
    });
    expect(summaryCard).toContainReactComponent(Header, mockProps.header);
  });

  it('does not render optional sections by default', () => {
    const summaryCard = mountWithApp(<SummaryCard {...mockProps} />);

    expect(summaryCard).not.toContainReactComponent(Text, {
      children: 'details',
    });
  });

  it('renders an AppliesToPurchaseType section if props are present', () => {
    const mock = {
      purchaseType: PurchaseType.Both,
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} appliesToPurchaseType={mock} />,
    );

    expect(summaryCard).toContainReactComponent(AppliesToPurchaseType, mock);
  });

  it('renders an ActiveDates section if props are present', () => {
    const mock = {
      startDate: '2022-06-13T04:30:00.000Z',
      endDate: null,
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} activeDates={mock} />,
    );

    expect(summaryCard).toContainReactComponent(ActiveDates, mock);
  });

  it('renders an MinimumRequirements section if props are present', () => {
    const mock = {
      requirementType: RequirementType.None,
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} minimumRequirements={mock} />,
    );

    expect(summaryCard).toContainReactComponent(MinimumRequirements, mock);
  });

  it('renders an RecurringPayment section if props are present', () => {
    const mock = {
      isRecurring: true,
      recurringPaymentType: RecurringPaymentType.MultiplePayments,
      recurringPaymentLimit: '100',
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} recurringPayment={mock} />,
    );

    expect(summaryCard).toContainReactComponent(RecurringPayment, mock);
  });

  it('renders an UsageLimits section if props are present', () => {
    const mock = {
      totalUsageLimit: null,
      oncePerCustomer: true,
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} usageLimits={mock} />,
    );

    expect(summaryCard).toContainReactComponent(UsageLimits, mock);
  });

  it('renders an Performance section if props are present', () => {
    const mock = {
      status: DiscountStatus.Active,
      usageCount: 100,
      isEditing: true,
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} performance={mock} />,
    );

    expect(summaryCard).toContainReactComponent(Performance, mock);
  });

  it('renders consumer-provided additional details if passed', () => {
    const mock = ['details', 'more details'];

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} additionalDetails={mock} />,
    );

    expect(summaryCard).toContainReactComponent(List.Item, {
      children: mock[0],
    });
    expect(summaryCard).toContainReactComponent(List.Item, {
      children: mock[1],
    });
  });

  it('renders a Combinations if props are present', () => {
    const mock = {
      combinesWith: {
        orderDiscounts: true,
        productDiscounts: false,
        shippingDiscounts: true,
      },
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} combinations={mock} />,
    );

    expect(summaryCard).toContainReactComponent(Combinations, mock);
  });

  it('renders a CustomerEligibility section if props are present', () => {
    const mock = {
      eligibility: Eligibility.CustomerSegments,
      selectedCustomerSegments: [
        {
          id: '2',
          name: 'Abandoned checkouts in the last 30 days',
        },
      ],
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} customerEligibility={mock} />,
    );

    expect(summaryCard).toContainReactComponent(CustomerEligibility, mock);
  });

  it('renders a MaximumShippingPrice section if props are present', () => {
    const mock = {
      currencyCode: CurrencyCode.Usd,
      maximumShippingPrice: '1123',
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} maximumShippingPrice={mock} />,
    );

    expect(summaryCard).toContainReactComponent(MaximumShippingPrice, mock);
  });

  it('renders a SelectedCountries section if props are present', () => {
    const mock = {
      countrySelectionType: CountrySelectionType.SelectedCountries,
      selectedCountries: [SupportedCountryCode.Ca],
    };

    const summaryCard = mountWithApp(
      <SummaryCard {...mockProps} selectedCountries={mock} />,
    );

    expect(summaryCard).toContainReactComponent(SelectedCountries, mock);
  });
});
