import { ReactElement } from 'react';
import TestItem from '../test-types/test-item';

export default function TestAwsuiTableItemDescription({
  description,
}: TestItem): ReactElement | null {
  if (description) {
    return <>{description}</>;
  }
  return null;
}
