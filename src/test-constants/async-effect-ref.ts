import type { MutableRefObject } from 'react';

const ASYNC_EFFECT_REF: MutableRefObject<Promise<unknown> | undefined> = {
  current: undefined,
};

export default ASYNC_EFFECT_REF;
