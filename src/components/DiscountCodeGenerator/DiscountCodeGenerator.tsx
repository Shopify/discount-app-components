import React from 'react';
import {Button, TextField} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import type {Field} from '../../types';
import {DEFAULT_DISCOUNT_CODE_LENGTH} from '../../constants';

import {generateRandomDiscountCode} from './utilities';

export interface DiscountCodeGeneratorProps {
  /**
   * Field to be used for the discount code.
   */
  discountCode: Field<string>;

  /**
   * (optional) If provided, sets the default length of generated discount codes
   *
   * @default DEFAULT_DISCOUNT_CODE_LENGTH
   */
  defaultLength?: number;
}

export function DiscountCodeGenerator({
  discountCode,
  defaultLength = DEFAULT_DISCOUNT_CODE_LENGTH,
}: DiscountCodeGeneratorProps) {
  const [i18n] = useI18n();

  const handleGenerateDiscount = () =>
    discountCode.onChange(generateRandomDiscountCode(defaultLength));

  return (
    <TextField
      autoComplete="off"
      label={i18n.translate(
        'DiscountAppComponents.DiscountCodeGenerator.field.label',
      )}
      helpText={i18n.translate(
        'DiscountAppComponents.DiscountCodeGenerator.field.helpText',
      )}
      {...discountCode}
      connectedRight={
        <Button onClick={handleGenerateDiscount} size="large">
          {i18n.translate(
            'DiscountAppComponents.DiscountCodeGenerator.buttonText',
          )}
        </Button>
      }
    />
  );
}
