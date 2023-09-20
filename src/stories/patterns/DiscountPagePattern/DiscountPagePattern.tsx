import React, {useState} from 'react';

import {Page, Layout} from '@shopify/polaris';
import {ActiveDatesCard} from '../../../components/ActiveDatesCard';
import {CombinationCard} from '../../../components/CombinationCard';
import {MethodCard} from '../../../components/MethodCard';
import {MinimumRequirementsCard} from '../../../components/MinimumRequirementsCard';
import {UsageLimitsCard} from '../../../components/UsageLimitsCard';
import {SummaryCard} from '../../../components/SummaryCard';

import {
  AppliesToType,
  CountrySelectionType,
  DiscountClass,
  DiscountMethod,
  DiscountStatus,
  Eligibility,
  RecurringPaymentType,
  RequirementType,
  SupportedCountryCode,
} from '../../../constants';
import {CurrencyCode} from '@shopify/react-i18n';

const todaysDate = new Date().toISOString();

/**
 * example shop query
 *
 * query ShopData {
 *   shop {
 *     currencyCode
 *     timezoneAbbreviation
 *     ianaTimezone
 *
 *     features {
 *       sellsSubscriptions
 *     }
 *   }
 * }
 */
const getShopData = (): {
  currencyCode: CurrencyCode;
  sellsSubscriptions: boolean;
  timezoneAbbreviation: string;
} => ({
  currencyCode: CurrencyCode.Cad,
  sellsSubscriptions: false,
  timezoneAbbreviation: 'EDT',
});

const getDiscountData = (isEditing: boolean) => {
  if (isEditing) {
    /**
     * return data from query
     *
     * query Discount {
     *   discountNode(id: "gid://shopify/DiscountAutomaticNode/21") @skip(if: !isEditing) {
     *     discount {
     *       ... on DiscountAutomaticApp {
     *         discountId
     *         title
     *         startsAt
     *         endsAt
     *         status
     *         discountClass
     *         combinesWith {
     *           orderDiscounts
     *           productDiscounts
     *           shippingDiscounts
     *         }
     *         # ... additional fields
     *       }
     *       ... on DiscountCodeApp {
     *         # ... code discount fields
     *       }
     *     }
     *   }
     * }
     */
  }

  // defaults
  return {
    discountId: '',
    title: '',
    startsAt: todaysDate,
    endsAt: null,
    status: DiscountStatus.Scheduled,
    combinesWith: {
      orderDiscounts: false,
      productDiscounts: false,
      shippingDiscounts: false,
    },
    discountClass: DiscountClass.Product,
  };
};

/**
 *  appDiscountType(functionId: $functionID) {
 *    title
 *  }
 */
const appQuery = () => {
  return {
    title: 'My custom discount type',
  };
};

export default function DiscountPage({id = '1'}) {
  const isEditing = Boolean(id);

  const {currencyCode, sellsSubscriptions, timezoneAbbreviation} =
    getShopData();

  const discountData = getDiscountData(isEditing);
  const {title: appDiscountType} = appQuery();

  // Active dates
  const [startTime, setStartTime] = useState(discountData.startsAt);
  const [endTime, setEndTime] = useState<string | null>(discountData.endsAt);

  // Combination card
  const [combinesWith, setCombinesWith] = useState(discountData.combinesWith);

  // Method card
  const [discountMethod, setDiscountMethod] = useState<DiscountMethod>(
    DiscountMethod.Code,
  );
  const [discountTitle, setDiscountTitle] = useState<string>(
    discountData.title,
  );
  const [discountCode, setDiscountCode] = useState<string>('');

  // Minimum requirements card
  const [requirementType, setRequirementType] = useState<RequirementType>(
    RequirementType.None,
  );
  const [subtotal, setSubtotal] = useState<string>();
  const [quantity, setQuantity] = useState<string>();

  // Usage limits card
  const [totalUsageLimit, setTotalUsageLimit] = useState<string | null>(null);
  const [oncePerCustomer, setOncePerCustomer] = useState(false);
  const [recurringPaymentType, setRecurringPaymentType] = useState(
    RecurringPaymentType.AllPayments,
  );
  const [recurringPaymentsLimit, setRecurringPaymentsLimit] = useState('');

  const discountDescriptor =
    discountMethod === DiscountMethod.Automatic ? discountTitle : discountCode;

  return (
    <Page title="Create discount">
      <Layout>
        <Layout.Section>
          <MethodCard
            title={appDiscountType}
            discountClass={discountData.discountClass}
            discountMethod={{
              value: discountMethod,
              onChange: setDiscountMethod,
            }}
            discountTitle={{
              value: discountTitle,
              onChange: setDiscountTitle,
            }}
            discountCode={{
              value: discountCode,
              onChange: setDiscountCode,
            }}
          />

          {discountMethod === DiscountMethod.Code && (
            <>
              <MinimumRequirementsCard
                appliesTo={AppliesToType.Products}
                currencyCode={currencyCode}
                requirementType={{
                  value: requirementType,
                  onChange: setRequirementType,
                }}
                subtotal={{
                  value: subtotal,
                  onChange: setSubtotal,
                }}
                quantity={{
                  value: quantity,
                  onChange: setQuantity,
                }}
                discountMethod={discountMethod}
                isRecurring={sellsSubscriptions}
              />
              <UsageLimitsCard
                totalUsageLimit={{
                  value: totalUsageLimit,
                  onChange: setTotalUsageLimit,
                }}
                oncePerCustomer={{
                  value: oncePerCustomer,
                  onChange: setOncePerCustomer,
                }}
                isRecurring={sellsSubscriptions}
                recurringPaymentType={{
                  value: recurringPaymentType,
                  onChange: setRecurringPaymentType,
                }}
                recurringPaymentLimit={{
                  value: recurringPaymentsLimit,
                  onChange: setRecurringPaymentsLimit,
                }}
              />
            </>
          )}
          <CombinationCard
            combinableDiscountTypes={{
              value: combinesWith,
              onChange: setCombinesWith,
            }}
            combinableDiscountCounts={{
              orderDiscountsCount: 0,
              productDiscountsCount: 3,
              shippingDiscountsCount: 0,
            }}
            discountClass={discountData.discountClass}
            discountDescriptor={discountDescriptor}
          />
          <ActiveDatesCard
            startDate={{
              value: startTime,
              onChange: setStartTime,
            }}
            endDate={{
              value: endTime,
              onChange: setEndTime,
            }}
            timezoneAbbreviation={timezoneAbbreviation}
          />
        </Layout.Section>
        <Layout.Section secondary>
          <SummaryCard
            header={{
              discountMethod: discountMethod,
              appDiscountType,
              discountDescriptor,
              isEditing,
              discountStatus: discountData.status,
            }}
            performance={{
              status: discountData.status,
            }}
            activeDates={{
              startDate: startTime,
              endDate: endTime,
            }}
            combinations={{
              combinesWith: combinesWith,
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
              currencyCode: currencyCode,
              maximumShippingPrice: '1123',
            }}
            selectedCountries={{
              countrySelectionType: CountrySelectionType.SelectedCountries,
              selectedCountries: [SupportedCountryCode.Ca],
            }}
            {...(discountMethod === DiscountMethod.Code
              ? {
                  minimumRequirements: {
                    requirementType: requirementType,
                    subtotal: subtotal,
                    quantity: quantity,
                    currencyCode: currencyCode,
                  },
                  usageLimits: {
                    totalUsageLimit: totalUsageLimit,
                    oncePerCustomer: oncePerCustomer,
                  },
                }
              : {})}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
