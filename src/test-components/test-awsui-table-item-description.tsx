import type { ReactElement } from 'react';
import type TestItem from '../test-types/test-item';

export default function TestAwsuiTableItemDescription({
  description,
}: TestItem): ReactElement | null {
  if (typeof description !== 'undefined') {
    return <>{description}</>;
  }
  return null;
}
