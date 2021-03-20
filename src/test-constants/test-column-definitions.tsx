import { TableProps } from '@awsui/components-react/table';
import { ReactElement } from 'react';
import TestItem from '../test-types/test-item';

const TEST_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<TestItem>[] = [
  {
    header: 'test header',
    cell({ value }): ReactElement {
      return <>{value}</>;
    },
  },
];

export default TEST_COLUMN_DEFINITIONS;
