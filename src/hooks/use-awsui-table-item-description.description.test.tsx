import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TestTable from '../test-components/test-table';
import TEST_ITEM from '../test-constants/test-item';
import mapContainerToDescriptionCell from '../test-map/map-container-to-description-cell';
import mapContainerToDescriptionRow from '../test-map/map-container-to-description-row';
import mapContainerToItemCell from '../test-map/map-container-to-item-cell';

describe('useAwsuiTableItemDescription', (): void => {
  describe('item cell', (): void => {
    it('should set border-bottom-width to 0', (): void => {
      const { container } = render(<TestTable />);
      expect(
        mapContainerToItemCell(container).style.getPropertyValue(
          'border-bottom-width',
        ),
      ).toBe('0');
    });
  });

  describe('description row', (): void => {
    it('should set class name', (): void => {
      const { container } = render(<TestTable />);
      expect(mapContainerToDescriptionRow(container).className).not.toBe('');
    });

    it('should support a click handler', (): void => {
      const TEST_CLICK_HANDLER = jest.fn();
      const { container } = render(
        <TestTable onRowClick={TEST_CLICK_HANDLER} />,
      );

      act((): void => {
        mapContainerToDescriptionRow(container).click();
      });

      expect(TEST_CLICK_HANDLER).toHaveBeenCalledTimes(1);
      expect(TEST_CLICK_HANDLER).toHaveBeenLastCalledWith(new CustomEvent('', {
        detail: {
          item: TEST_ITEM,
          rowIndex: 0,
        },
      }));
    });
  });

  describe('description cell', (): void => {
    it('should set class name', (): void => {
      const { container } = render(<TestTable />);
      expect(mapContainerToDescriptionCell(container).className).not.toBe('');
    });

    it('should set column span', (): void => {
      const { container } = render(<TestTable />);
      expect(mapContainerToDescriptionCell(container).colSpan).toBe(1);
    });

    it('should set border-top-width to 0', (): void => {
      const { container } = render(<TestTable />);
      expect(
        mapContainerToDescriptionCell(container).style.getPropertyValue(
          'border-top-width',
        ),
      ).toBe('0');
    });

    it('should set padding-top to 0', (): void => {
      const { container } = render(<TestTable />);
      expect(
        mapContainerToDescriptionCell(container).style.getPropertyValue(
          'padding-top',
        ),
      ).toBe('0px');
    });
  });
});
