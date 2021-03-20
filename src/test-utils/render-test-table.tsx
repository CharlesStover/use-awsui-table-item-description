import { render } from '@testing-library/react';
import TestTable from '../test-components/test-table';
import TestTableProps from '../test-types/test-table-props';
import asyncEffect from '../test-utils/async-effect';

interface State {
  container: HTMLElement;
}

export default async function renderTestTable(
  props: TestTableProps,
): Promise<State> {
  const { container } = render(<TestTable {...props} />);

  await asyncEffect();

  return {
    container,
  };
}
