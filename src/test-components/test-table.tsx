import Table from '@awsui/components-react/table';
import type { MutableRefObject, ReactElement } from 'react';
import { useRef } from 'react';
import type { UseAwsuiTableItemDescriptionProps } from '..';
import useAwsuiTableItemDescription from '..';
import TestAwsuiTableItemDescription from '../test-components/test-awsui-table-item-description';
import ASYNC_EFFECT_REF from '../test-constants/async-effect-ref';
import TEST_COLUMN_DEFINITIONS from '../test-constants/test-column-definitions';
import type TestItem from '../test-types/test-item';

const DEFUALT_COL_SPAN = 1;

export default function TestTable({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component = TestAwsuiTableItemDescription,
  colSpan = DEFUALT_COL_SPAN,
  items,
  onRowClick,
}: Omit<
  Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
  'ref'
> &
  Pick<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>): ReactElement {
  const ref: MutableRefObject<HTMLElement | null> = useRef(null);

  ASYNC_EFFECT_REF.current = useAwsuiTableItemDescription({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component,
    colSpan,
    items,
    onRowClick,
    ref,
  }).current;

  return (
    <span ref={ref}>
      <Table columnDefinitions={TEST_COLUMN_DEFINITIONS} items={items} />
    </span>
  );
}
