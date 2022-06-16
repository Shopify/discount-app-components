import React from 'react';
import {Button} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import {Item} from '..';

describe('Item', () => {
  const mockProps = {
    children: <p>Item name</p>,
    onRemove: jest.fn(),
  };

  it('renders children', () => {
    const listItem = mountWithApp(
      <Item {...mockProps}>{mockProps.children}</Item>,
    );
    expect(listItem).toContainReactComponent('p', {children: 'Item name'});
  });

  it('does not display "Remove" icon if onRemove is undefined', () => {
    const props = {
      ...mockProps,
      onRemove: undefined,
    };

    const listItem = mountWithApp(<Item {...props}>{mockProps.children}</Item>);

    expect(listItem).not.toContainReactComponent(Button);
  });

  it('calls onRemove function when clicked', () => {
    const mockOnRemoveFn = jest.fn();
    const props = {
      ...mockProps,
      onRemove: mockOnRemoveFn,
    };

    const listItem = mountWithApp(<Item {...props}>{mockProps.children}</Item>);
    expect(listItem).toContainReactComponent(Button);
    listItem.find(Button)?.trigger('onClick');
    expect(mockOnRemoveFn).toHaveBeenCalled();
  });
});
