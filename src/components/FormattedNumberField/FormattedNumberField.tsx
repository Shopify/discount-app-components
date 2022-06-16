import React, {useState, useEffect, useCallback} from 'react';
import {TextField, TextFieldProps, EventListener} from '@shopify/polaris';
import {usePrevious} from '@shopify/react-hooks';
import {useI18n} from '@shopify/react-i18n';

// The FormattedNumberField is _not_ a fully controlled component, and only calls the onChange
type MassagedTextFieldProps = Omit<
  TextFieldProps,
  'onChange' | 'autoComplete'
> & {
  /** Called with unformatted value when field loses focus */
  onChange(value: string): void;

  /**
   * (optional) When provided, sets the autocomplete property of the underlying TextField
   * @default 'off'
   */
  autoComplete?: string;
};

interface AdditionalProps {
  /**
   * (optional) This component is _not_ fully controlled and the `onChange` prop is triggered with the real numeric (read: not currency formatted) value when the field loses focus.
   *
   * To avoid the chance of your state storing an invalid number, use this prop _only_ if you need to trigger some action (e.g. clearing error state) when the field is changed.
   */
  onInput?: (value: string) => void;

  /** (optional) Minimum number of fractional digits to display */
  minimumFractionDigits?: number;

  /** (optional) Maximum number of fractional digits to display */
  maximumFractionDigits?: number;

  /** (optional) Forces values to be positive */
  positiveOnly?: boolean;

  /** (optional) Uses the provided placeholder when input is set to empty */
  defaultToPlaceholder?: boolean;

  /** (optional) Ignores all formatting and behaves like a regular TextField when set to true */
  noFormatting?: boolean;

  /** (optional) Function to format the input */
  format?: (value: string) => string;

  /** (optional) Function to unformat the input */
  unformat?: (value: string) => string;
}

export type FormattedNumberFieldProps = MassagedTextFieldProps &
  AdditionalProps;

const FALLBACK_INPUT = '0';
const MINIMUM_FRACTION_DIGITS = 0;

export function FormattedNumberField({
  value,
  format,
  unformat,
  noFormatting,
  autoComplete,
  placeholder,
  defaultToPlaceholder,
  onChange,
  onInput,
  onBlur,
  positiveOnly,
  minimumFractionDigits = MINIMUM_FRACTION_DIGITS,
  maximumFractionDigits,
  ...textFieldProps
}: FormattedNumberFieldProps) {
  const [fieldValue, setFieldValue] = useState('');
  const [addEventListener, setAddEventListener] = useState(false);
  const [i18n] = useI18n();
  const previousValue = usePrevious(value);

  const handleChange = (value: string) => {
    onInput?.(value);

    setFieldValue(value);
    if (!addEventListener) setAddEventListener(true);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  const handleBlur = () => {
    if (noFormatting) {
      return;
    }
    const unformattedNumber =
      unformat == null ? defaultUnformat(fieldValue) : unformat(fieldValue);
    const unformatted = positiveOnly
      ? unformattedNumber.replace('-', '')
      : unformattedNumber;

    const normalizedFieldValue =
      unformatted === '' && fieldValue !== '' ? FALLBACK_INPUT : unformatted;

    const newFieldValue = formatInput(normalizedFieldValue);

    setFieldValue(newFieldValue);
    setAddEventListener(false);

    if (onBlur) {
      onBlur();
    }

    if (maximumFractionDigits !== undefined) {
      const roundedNormalizedFieldValue = round(
        Number(normalizedFieldValue),
        maximumFractionDigits,
      );
      onChange(String(roundedNormalizedFieldValue));
      return;
    }

    onChange(normalizedFieldValue);
  };

  const defaultFormat = useCallback(
    (value: string) => {
      if (maximumFractionDigits !== undefined) {
        return i18n.formatNumber(Number(value), {
          minimumFractionDigits,
          maximumFractionDigits: Math.max(
            maximumFractionDigits,
            minimumFractionDigits,
          ),
        });
      }
      return i18n.formatNumber(Number(value), {
        minimumFractionDigits,
      });
    },
    [i18n, maximumFractionDigits, minimumFractionDigits],
  );

  const defaultUnformat = (value: string) => {
    const unformattedNumber = i18n.unformatNumber(value);

    if (unformattedNumber === '' && defaultToPlaceholder && placeholder) {
      return i18n.unformatNumber(placeholder);
    } else {
      return unformattedNumber;
    }
  };

  const formatInput = useCallback(
    (input: string) => {
      if (noFormatting) {
        return input;
      }
      if (isNaN(Number(input)) || input === '') {
        return '';
      }

      return format == null ? defaultFormat(input) : format(input);
    },
    [defaultFormat, format, noFormatting],
  );

  // Sync the "value" prop into state
  useEffect(() => {
    if (value !== previousValue && value !== fieldValue) {
      const formatted = value ? formatInput(value) : '';
      setFieldValue(formatted);
    }
  }, [value, fieldValue, formatInput, previousValue]);

  const onKeyPressListener = addEventListener ? (
    <EventListener event="keypress" handler={handleKeyPress} />
  ) : null;

  return (
    <>
      <TextField
        {...textFieldProps}
        autoComplete={autoComplete ? autoComplete : 'off'}
        placeholder={
          placeholder == null ? formatInput(FALLBACK_INPUT) : placeholder
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={fieldValue}
      />
      {onKeyPressListener}
    </>
  );
}

function round(value: number, maximumFractionDigits: number) {
  const multiplier = 10 ** maximumFractionDigits;
  return Math.round(value * multiplier) / multiplier;
}
