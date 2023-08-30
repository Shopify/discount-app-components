import React from 'react';

import {Page} from '@shopify/polaris';
import {SummaryCard} from '../../../components/SummaryCard';
import {
  CountrySelectionType,
  DiscountMethod,
  DiscountStatus,
  Eligibility,
  RequirementType,
  SupportedCountryCode,
} from '../../../constants';
import {CurrencyCode} from '@shopify/react-i18n';

export default function SummaryCardPattern() {
  return (
    <Page>
      <SummaryCard
        header={{
          discountMethod: DiscountMethod.Automatic,
          appDiscountType: 'Custom discount type',
          discountDescriptor: '',
          isEditing: true,
          discountStatus: DiscountStatus.Active,
        }}
        performance={{
          status: DiscountStatus.Scheduled,
          usageCount: 0,
        }}
        activeDates={{
          startDate: '2022-05-24T03:30:00.000Z',
          endDate: '2022-06-13T04:30:00.000Z',
        }}
        additionalDetails={['additional detail 1', 'additional detail 2']}
        minimumRequirements={{
          requirementType: RequirementType.Subtotal,
          subtotal: '100',
          quantity: '',
          currencyCode: CurrencyCode.Usd,
        }}
        combinations={{
          combinesWith: {
            orderDiscounts: true,
            productDiscounts: false,
            shippingDiscounts: false,
          },
        }}
        customerEligibility={{
          eligibility: Eligibility.CustomerSegments,
          selectedCustomerSegments: [
            {
              id: '2',
              name: 'Abandoned checkouts in the last 30 days',
            },
          ],
        }}
        maximumShippingPrice={{
          currencyCode: CurrencyCode.Usd,
          maximumShippingPrice: '1123',
        }}
        selectedCountries={{
          countrySelectionType: CountrySelectionType.SelectedCountries,
          selectedCountries: [SupportedCountryCode.Ca],
        }}
      />
    </Page>
  );
}
