import { render } from '@testing-library/react';
import type { UseAwsuiTableItemDescriptionProps } from '../..';
import TestTable from '../components/test-table';
import type TestItem from '../types/test-item';

interface State {
  container: HTMLElement;
}

export default function renderTestTable(
  props: Omit<
    Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
    'ref'
  > &
    Pick<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>,
): State {
  const { container } = render(<TestTable {...props} />);

  return {
    container,
  };
}
