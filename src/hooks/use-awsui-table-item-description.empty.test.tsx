import { render } from '@testing-library/react';
import TestTable from '../test-components/test-table';
import DESCRIPTION_ROW_ERROR from '../test-constants/description-row-error';
import mapContainerToDescriptionRow from '../test-map/map-container-to-description-row';
import mapContainerToItemCell from '../test-map/map-container-to-item-cell';

function Null(): null {
  return null;
}

describe('useAwsuiTableItemDescription', (): void => {
  describe('item cell', (): void => {
    it('should not set border-bottom-width to 0 for rows with no description', (): void => {
      const { container } = render(<TestTable Component={Null} />);
      expect(
        mapContainerToItemCell(container).style.getPropertyValue(
          'border-bottom-width',
        ),
      ).not.toBe('0');
    });
  });

  describe('description row', (): void => {
    it('should not exist', (): void => {
      const { container } = render(<TestTable Component={Null} />);
      expect((): void => {
        mapContainerToDescriptionRow(container);
      }).toThrowError(DESCRIPTION_ROW_ERROR);
    });
  });
});
