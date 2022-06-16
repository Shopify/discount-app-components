TODO: this file should be reviewed and updated before releasing publicly

TODO we should look at polaris-react's contribution guidelines to see if there's anything valuable we can add from there.

- TODO testing recommendations

TODO We require contributors to sign a [Contributor License Agreement (CLA)](https://cla.shopify.com/). When we release to prod, we'll need to [configure the repo](https://development.shopify.io/engineering/overview/approach/open_source#2_5_Accepting_contributions_from_others) to not accept any PRs from contributors that have not signed.

## Organization

Folder structure should reflect our guidelines as defined in https://github.com/Shopify/web-foundations/blob/main/handbook/Best%20Practices/React/Organization.md (TODO this is an internal link and should be replaced with something else before we release publicly)

## Acceptance criteria for new components

- The component is defined in the directory: `src/components/<MyComponent>`
- The component is written in Typescript
- Any component props relating to the discount form state should be of a type `Field<Value>`
- At a minimum, the component exports one named export for the component (e.g. `export function MyComponent`) and the component's interface named `<ComponentName>Props` (e.g. `export interface MyComponentProps`)
- The component folder has an index.ts file that contains `export * from './<ComponentName>'`
- The component folder has tests in a directory <ComponentName>/tests and follows recommended best practices for [testing](https://github.com/Shopify/web-foundations/blob/main/handbook/Best%20Practices/Testing.md) and [jest](https://github.com/Shopify/web-foundations/blob/main/handbook/Best%20Practices/Jest.md)
- The component interface should contain a JSDoc comment for each property describing what it does and calling out any default values. E.g.

```tsx
interface MyComponentProps {
  /** <What someField does> */
  someField: string;

  /**
   * Size of some thing
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}
```

- The component has a README that follows the [README guidelines](./SAMPLE_README.md)
- The component should **not** render any static string content. All strings rendered by the component should use Shopify's [react-i18n library](https://github.com/Shopify/quilt/tree/main/packages/react-i18n). Translations should **not** be added at the individual component level, but should instead be declared in the appropriate locales/<locale>.json file.
- The component directory has an index.ts file that re-exports anything that should be surfaced outside the component directory. E.g.

```tsx
export * from './MyComponent';
export * from './components';
```

- After adding the component, re-export the component in src/index.ts. N.B. types should be exported using the `export type` syntax. For example:

```tsx
export {MyComponent, MySubComponent} from './components/MyComponent';
export type {
  MyComponentProps,
  MySubComponentProps,
} from './components/MyComponent';
```

(optionally)

- If the component needs to configure styles, they should be defined in a <MyComponent>.scss file in the /src/components/<MyComponent> directory
- If the component is complex, sub-components may either be declared after the exported component body (for simple components) or declared in <ComponentName>/components/<SubComponentName>. The subcomponent should follow all the Component recommendations and patterns listed above (naming, exports, index, readme, testing, etc)

## Adding a new utility function

- A utility function should be commented using JSDoc syntax
