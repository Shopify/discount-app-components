import React from 'react';
import {TextField} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';
import {I18n} from '@shopify/react-i18n';

import type {FormattedNumberFieldProps} from '../FormattedNumberField';
import {FormattedNumberField} from '../FormattedNumberField';

describe('<FormattedNumberField />', () => {
  describe('input formatting', () => {
    it('formats en-US with , as groupings and . as the decimal', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1234.99',
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: '1,234.99'});
    });

    it('returns empty string for alphanumberic prop values', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1a2b3c.34',
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: ''});
    });

    it('formats number with the min number of decimals', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1234',
        minimumFractionDigits: 2,
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: '1,234.00'});
    });

    it('formats number with the max number of decimals', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1.23452',
        maximumFractionDigits: 2,
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: '1.23'});
    });

    it('formats number with the max number of decimals using minimumFractionDigits when greater than maximumFractionDigits', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1.23452',
        minimumFractionDigits: 4,
        maximumFractionDigits: 2,
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: '1.2345'});
    });

    it('does not format and strip alphanumber string when noFormatting prop present', () => {
      const numberField = generateFormattedNumberField(
        {
          locale: 'en-US',
          value: '12.4 - 13.4',
        },
        {noFormatting: true},
      );

      expect(numberField.find(TextField)).toHaveReactProps({
        value: '12.4 - 13.4',
      });
    });
  });

  describe('input unformatting', () => {
    it('unformats jibberish to 0', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '123',
      });

      const textField = () => numberField.find(TextField);
      textField()!.trigger('onChange', 'asdf');
      textField()!.trigger('onBlur');

      expect(textField()).toHaveReactProps({value: '0'});
    });

    it('persists the empty string value on blur if the field was left empty', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '1234',
      });

      const textField = () => numberField.find(TextField);
      textField()!.trigger('onChange', '');
      textField()!.trigger('onBlur');

      expect(textField()).toHaveReactProps({value: ''});
    });

    it('shows negative value if value property is negative', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '-10',
      });

      expect(numberField.find(TextField)).toHaveReactProps({value: '-10'});
    });

    it('shows negative value after blur if input is negative', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '',
      });

      numberField.find(TextField)!.trigger('onChange', '-10');

      expect(numberField.find(TextField)).toHaveReactProps({value: '-10'});

      numberField.find(TextField)!.trigger('onBlur');

      expect(numberField.find(TextField)).toHaveReactProps({value: '-10'});
    });

    it('does not unformat and strip alphanumeric string when noFormatting prop present', () => {
      const numberField = generateFormattedNumberField(
        {
          locale: 'en-US',
          value: '12.4 - 13.4',
        },
        {noFormatting: true},
      );

      expect(numberField.find(TextField)).toHaveReactProps({
        value: '12.4 - 13.4',
      });
    });
  });

  describe('positiveOnly', () => {
    it('shows normalized value on blur for negative currency value when set to true', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '-10',
        positiveOnly: true,
      });

      numberField.find(TextField)!.trigger('onBlur');

      expect(numberField.find(TextField)).toHaveReactProps({value: '10'});
    });
  });

  describe('onBlurUnformatted', () => {
    it('gets called with normalized field value on blur', () => {
      const onChangeSpy = jest.fn();
      const value = '123';

      const numberField = generateFormattedNumberField(
        {locale: 'en-US', value},
        {onChange: onChangeSpy},
      );

      const textField = numberField.find(TextField);
      const normalizedFieldValue = new I18n([], {
        locale: 'en-US',
      }).unformatNumber(value);

      textField!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(normalizedFieldValue);
    });

    it('gets called with negative value on blur if input is negative', () => {
      const onChangeSpy = jest.fn();
      const numberField = generateFormattedNumberField(
        {
          locale: 'en-US',
          value: '',
        },
        {onChange: onChangeSpy},
      );

      numberField.find(TextField)!.trigger('onChange', '-10');
      numberField.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith('-10');
    });

    it('gets called with rounded normalized value with number of decimals matching received maximumFractionDigits', () => {
      const onChangeSpy = jest.fn();
      const value = '1.2356';

      const numberField = generateFormattedNumberField(
        {locale: 'en-US', value, maximumFractionDigits: 3},
        {onChange: onChangeSpy},
      );

      numberField.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith('1.236');
    });
  });

  describe('placeholder', () => {
    it('provides a default placeholder of 0 formatted in the current currency', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '',
      });

      expect(numberField.find(TextField)).toHaveReactProps({placeholder: '0'});
    });

    it('allows for an empty placeholder if not undefined', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '',
        placeholder: '',
      });

      expect(numberField.find(TextField)).toHaveReactProps({placeholder: ''});
    });

    it('allows for a custom placeholder', () => {
      const placeholder = 'enter $ here';
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '',
        placeholder,
      });

      expect(numberField.find(TextField)).toHaveReactProps({placeholder});
    });
  });

  describe('defaultToPlaceholder', () => {
    it('does not fall back to placeholder by default', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '12',
        placeholder: '1.23',
        defaultToPlaceholder: false,
      });

      const textField = () => numberField.find(TextField);
      textField()!.trigger('onChange', '');
      textField()!.trigger('onBlur');

      expect(textField()).toHaveReactProps({value: ''});
    });

    it('falls back to unformatted placeholder if true', () => {
      const numberField = generateFormattedNumberField({
        locale: 'en-US',
        value: '12',
        placeholder: '1.0',
        defaultToPlaceholder: true,
      });

      const textField = () => numberField.find(TextField);
      textField()!.trigger('onChange', '');
      textField()!.trigger('onBlur');

      expect(textField()).toHaveReactProps({value: '1'});
    });
  });
});

interface Opts {
  locale: string;
  value: string;
  positiveOnly?: boolean;
  placeholder?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  defaultToPlaceholder?: boolean;
}

function generateFormattedNumberField(
  opts: Opts,
  partialProps?: Partial<FormattedNumberFieldProps>,
) {
  const {
    locale,
    value,
    positiveOnly,
    placeholder,
    minimumFractionDigits,
    maximumFractionDigits,
    defaultToPlaceholder,
  } = opts;

  return mountWithApp(
    <FormattedNumberField
      value={value}
      positiveOnly={positiveOnly}
      label="Price"
      placeholder={placeholder}
      minimumFractionDigits={minimumFractionDigits}
      maximumFractionDigits={maximumFractionDigits}
      defaultToPlaceholder={defaultToPlaceholder}
      onChange={noop}
      {...partialProps}
    />,
    {locale},
  );
}

function noop() {}
