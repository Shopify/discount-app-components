/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
import React from 'react';
import {useI18n} from '@shopify/react-i18n';
import {List, Card, BlockStack, Text, Box} from '@shopify/polaris';

import {
  ActiveDates,
  ActiveDatesProps,
  AppliesToPurchaseType,
  AppliesToPurchaseTypeProps,
  Combinations,
  CombinationsProps,
  CustomerEligibility,
  CustomerEligibilityProps,
  Header,
  HeaderProps,
  MaximumShippingPrice,
  MaximumShippingPriceProps,
  MinimumRequirements,
  MinimumRequirementsProps,
  Performance,
  PerformanceProps,
  RecurringPayment,
  RecurringPaymentProps,
  SelectedCountries,
  SelectedCountriesProps,
  UsageLimits,
  UsageLimitsProps,
} from './components';

export type SummaryCardProps = {
  /**
   * Discount summary props for the Header section. See {@link HeaderProps} for more details.
   */
  header: HeaderProps;

  /**
   * Props for the Performance section. See {@link PerformanceProps} for more details.
   */
  performance: PerformanceProps;
} & OptionalSectionsProps;

enum OptionalSection {
  activeDates = 'activeDates',
  additionalDetails = 'additionalDetails',
  appliesToPurchaseType = 'appliesToPurchaseType',
  combinations = 'combinations',
  customerEligibility = 'customerEligibility',
  maximumShippingPrice = 'maximumShippingPrice',
  minimumRequirements = 'minimumRequirements',
  recurringPayment = 'recurringPayment',
  selectedCountries = 'selectedCountries',
  usageLimits = 'usageLimits',
}

interface OptionalSectionsProps {
  /**
   * (optional) Renders a section that describes the discounts active dates. See {@link ActiveDatesProps} for more details.
   */
  [OptionalSection.activeDates]?: ActiveDatesProps;

  /**
   * (optional) Entries are displayed as bullet points under the details subheading.
   */
  [OptionalSection.additionalDetails]?: string[];

  /**
   * (optional) Renders a purchase type (e.g. one-time, subscription, both) section. See {@link AppliesToPurchaseTypeProps} for more details.
   */
  [OptionalSection.appliesToPurchaseType]?: AppliesToPurchaseTypeProps;

  /**
   * (optional) Renders a section that describes how a discount combines. See {@link CombinationsProps} for more details.
   */
  [OptionalSection.combinations]?: CombinationsProps;

  /**
   * (optional) Renders a section that describes which customers a discount applies to. See {@link CustomerEligibilityProps} for more details.
   */
  [OptionalSection.customerEligibility]?: CustomerEligibilityProps;

  /**
   * (optional) Renders a section that lists the maximum shipping price allowed for the discount to be abpplied. See {@link MaximumShippingPrice} for more details.
   */
  [OptionalSection.maximumShippingPrice]?: MaximumShippingPriceProps;

  /**
   * (optional) Renders a section for the minimum discount purchase requirements (e.g. minimum subtotal, minimum purchase quantity). See {@link MinimumRequirementsProps} for more details.
   */
  [OptionalSection.minimumRequirements]?: MinimumRequirementsProps;

  /**
   * (optional) Renders a section that describes how the discount applies on recurring payment orders (e.g. subscription). See {@link RecurringPaymentProps} for more details.
   */
  [OptionalSection.recurringPayment]?: RecurringPaymentProps;

  /**
   * (optional) Renders a section for the countries where the discount applies. See {@link SelectedCountriesProps} for more details.
   */
  [OptionalSection.selectedCountries]?: SelectedCountriesProps;

  /**
   * (optional) Renders a section that describes how many times the discount may be used. See {@link UsageLimitsProps} for more details.
   */
  [OptionalSection.usageLimits]?: UsageLimitsProps;
}

const I18N_SCOPE = {scope: 'DiscountAppComponents.SummaryCard'};

export function SummaryCard(props: SummaryCardProps) {
  const [i18n] = useI18n();

  const showDetailsSection = Object.values(OptionalSection).some(
    (section) => props[section],
  );

  return (
    <Box paddingBlockEnd="400">
      <Card padding="400">
        <BlockStack gap="400">
          <Text variant="headingMd" as="h2">
            {i18n.translate('title', I18N_SCOPE)}
          </Text>

          <BlockStack gap="200">
            <Header {...props.header} />

            {showDetailsSection && (
              <BlockStack gap="200">
                <Text variant="headingSm" as="h3">
                  {i18n.translate('details', I18N_SCOPE)}
                </Text>

                <List type="bullet">
                  {props.additionalDetails?.map((detail) => (
                    <List.Item key={detail.replace(/\s/g, '-')}>
                      {detail}
                    </List.Item>
                  ))}

                  {props.appliesToPurchaseType && (
                    <AppliesToPurchaseType {...props.appliesToPurchaseType} />
                  )}

                  {props.recurringPayment && (
                    <RecurringPayment {...props.recurringPayment} />
                  )}

                  {props.selectedCountries && (
                    <SelectedCountries {...props.selectedCountries} />
                  )}

                  {props.maximumShippingPrice && (
                    <MaximumShippingPrice {...props.maximumShippingPrice} />
                  )}

                  {props.minimumRequirements && (
                    <MinimumRequirements {...props.minimumRequirements} />
                  )}

                  {props.customerEligibility && (
                    <CustomerEligibility {...props.customerEligibility} />
                  )}

                  {props.usageLimits && <UsageLimits {...props.usageLimits} />}

                  {props.combinations && (
                    <Combinations {...props.combinations} />
                  )}

                  {props.activeDates && <ActiveDates {...props.activeDates} />}
                </List>
              </BlockStack>
            )}
          </BlockStack>
          <Performance {...props.performance} />
        </BlockStack>
      </Card>
    </Box>
  );
}
