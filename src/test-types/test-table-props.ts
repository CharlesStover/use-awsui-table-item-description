import { UseAwsuiTableItemDescriptionProps } from '..';
import TestItem from '../test-types/test-item';

type TestTableProps = Pick<
  UseAwsuiTableItemDescriptionProps<TestItem>,
  'items'
> &
  Omit<
    Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
    'ref'
  >;

export default TestTableProps;
