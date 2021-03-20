import DESCRIPTION_ROW_ERROR from '../test-constants/description-row-error';
import mapContainerToDescriptionRow from '../test-map/map-container-to-description-row';
import mapContainerToItemCell from '../test-map/map-container-to-item-cell';
import TestItem from '../test-types/test-item';
import renderTestTable from '../test-utils/render-test-table';

const TEST_ITEMS: TestItem[] = [{ value: 'one' }];

describe('useAwsuiTableItemDescription', (): void => {
  describe('item cell', (): void => {
    it('should not set border-bottom-width to 0 for rows with no description', async (): Promise<void> => {
      const { container } = await renderTestTable({ items: TEST_ITEMS });

      expect(
        mapContainerToItemCell(container).style.getPropertyValue(
          'border-bottom-width',
        ),
      ).not.toBe('0');
    });
  });

  describe('description row', (): void => {
    it('should not exist for rows with no description', async (): Promise<void> => {
      const { container } = await renderTestTable({ items: TEST_ITEMS });

      expect((): void => {
        mapContainerToDescriptionRow(container);
      }).toThrowError(DESCRIPTION_ROW_ERROR);
    });
  });
});
