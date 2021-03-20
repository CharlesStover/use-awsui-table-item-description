import { UseAwsuiTableItemDescriptionProps } from '..';
import TestAwsuiTableItemDescription from '../test-components/test-awsui-table-item-description';
import TEST_ITEMS from '../test-constants/test-items';
import TestItem from '../test-types/test-item';

export default function mapElementToProps(
  current: HTMLElement | null,
): UseAwsuiTableItemDescriptionProps<TestItem> {
  return {
    Component: TestAwsuiTableItemDescription,
    colSpan: 1,
    items: TEST_ITEMS,
    ref: {
      current,
    },
  };
}
