import type {ReactElement} from 'react';
import type {Redirect} from '@shopify/app-bridge/actions';
import type {
  AdminSectionPayload,
  Section,
} from '@shopify/app-bridge/actions/Navigation/Redirect';
import type {CurrencyCode} from '@shopify/react-i18n';
import {Resource} from '@shopify/app-bridge/actions/ResourcePicker';

import type {REST_OF_WORLD, SupportedCountryCode} from './constants';

export type DateTime = string;
export type Decimal = string;

/**
 * @deprecated use {@link PositiveNumericString} instead
 */
export type PositiveNumericValue = string;

export type PositiveNumericString = string;

export interface Field<TValue> {
  value: TValue;
  onChange(value: TValue): void;
  onBlur?: () => void;
  error?: string | ReactElement | (string | ReactElement)[];
}

export interface Option {
  value: string;
  label: string;
}

interface ExternalAction {
  action: Redirect.Action.REMOTE | Redirect.Action.ADMIN_PATH;
  url: string;
  newContext?: boolean;
}

interface AppAction {
  action: Redirect.Action.APP;
  url: string;
}

interface ComplexAction {
  action: Redirect.Action.ADMIN_SECTION;
  payload: Section | AdminSectionPayload;
}

export type LinkAction = AppAction | ExternalAction | ComplexAction;

export interface MoneyInput {
  amount: Decimal;
  currencyCode: CurrencyCode;
}

export interface Country {
  id: CountryCode;
  name: string;
}

export interface Customer {
  id: string;
  displayName: string;
  email?: string | null;
}

export interface CustomerSegment {
  id: string;
  name: string;
}

export interface CombinableDiscountTypes {
  orderDiscounts: boolean;
  productDiscounts: boolean;
  shippingDiscounts: boolean;
}

export interface CombinableDiscountCounts {
  productDiscountsCount: number;
  orderDiscountsCount: number;
  shippingDiscountsCount: number;
}

export type CountryCode = SupportedCountryCode | typeof REST_OF_WORLD;

export enum DiscountApplicationStrategy {
  First = 'FIRST',
  Maximum = 'MAXIMUM',
}
export interface ProductOrCollectionResource extends Resource {
  title: string;
}
