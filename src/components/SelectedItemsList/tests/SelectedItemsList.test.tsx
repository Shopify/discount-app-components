import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SelectedItemsList, Item} from '..';
import type {Country} from '../../../types';

describe('<SelectedItemsList />', () => {
  const mockProps = {
    items: [
      {id: '1', name: 'Canada', countryCode: 'CA'},
      {id: '2', name: 'USA', countryCode: 'US'},
    ],
    renderItem,
    onRemoveItem: jest.fn(),
  };

  it('renders list of items', () => {
    const actionableList = mountWithApp(<SelectedItemsList {...mockProps} />);

    expect(actionableList).toContainReactComponentTimes(
      Item,
      mockProps.items.length,
    );
  });

  it('renders the result of renderItem as Item`s child', () => {
    const MockItem = (item: any) => <>{item.id}</>;
    const mockRenderItem = jest.fn().mockImplementation(() => <MockItem />);

    const actionableList = mountWithApp(
      <SelectedItemsList {...mockProps} renderItem={mockRenderItem} />,
    );

    expect(mockRenderItem).toHaveBeenNthCalledWith(1, mockProps.items[0]);
    expect(mockRenderItem).toHaveBeenNthCalledWith(2, mockProps.items[1]);

    expect(actionableList.findAll(Item)[0]).toContainReactComponent(MockItem);
    expect(actionableList.findAll(Item)[1]).toContainReactComponent(MockItem);
  });

  describe('onRemoveItem', () => {
    it('calls onRemoveItem with item id when item is removed', () => {
      const onRemoveItemSpy = jest.fn();

      const actionableList = mountWithApp(
        <SelectedItemsList {...mockProps} onRemoveItem={onRemoveItemSpy} />,
      );

      const listItems = actionableList.findAll(Item);
      listItems[0].trigger('onRemove', '1');
      expect(onRemoveItemSpy).toHaveBeenLastCalledWith('1');
    });
  });
});

function renderItem(item: Country) {
  return <p>{item.name}</p>;
}
