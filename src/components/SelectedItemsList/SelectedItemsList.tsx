import React from 'react';

import {Item} from './components';
import styles from './SelectedItemsList.scss';

interface Item {
  id: string;
  [key: string]: any;
}
export interface SelectedItemsListProps<T> {
  items: T[];
  renderItem(item: T): React.ReactNode;
  onRemoveItem?(id: string): void;
}

export function SelectedItemsList({
  items,
  renderItem,
  onRemoveItem,
}: SelectedItemsListProps<Item>) {
  return (
    <ul className={styles.SelectedItemsList}>
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            {...(onRemoveItem && {onRemove: () => onRemoveItem(item.id)})}
          >
            {renderItem(item)}
          </Item>
        );
      })}
    </ul>
  );
}
