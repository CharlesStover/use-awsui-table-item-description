import { ComponentType } from 'react';
import { render } from 'react-dom';

export default function promisifiedRender<T>(
  Component: ComponentType<T>,
  props: T,
  target: Element,
): Promise<void> {
  return new Promise((resolve): void => {
    render(<Component {...props} />, target, resolve);
  });
}
