import type { ComponentType } from 'react';
import { render } from 'react-dom';

export default async function promisifiedRender<T>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: ComponentType<T>,
  props: T,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  target: Element,
): Promise<void> {
  return new Promise((resolve): void => {
    render(<Component {...props} />, target, resolve);
  });
}
