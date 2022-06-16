import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {DiscountsI18nProvider} from '../DiscountsI18nProvider';

describe('DiscountsI18nProvider', () => {
  const Child = () => <div>Hello</div>;

  it('renders children', () => {
    const provider = mountWithApp(
      <DiscountsI18nProvider>
        <Child />
      </DiscountsI18nProvider>,
    );

    expect(provider).toContainReactComponent(Child);
  });
});
