# `useEffectOnce` & `useLayoutEffectOnce`

[![NPM](https://nodei.co/npm/use-effect-once.png?mini=true)](https://www.npmjs.com/package/use-effect-once)

### What is it?

- Expansions of `useEffect` and `useLayoutEffect`, but will conditional execution
- If no `condition` (3rd argument) is passed, then it'll only run once, on mount
- If a `condition` is passed, then it'll run until that condition is true

---

### Prereuisites

- `React`

---

### API

#### `useEffectOnce`

```tsx
export const useEffectOnce = (effect: EffectCallback, deps?: DependencyList, condition?: boolean) => {
```

#### `useLayoutEffectOnce`

```tsx
export const useLayoutEffectOnce = (effect: EffectCallback, deps?: DependencyList, condition?: boolean) => {
```

---

### How to use it?

```tsx
const Component = ({ data, isFetched }: { data?: Record<string, string>; isFetched?: boolean }) => {
  useEffectOnce(
    () => {
      // This will get executed once the 3rd argument is `true`, and then never again
      // if no 3rd argument is passed, then it'll only run once, on mount

      return () => {
        // This will still run on unmount
      };
    },
    [data, isFetched],
    !!data && isFetched,
  );

  return <>{...JSX}</>;
};
```

---

### `.eslintrc.js`

Given that you're utilising the `react-hooks/exhaustive-deps` `eslint` rule.

In order to get the `eslint` validation to work, we need to add the following to the `.eslintrc.js` file:

```js
module.exports = {
  ...
  rules: {
    ...
    'react-hooks/exhaustive-deps': [
      1,
      {
        additionalHooks: '(useEffectOnce|useLayoutEffectOnce)', // I'm the important part 😂❤️
      },
    ],
    ...
  },
};
```
