import { ReactElement } from 'react';
import TestItem from '../test-types/test-item';

export default function TestAwsuiTableItemDescription({
  value,
}: TestItem): ReactElement {
  return <>{value}</>;
}
