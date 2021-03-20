import { TableProps } from '@awsui/components-react/table';
import { ComponentType, MutableRefObject, useLayoutEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import mapRefToTbody from '../map/map-ref-to-tbody';
import mapRowToCellClassName from '../map/map-row-to-cell-class-name';
import mapRowsToCellBorderBottomWidth from '../map/map-rows-to-cell-border-bottom-width';

export interface UseAwsuiTableItemDescriptionProps<Item> {
  Component: ComponentType<Item>;
  colSpan: number;
  items: Item[];
  onRowClick?: TableProps['onRowClick'];
  ref: MutableRefObject<HTMLElement | null>;
}

export default function useAwsuiTableItemDescription<Item>({
  Component,
  colSpan,
  onRowClick,
  items,
  ref,
}: UseAwsuiTableItemDescriptionProps<Item>): void {
  useLayoutEffect((): void | VoidFunction => {
    const tbody: HTMLTableSectionElement | null = mapRefToTbody(ref);
    if (tbody === null) {
      return;
    }

    const rows: HTMLCollectionOf<HTMLTableRowElement> = tbody.getElementsByTagName(
      'tr',
    );

    const cellBorderBottomWidth: null | string = mapRowsToCellBorderBottomWidth(
      rows,
    );
    if (cellBorderBottomWidth === null) {
      return;
    }

    const descriptionCells: HTMLTableCellElement[] = [];
    const descriptionRows: HTMLTableRowElement[] = [];
    const itemCells: HTMLTableCellElement[] = [];
    let itemRow: HTMLTableRowElement | null;
    for (let i = 0; (itemRow = rows.item(i)); i += 2) {
      const cellClassName: null | string = mapRowToCellClassName(itemRow);

      // We ignore this line, because it should never happen, and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (cellClassName === null) {
        continue;
      }

      const rowIndex: number = i / 2;
      const item: Item = items[rowIndex];

      const descriptionCell: HTMLTableCellElement = document.createElement(
        'td',
      );
      descriptionCells.push(descriptionCell);

      const itemRowClassName: string = itemRow.className;
      const itemRowNextSibling: ChildNode | null = itemRow.nextSibling;
      const itemRowCells: HTMLTableDataCellElement[] = Array.from(
        itemRow.getElementsByTagName('td'),
      );

      render(<Component {...item} />, descriptionCell, (): void => {
        /*
        Possible TODO: Use a mutable object reference to track unmount. If the
          component already unmounted before this callback fired, bail.
        */

        // If this component didn't render anything, don't append a row.
        if (descriptionCell.firstChild === null) {
          return;
        }

        descriptionCell.className = cellClassName;
        descriptionCell.setAttribute('colspan', colSpan.toString());
        descriptionCell.style.setProperty('border-top-width', '0');
        descriptionCell.style.setProperty('padding-top', '0');

        const descriptionRow: HTMLTableRowElement = document.createElement(
          'tr',
        );
        descriptionRow.appendChild(descriptionCell);
        descriptionRow.className = itemRowClassName;
        if (typeof onRowClick === 'function') {
          descriptionRow.addEventListener('click', (): void => {
            onRowClick(
              new CustomEvent('', {
                detail: {
                  item,
                  rowIndex,
                },
              }),
            );
          });
        }

        tbody.insertBefore(descriptionRow, itemRowNextSibling);
        descriptionRows.push(descriptionRow);

        for (const itemCell of itemRowCells) {
          itemCells.push(itemCell);
          itemCell.style.setProperty('border-bottom-width', '0');
        }
      });
    }

    return (): void => {
      for (const descriptionCell of descriptionCells) {
        unmountComponentAtNode(descriptionCell);
      }
      for (const descriptionRow of descriptionRows) {
        tbody.removeChild(descriptionRow);
      }
      for (const itemCell of itemCells) {
        itemCell.style.setProperty(
          'border-bottom-width',
          cellBorderBottomWidth,
        );
      }
    };
  }, [Component, colSpan, items, onRowClick, ref]);
}
