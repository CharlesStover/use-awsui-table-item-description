import { act } from '@testing-library/react';
import ASYNC_EFFECT_REF from '../test-constants/async-effect-ref';

export default async function asyncEffect(): Promise<void> {
  await act(
    async (): Promise<void> => {
      await ASYNC_EFFECT_REF.current;
    },
  );
}
