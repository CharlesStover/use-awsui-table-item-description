import type { MutableRefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';

export default function useIsMounted(): MutableRefObject<boolean> {
  const isMounted: MutableRefObject<boolean> = useRef(true);

  useLayoutEffect((): VoidFunction => {
    return (): void => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
