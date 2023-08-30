import React, {useState} from 'react';

import {Page} from '@shopify/polaris';
import {CurrencyField} from '../../../components/CurrencyField';
import {CurrencyCode} from '@shopify/react-i18n';
import {FormattedNumberField} from '../../../components/FormattedNumberField';

export default function CurrencyFieldPattern() {
  const [value, setValue] = useState('100000.45');

  return (
    <Page>
      <CurrencyField
        currencyCode={CurrencyCode.Usd}
        label="Some label"
        onChange={setValue}
        value={value}
      />
      <FormattedNumberField
        label="Some label"
        onChange={setValue}
        value={value}
      />
      value is {value}
    </Page>
  );
}
