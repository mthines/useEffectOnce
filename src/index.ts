import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef } from 'react';

/**
 * These hooks has been added to our `.eslintrc` file as well, so we keep the `react-hooks/exhaustive-deps` warning.
 * @see https://www.npmjs.com/package/eslint-plugin-react-hooks#advanced-configuration
 */

const depsFallback: DependencyList = []

/**
 * `useEffect`, but will conditional execution
 * If no `condition` (3rd argument) is passed, then it'll only run once, on mount
 * If a `condition` is passed, then it'll run until that condition is true
 * 
 * @example
  ```tsx
    const Component = ({ data, isFetched }: { data?: Record<string, string>, isFetched?: boolean }) => {
      useEffectOnce(
        () => {
          // This will get executed once the 3rd argument is `true`, and then never again 
          // if no 3rd argument is passed, then it'll only run once, on mount

          return () =>  {
            // This will still run on unmount
          }
        },
        [data, isFetched],
        !!data && isFetched,
      );

      return (
        ...JSX
      )
    }
  ```
 */
export const useEffectOnce = (effect: EffectCallback, deps?: DependencyList, condition?: boolean) => {
  const prevCondition = useRef<boolean | undefined>();

  useEffect(() => {
    if (prevCondition.current) return;

    prevCondition.current = condition ?? true;

    return effect();
  }, [...(deps || depsFallback), condition]);
};

/**
 * `useLayoutEffect`, but will conditional execution.
 * If no `condition` (3rd argument) is passed, then it'll only run once, on mount
 * If a `condition` is passed, then it'll run until that condition is true
 * 
 * @example
  ```tsx
    const Component = ({ data, isFetched }: { data?: Record<string, string>, isFetched?: boolean }) => {
      useLayoutEffectOnce(
        () => {
          // This will get executed once the 3rd argument is `true`, and then never again 
          // if no 3rd argument is passed, then it'll only run once, on mount

          return () =>  {
            // This will still run on unmount
          }
        },
        [data, isFetched],
        !!data && isFetched,
      );

      return (
        ...JSX
      )
    }
  ```
 */
export const useLayoutEffectOnce = (effect: EffectCallback, deps?: DependencyList, condition?: boolean) => {
  const prevCondition = useRef<boolean | undefined>();

  useLayoutEffect(() => {
    if (prevCondition.current) return;

    prevCondition.current = condition ?? true;

    return effect();
  }, [...(deps || depsFallback), condition]);
};
