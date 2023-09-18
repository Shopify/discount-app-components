// Everything re-exported from this file will be included in the build.

import './configure';

// types
export type {
  DateTime,
  Decimal,
  Field,
  LinkAction,
  MoneyInput,
  Option,
  PositiveNumericValue,
  PositiveNumericString,
  Country,
  Customer,
  CustomerSegment,
  CombinableDiscountTypes,
  CombinableDiscountCounts,
} from './types';

// constants
export {
  Weekday,
  DiscountMethod,
  DiscountClass,
  RecurringPaymentType,
  RequirementType,
  AppliesToType,
  CountrySelectionType,
  DiscountStatus,
  Eligibility,
  PurchaseType,
} from './constants';

// provider
export {AppProvider} from './components/AppProvider';
export type {AppProviderProps} from './components/AppProvider';

// components
export {ActiveDatesCard} from './components/ActiveDatesCard';
export type {ActiveDatesCardProps} from './components/ActiveDatesCard';

export {AppBridgeLink} from './components/AppBridgeLink';
export type {AppBridgeLinkProps} from './components/AppBridgeLink';

export {CombinationCard} from './components/CombinationCard';
export type {CombinationCardProps} from './components/CombinationCard';

export {CountriesAndRatesCard} from './components/CountriesAndRatesCard';
export type {CountriesAndRatesCardProps} from './components/CountriesAndRatesCard';

export {CustomerEligibilityCard} from './components/CustomerEligibilityCard';
export type {CustomerEligibilityCardProps} from './components/CustomerEligibilityCard';

export {CurrencyField} from './components/CurrencyField';
export type {CurrencyFieldProps} from './components/CurrencyField';

export {DatePicker} from './components/DatePicker';
export type {DatePickerProps} from './components/DatePicker';

export {DiscountAppComponentsTestProvider} from './components/DiscountAppComponentsTestProvider';
export type {DiscountAppComponentsTestProviderProps} from './components/DiscountAppComponentsTestProvider';

export {DiscountCodeGenerator} from './components/DiscountCodeGenerator';
export type {DiscountCodeGeneratorProps} from './components/DiscountCodeGenerator';

export {FormattedNumberField} from './components/FormattedNumberField';
export type {FormattedNumberFieldProps} from './components/FormattedNumberField';

export {MethodCard} from './components/MethodCard';
export type {MethodCardProps} from './components/MethodCard';

export {MinimumRequirementsCard} from './components/MinimumRequirementsCard';
export type {MinimumRequirementsCardProps} from './components/MinimumRequirementsCard';

export {PurchaseTypeCard} from './components/PurchaseTypeCard';
export type {PurchaseTypeCardProps} from './components/PurchaseTypeCard';

export {SelectedItemsList} from './components/SelectedItemsList';
export type {SelectedItemsListProps} from './components/SelectedItemsList';

export {SummaryCard} from './components/SummaryCard';
export type {SummaryCardProps} from './components/SummaryCard';

export {TimePicker} from './components/TimePicker';
export type {TimePickerProps} from './components/TimePicker';

export {UsageLimitsCard} from './components/UsageLimitsCard';
export type {UsageLimitsCardProps} from './components/UsageLimitsCard';

// utilities
export {
  formatDateListAsOptionList,
  generateTimes,
  getLocalizedTimeForDate,
  getValidDateForTime,
  isValidTime,
} from './components/TimePicker/utilities';

export {
  getBrowserAndShopTimeZoneOffset,
  getNewDateAtStartOfDay,
} from './utilities/dates';

export {useLocalizeCountry} from './components/CountriesAndRatesCard/utilities';

export {onBreadcrumbAction, handleRedirect} from './utilities/navigation';

export {generateRandomDiscountCode} from './components/DiscountCodeGenerator/utilities';
export {ValueCard} from './components/ValueCard';

export {DiscountApplicationStrategyCard} from './components/DiscountApplicationStrategyCard';

export {AppliesTo} from './components/AppliesTo';
