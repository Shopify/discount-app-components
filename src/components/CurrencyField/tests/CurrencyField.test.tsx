import React from 'react';
import {TextField} from '@shopify/polaris';
import {CurrencyCode, I18n} from '@shopify/react-i18n';
import {CustomRoot, mountWithApp} from 'tests/utilities';

import CurrencyField from '../CurrencyField';
import type {CurrencyFieldProps} from '../CurrencyField';

let getCurrencySymbolLocalizedSpy: jest.SpyInstance;

describe('<CurrencyField />', () => {
  beforeEach(() => {
    getCurrencySymbolLocalizedSpy = jest.spyOn(
      I18n.prototype,
      'getCurrencySymbolLocalized',
    );
  });

  afterEach(() => {
    getCurrencySymbolLocalizedSpy.mockRestore();
  });

  describe('prefix', () => {
    it('prefixes $ for en-US locale', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '123',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        prefix: '$',
      });
    });

    it('overrides the prefixed currency symbol', () => {
      const prefixValue = 'prefix';

      const currencyField = generateCurrencyField(
        {
          locale: 'en',
          currencyCode: CurrencyCode.Usd,
          value: '123',
        },
        {prefix: prefixValue},
      );

      expect(currencyField.find(TextField)).toHaveReactProps({
        prefix: prefixValue,
      });
    });

    it('hides currency code symbol in prefix if hideCurrencyCode passed', () => {
      const currencyField = generateCurrencyField(
        {
          locale: 'en-US',
          currencyCode: CurrencyCode.Usd,
          value: '123',
        },
        {hideCurrencyCode: true},
      );

      expect(currencyField).toContainReactComponent(TextField, {prefix: false});
    });

    it('hides currency code symbol in prefix if hidePrefix passed', () => {
      const currencyField = generateCurrencyField(
        {
          locale: 'en-US',
          currencyCode: CurrencyCode.Usd,
          value: '123',
        },
        {hidePrefix: true},
      );

      expect(currencyField).toContainReactComponent(TextField, {prefix: false});
    });
  });

  describe('suffix', () => {
    const symbol = '€';

    it('suffixes € for fr locale', () => {
      getCurrencySymbolLocalizedSpy.mockReturnValue({
        prefixed: false,
        symbol,
      });

      const currencyField = generateCurrencyField({
        locale: 'fr',
        currencyCode: CurrencyCode.Eur,
        value: '123',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        suffix: symbol,
      });
    });

    it('overrides the suffixed currency symbol when appendSuffixToCurrency is false', () => {
      const suffixValue = 'suffix';

      getCurrencySymbolLocalizedSpy.mockReturnValue({
        prefixed: false,
        symbol,
      });

      const currencyField = generateCurrencyField(
        {
          locale: 'fr',
          currencyCode: CurrencyCode.Eur,
          value: '123',
        },
        {suffix: suffixValue, appendSuffixToCurrency: false},
      );

      expect(currencyField.find(TextField)).toHaveReactProps({
        suffix: suffixValue,
      });
    });

    it('appends a suffix when the currency symbol is on the right and appendSuffixToCurrency is true', () => {
      const suffixValue = 'suffix';

      getCurrencySymbolLocalizedSpy.mockReturnValue({
        prefixed: false,
        symbol,
      });

      const currencyField = generateCurrencyField(
        {
          locale: 'fr',
          currencyCode: CurrencyCode.Eur,
          value: '123',
        },
        {suffix: suffixValue, appendSuffixToCurrency: true},
      );

      const {suffix} = currencyField.find(TextField)!.props;
      const mountedSuffix = mountWithApp(suffix as React.ReactElement);

      expect(mountedSuffix).toContainReactText(symbol);
      expect(mountedSuffix).toContainReactText(suffixValue);
    });

    it('hides currency code symbol in suffix if hideCurrencyCode passed', () => {
      getCurrencySymbolLocalizedSpy.mockReturnValue({
        prefixed: false,
        symbol: '€',
      });

      const currencyField = generateCurrencyField(
        {
          locale: 'fr',
          currencyCode: CurrencyCode.Eur,
          value: '123',
        },
        {hideCurrencyCode: true},
      );

      expect(currencyField).toContainReactComponent(TextField, {suffix: false});
    });

    it('hides currency code symbol in suffix if hideSuffix passed', () => {
      getCurrencySymbolLocalizedSpy.mockReturnValue({
        prefixed: false,
        symbol: '€',
      });

      const currencyField = generateCurrencyField(
        {
          locale: 'fr',
          currencyCode: CurrencyCode.Eur,
          value: '123',
        },
        {hideSuffix: true},
      );

      expect(currencyField).toContainReactComponent(TextField, {suffix: false});
    });
  });

  describe('input formatting', () => {
    it('formats en-US in USD with , as groupings and . as the decimal', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '1234.99',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '1,234.99',
      });
    });

    it('adds decimal places to the value passed in when decimals are omitted', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '123',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '123.00',
      });
    });

    it('rounds the decimals to 2 digits', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '123.9995',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '124.00',
      });
    });

    it('removes decimal places for currencies with none', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Jpy,
        value: '234.12',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '234',
      });

      const field = () => currencyField.find(TextField);
      field()!.trigger('onChange', '123.45');
      field()!.trigger('onBlur');

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '123',
      });
    });

    it('returns empty string for alphanumberic prop values', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '1a2b3c.34',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '',
      });
    });
  });

  describe('input unformatting', () => {
    it('unformats jibberish to 0.00', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '123',
      });

      const field = () => currencyField.find(TextField)!;
      field().trigger('onChange', 'asdf');
      field().trigger('onBlur');

      expect(field()).toHaveReactProps({
        value: '0.00',
      });
    });

    it('persists the empty string value on blur if the field was left empty', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '1234',
      });

      const field = () => currencyField.find(TextField)!;
      field().trigger('onChange', '');
      field().trigger('onBlur');

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '',
      });
    });

    it('shows negative value if value property is negative', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '-10',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '-10.00',
      });
    });

    it('shows negative value after blur if input is negative', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '',
      });

      currencyField.find(TextField)!.trigger('onChange', '-10');

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '-10',
      });

      currencyField.find(TextField)!.trigger('onBlur');

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '-10.00',
      });
    });
  });

  describe('positiveOnly', () => {
    it('shows normalized value on blur for negative currency value when set to true', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '-10',
        positiveOnly: true,
      });

      currencyField.find(TextField)!.trigger('onBlur');

      expect(currencyField.find(TextField)).toHaveReactProps({
        value: '10.00',
      });
    });
  });

  describe('onBlurUnformatted', () => {
    it('gets called with normalized field value on blur', () => {
      const onChangeSpy = jest.fn();
      const currencyCode = CurrencyCode.Usd;
      const value = '123';

      const currencyField = generateCurrencyField(
        {locale: 'en-US', currencyCode, value},
        {onChange: onChangeSpy},
      );

      const textField = currencyField.find(TextField);

      const normalizedFieldValue = new I18n([], {
        locale: 'en-US',
      }).unformatCurrency(value, currencyCode);

      textField!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(normalizedFieldValue);
    });

    it('gets called with negative value on blur if input is negative', () => {
      const onChangeSpy = jest.fn();
      const currencyField = generateCurrencyField(
        {
          locale: 'en-US',
          currencyCode: CurrencyCode.Usd,
          value: '',
        },
        {onChange: onChangeSpy},
      );

      currencyField.find(TextField)!.trigger('onChange', '-10');
      currencyField.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith('-10.00');
    });
  });

  describe('validation', () => {
    it('limits currency length to 24 by default', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        maxLength: 24,
      });
    });
  });

  describe('placeholder', () => {
    it('provides a default placeholder of 0 formatted in the current currency', () => {
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '',
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        placeholder: '0.00',
      });
    });

    it('allows for a custom placeholder', () => {
      const placeholder = 'enter $ here';
      const currencyField = generateCurrencyField({
        locale: 'en-US',
        currencyCode: CurrencyCode.Usd,
        value: '',
        placeholder,
      });

      expect(currencyField.find(TextField)).toHaveReactProps({
        placeholder: 'enter $ here',
      });
    });
  });
});

interface Opts {
  locale: string;
  currencyCode: CurrencyCode;
  value: string;
  positiveOnly?: boolean;
  placeholder?: string;
}

function generateCurrencyField(
  opts: Opts,
  partialProps?: Partial<CurrencyFieldProps>,
): CustomRoot<any, any> {
  const {locale, currencyCode, value, positiveOnly, placeholder} = opts;

  return mountWithApp(
    <CurrencyField
      value={value}
      autoComplete="off"
      currencyCode={currencyCode}
      positiveOnly={positiveOnly}
      label="Price"
      onChange={noop}
      placeholder={placeholder}
      {...partialProps}
    />,
    {locale},
  );
}

function noop() {}
