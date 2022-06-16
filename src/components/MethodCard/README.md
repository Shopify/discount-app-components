# MethodCard

The Method Card enables users to toggle between `discountMethod`s to select code or automatic discount, and provides inputs to enter or generate a `discountCode` and `discountTitle`.

---

## Usage and best practices

- The discount code length only adjusts the default length of generated codes, and does not set a max length for the text input

## Examples

### Basic usage

```jsx
<MethodCard
  title="Buy X get Y"
  discountClass={DiscountClass.Product}
  discountMethod={methodField}
  discountCode={codeField}
/>
```

### With discount code generator default length

```jsx
<DiscountCodeGenerator discountCode={codeField} length={10} />
```

### With discount method choicelist hidden

When `discountMethodHidden` prop is provided, the choicelist for choosing between discount code and automatic discount will be hidden.

```jsx
<MethodCard
  title="Buy X get Y"
  discountClass={DiscountClass.Product}
  discountMethodHidden
  discountMethod={methodField}
  discountCode={codeField}
/>
```

## Related components

- The MethodCard renders a `DiscountCodeGenerator`
