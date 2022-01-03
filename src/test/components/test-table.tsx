import Table from '@awsui/components-react/table';
import type { ComponentType, MutableRefObject, ReactElement } from 'react';
import { useRef } from 'react';
import type { UseAwsuiTableItemDescriptionProps } from '../..';
import useAwsuiTableItemDescription from '../..';
import TEST_COLUMN_DEFINITIONS from '../constants/test-column-definitions';
import type TestItem from '../types/test-item';

export default function TestTable({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
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
      colSpan: 1,
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
