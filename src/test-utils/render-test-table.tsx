import { render } from '@testing-library/react';
import type { UseAwsuiTableItemDescriptionProps } from '..';
import TestTable from '../test-components/test-table';
import type TestItem from '../test-types/test-item';
import asyncEffect from '../test-utils/async-effect';

interface State {
  container: HTMLElement;
}

export default async function renderTestTable(
  props: Omit<
    Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
    'ref'
  > &
    Pick<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>,
): Promise<State> {
  const { container } = render(<TestTable {...props} />);

  await asyncEffect();

  return {
    container,
  };
}
