import Table from '@awsui/components-react/table';
import { MutableRefObject, ReactElement, useRef } from 'react';
import useAwsuiTableItemDescription from '..';
import TestAwsuiTableItemDescription from '../test-components/test-awsui-table-item-description';
import ASYNC_EFFECT_REF from '../test-constants/async-effect-ref';
import TEST_COLUMN_DEFINITIONS from '../test-constants/test-column-definitions';
import TestTableProps from '../test-types/test-table-props';

export default function TestTable({
  Component = TestAwsuiTableItemDescription,
  colSpan = 1,
  items,
  onRowClick,
}: TestTableProps): ReactElement {
  const ref: MutableRefObject<HTMLElement | null> = useRef(null);

  ASYNC_EFFECT_REF.current = useAwsuiTableItemDescription({
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
