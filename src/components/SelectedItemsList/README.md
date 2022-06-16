## SelectedItemsList

## A list that allows users to view, and remove selected items

This list is useful to display a list of selected items to the user and allows them to remove the items. It is used in the following component: `CountriesAndRatesCard`.

## Examples

### Basic usage

```jsx
<SelectedItemsList
  items={[
    {id: '1', name: 'Canada', code: 'CA'},
    {id: '2', name: 'USA', code: 'US'},
  ]}
  idForItem={(item) => item.id}
  renderItem={(item) => <div>item.name</div>}
  onRemoveItem={handleRemoveItem}
/>
```
