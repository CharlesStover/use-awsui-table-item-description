import Table, { TableProps } from '@awsui/components-react/table';
import {
  FunctionComponent,
  MutableRefObject,
  ReactElement,
  useRef,
} from 'react';
import useAwsuiTableItemDescription from '..';
import TestAwsuiTableItemDescription from '../test-components/test-awsui-table-item-description';
import TEST_COLUMN_DEFINITIONS from '../test-constants/test-column-definitions';
import TEST_ITEMS from '../test-constants/test-items';
import TestItem from '../test-types/test-item';

interface Props {
  Component?: FunctionComponent<TestItem>;
  onRowClick?: TableProps['onRowClick'];
}

export default function TestTable({
  Component = TestAwsuiTableItemDescription,
  onRowClick,
}: Props): ReactElement {
  const ref: MutableRefObject<HTMLElement | null> = useRef(null);

  useAwsuiTableItemDescription({
    Component,
    colSpan: 1,
    items: TEST_ITEMS,
    onRowClick,
    ref,
  });

  return (
    <span ref={ref}>
      <Table columnDefinitions={TEST_COLUMN_DEFINITIONS} items={TEST_ITEMS} />
    </span>
  );
}
