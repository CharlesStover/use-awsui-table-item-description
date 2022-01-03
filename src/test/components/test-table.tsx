import Table from '@awsui/components-react/table';
import type { ComponentType, MutableRefObject, ReactElement } from 'react';
import { useRef } from 'react';
import type { UseAwsuiTableItemDescriptionProps } from '../..';
import useAwsuiTableItemDescription from '../..';
import TestAwsuiTableItemDescription from '../components/test-awsui-table-item-description';
import TEST_COLUMN_DEFINITIONS from '../constants/test-column-definitions';
import type TestItem from '../types/test-item';

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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Portal: ComponentType<Record<string, never>> =
    useAwsuiTableItemDescription({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Component,
      colSpan,
      items,
      onRowClick,
      ref,
    });

  return (
    <span ref={ref}>
      <Table columnDefinitions={TEST_COLUMN_DEFINITIONS} items={items} />
      <Portal />
    </span>
  );
}
