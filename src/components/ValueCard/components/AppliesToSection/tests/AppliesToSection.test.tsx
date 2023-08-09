import {Button, ChoiceList} from '@shopify/polaris';

import {ResourcePickerActivator} from 'shared/components/ResourcePickerActivator';
import {AppliesTo} from 'sections/Discounts/DiscountDetails/types';
import {mockField, mountWithAppContext} from 'tests/modern';
import {CollectionResourcePicker} from 'shared/components/CollectionResourcePicker';
import {ProductResourcePicker} from 'shared/components/ProductResourcePicker';
import {
  SelectedProductVariantsList,
  SelectedCollectionsList,
} from 'sections/Discounts/DiscountDetails/components';

import {AppliesToSection} from '../AppliesToSection';

describe('<AppliesToSection/>', () => {
  const mockProps = {
    appliesTo: mockField(AppliesTo.Collections),
    selectedCollections: mockField([]),
    selectedProductVariants: mockField([]),
    isSubscriptionPurchase: false,
  };

  it('emits an onChange event when the applies to type is changed', async () => {
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} />,
    );

    appliesToSection
      .find(ChoiceList)
      ?.trigger('onChange', [AppliesTo.Products]);

    expect(mockProps.appliesTo.onChange).toHaveBeenCalledWith(
      AppliesTo.Products,
    );
  });

  it('renders a collection picker section when Collections is selected', async () => {
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} />,
    );

    expect(appliesToSection).toContainReactComponent(ResourcePickerActivator, {
      resourcesName: 'collections',
    });
    expect(appliesToSection).toContainReactComponent(SelectedCollectionsList);
  });

  it('renders a CollectionResourcePicker when the collections activator is activated.', async () => {
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} />,
    );

    const activator = appliesToSection.find(ResourcePickerActivator);
    activator?.find(Button)?.trigger('onClick');

    expect(appliesToSection).toContainReactComponent(CollectionResourcePicker, {
      open: true,
    });
  });

  it('renders a product variant picker section when products is selected', async () => {
    const appliesToField = mockField(AppliesTo.Products);
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} appliesTo={appliesToField} />,
    );

    expect(appliesToSection).toContainReactComponent(ResourcePickerActivator, {
      resourcesName: 'products',
    });
    expect(appliesToSection).toContainReactComponent(
      SelectedProductVariantsList,
    );
  });

  it('renders a ProductResourcePicker when the collections activator is activated.', async () => {
    const appliesToField = mockField(AppliesTo.Products);
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} appliesTo={appliesToField} />,
    );

    const activator = appliesToSection.find(ResourcePickerActivator);
    activator?.find(Button)?.trigger('onClick');

    expect(appliesToSection).toContainReactComponent(ProductResourcePicker, {
      open: true,
    });
  });

  it('calls selectedProductVariants with default value when no change', async () => {
    const appliesToField = mockField(AppliesTo.Products);
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} appliesTo={appliesToField} />,
    );

    const activator = appliesToSection.find(ResourcePickerActivator);
    activator?.find(Button)?.trigger('onClick');

    appliesToSection
      .find(ProductResourcePicker)
      ?.trigger(
        'onSelectedProductVariantsUpdate',
        mockProps.selectedProductVariants.value,
      );

    expect(mockProps.selectedProductVariants.onChange).toHaveBeenCalledWith(
      mockProps.selectedProductVariants.defaultValue,
    );
  });

  it('calls selectedProductVariants with new value when changed', async () => {
    const appliesToField = mockField(AppliesTo.Products);
    const appliesToSection = await mountWithAppContext(
      <AppliesToSection {...mockProps} appliesTo={appliesToField} />,
    );

    const activator = appliesToSection.find(ResourcePickerActivator);
    activator?.find(Button)?.trigger('onClick');

    const newField = [mockField([{id: '1'}])];

    appliesToSection
      .find(ProductResourcePicker)
      ?.trigger('onSelectedProductVariantsUpdate', newField);

    expect(mockProps.selectedProductVariants.onChange).toHaveBeenCalledWith(
      newField,
    );
  });
});
