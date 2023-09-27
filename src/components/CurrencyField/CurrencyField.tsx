import React from 'react';
import {useI18n, CurrencyCode, I18n} from '@shopify/react-i18n';
import {InlineStack} from '@shopify/polaris';

import {
  FormattedNumberField,
  FormattedNumberFieldProps,
} from '../FormattedNumberField';

export type CurrencyFieldProps = FormattedNumberFieldProps & {
  /**
   * The currency code of the shop (e.g. `USD`).
   */
  currencyCode: CurrencyCode;

  /**
   * (optional) When true, appends the `suffix` prop from FormattedNumberFieldProps to the currency for currencies that display the currency symbol as a suffix (e.g. 200€)
   */
  appendSuffixToCurrency?: boolean;

  /**
   * (optional) When true, hides the currency symbol.
   */
  hideCurrencyCode?: boolean;

  /**
   * (optional) When true, hides the prefix.
   */
  hidePrefix?: boolean;

  /**
   * (optional) When true, hides the suffix.
   */
  hideSuffix?: boolean;
};

const DEFAULT_MAX_LENGTH = 24;

function CurrencyField({
  currencyCode,
  hideCurrencyCode,
  hidePrefix,
  hideSuffix,
  appendSuffixToCurrency,
  suffix,
  prefix,
  ...rest
}: CurrencyFieldProps) {
  const [i18n] = useI18n();

  return (
    <FormattedNumberField
      maxLength={rest.maxLength ?? DEFAULT_MAX_LENGTH}
      {...rest}
      prefix={
        Boolean(!hidePrefix && !hideCurrencyCode) &&
        renderPrefix(prefix, i18n, currencyCode)
      }
      suffix={
        Boolean(!hideSuffix && !hideCurrencyCode) &&
        renderSuffix(suffix, i18n, currencyCode, appendSuffixToCurrency)
      }
      format={(value: string) =>
        i18n.formatCurrency(Number(value), {
          currency: currencyCode,
          form: 'none',
        })
      }
      unformat={(value: string) => i18n.unformatCurrency(value, currencyCode)}
    />
  );
}

function currencyMetadata(i18n: I18n, currencyCode: CurrencyCode) {
  return i18n.getCurrencySymbolLocalized(i18n.locale, currencyCode);
}

function renderPrefix(
  prefix: React.ReactNode,
  i18n: I18n,
  currencyCode: CurrencyCode,
) {
  const {prefixed, symbol} = currencyMetadata(i18n, currencyCode);
  return prefixed ? prefix || symbol : prefix;
}

function renderSuffix(
  suffix: React.ReactNode,
  i18n: I18n,
  currencyCode: CurrencyCode,
  appendSuffixToCurrency?: boolean,
) {
  const {prefixed, symbol} = currencyMetadata(i18n, currencyCode);

  if (appendSuffixToCurrency && !prefixed && suffix) {
    return (
      <InlineStack align="center">
        <div>{symbol}</div>
        <div>{suffix}</div>
      </InlineStack>
    );
  }

  return prefixed ? suffix : suffix || symbol;
}

// eslint-disable-next-line import/no-default-export
export default React.memo(CurrencyField);
