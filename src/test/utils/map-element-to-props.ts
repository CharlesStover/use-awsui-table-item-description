import type { UseAwsuiTableItemDescriptionProps } from '../..';
import TestAwsuiTableItemDescription from '../components/test-awsui-table-item-description';
import type TestItem from '../types/test-item';

export default function mapElementToProps(
  current: HTMLElement | null,
): UseAwsuiTableItemDescriptionProps<TestItem> {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: TestAwsuiTableItemDescription,
    colSpan: 1,
    items: [{ value: 'value' }],
    ref: {
      current,
    },
  };
}
