import React, {StrictMode} from 'react';
import {mount} from 'tests/utilities';

import {DiscountAppComponentsTestProvider} from '../DiscountAppComponentsTestProvider';

describe('DiscountAppComponentsTestProvider', () => {
  it("doesn't render in strict mode by default", () => {
    const testProvider = mount(
      <DiscountAppComponentsTestProvider>
        <div>Hello</div>
      </DiscountAppComponentsTestProvider>,
    );

    expect(testProvider).not.toContainReactComponent(StrictMode);
  });

  it('renders in strict mode with strict', () => {
    const testProvider = mount(
      <DiscountAppComponentsTestProvider strict>
        <div>Hello</div>
      </DiscountAppComponentsTestProvider>,
    );

    expect(testProvider).toContainReactComponent(StrictMode);
  });
});
