/* eslint-disable @typescript-eslint/no-magic-numbers */
import { act } from 'react-dom/test-utils';
import type TestItem from '../test/types/test-item';
import mapContainerToDescriptionCell from '../test/utils/map-container-to-description-cell';
import mapContainerToDescriptionRow from '../test/utils/map-container-to-description-row';
import mapContainerToItemCell from '../test/utils/map-container-to-item-cell';
import renderTestTable from '../test/utils/render-test-table';

const TEST_ITEM: TestItem = {
  description: 'test description',
  value: 'test value',
};

const TEST_ITEMS: TestItem[] = [TEST_ITEM];

describe('useAwsuiTableItemDescription', (): void => {
  describe('item cell', (): void => {
    it('should set border-bottom-width to 0', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(
        mapContainerToItemCell(container).style.getPropertyValue(
          'border-bottom-width',
        ),
      ).toBe('0');
    });
  });

  describe('description row', (): void => {
    it('should set class name', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(mapContainerToDescriptionRow(container).className).not.toBe('');
    });

    it('should support a click handler', (): void => {
      const TEST_CLICK_HANDLER = jest.fn();
      const { container } = renderTestTable({
        items: TEST_ITEMS,
        onRowClick: TEST_CLICK_HANDLER,
      });

      act((): void => {
        mapContainerToDescriptionRow(container).click();
      });

      expect(TEST_CLICK_HANDLER).toHaveBeenCalledTimes(1);
      expect(TEST_CLICK_HANDLER).toHaveBeenLastCalledWith(
        new CustomEvent('', {
          detail: {
            item: TEST_ITEM,
            rowIndex: 0,
          },
        }),
      );
    });

    it('should be appended after its respective item', (): void => {
      const { container } = renderTestTable({
        items: [
          { value: 'one' },
          { description: 'description 1', value: 'two' },
          { value: 'three' },
          { description: 'description 2', value: 'four' },
        ],
      });

      const tbody: HTMLTableSectionElement | null = container
        .getElementsByTagName('tbody')
        .item(0);
      if (tbody === null) {
        throw new Error('Could not find tbody.');
      }

      const trs: HTMLTableRowElement[] = Array.from(
        tbody.getElementsByTagName('tr'),
      );
      expect(trs).toHaveLength(8);

      const expectCellNodeValue = (
        rowIndex: number,
      ): jest.JestMatchers<string> => {
        const tr: HTMLTableRowElement = trs[rowIndex];
        const cells: HTMLCollectionOf<HTMLTableCellElement> =
          tr.getElementsByTagName('td');
        const cell: HTMLTableCellElement = Array.from(cells)[0];
        return expect(cell.firstChild?.nodeValue);
      };

      expectCellNodeValue(0).toBe('one');
      expectCellNodeValue(1).toBeUndefined();
      expectCellNodeValue(2).toBe('two');
      expectCellNodeValue(3).toBe('description 1');
      expectCellNodeValue(4).toBe('three');
      expectCellNodeValue(5).toBeUndefined();
      expectCellNodeValue(6).toBe('four');
      expectCellNodeValue(7).toBe('description 2');
    });
  });

  describe('description cell', (): void => {
    it('should set class name', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(mapContainerToDescriptionCell(container).className).not.toBe('');
    });

    it('should set column span', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(mapContainerToDescriptionCell(container).colSpan).toBe(1);
    });

    it('should set border-top-width to 0', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(
        mapContainerToDescriptionCell(container).style.getPropertyValue(
          'border-top-width',
        ),
      ).toBe('0');
    });

    it('should set padding-top to 0', (): void => {
      const { container } = renderTestTable({
        items: TEST_ITEMS,
      });

      expect(
        mapContainerToDescriptionCell(container).style.getPropertyValue(
          'padding-top',
        ),
      ).toBe('0px');
    });
  });
});
