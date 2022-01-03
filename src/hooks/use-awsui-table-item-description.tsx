import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TableProps } from '@awsui/components-react/table';
import type { ComponentType, MutableRefObject, ReactElement } from 'react';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import mapRefToTbody from '../utils/map-ref-to-tbody';
import mapRowToCellClassName from '../utils/map-row-to-cell-class-name';
import mapRowsToCellBorderBottomWidth from '../utils/map-rows-to-cell-border-bottom-width';

export interface UseAwsuiTableItemDescriptionProps<Item> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly Component?: ComponentType<Item> | undefined;
  readonly colSpan: number;
  readonly items: readonly Item[];
  readonly ref: Readonly<MutableRefObject<HTMLElement | null>>;
  readonly onRowClick?: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TableProps.OnRowClickDetail<Item>>>
    >,
  ) => void;
}

export default function useAwsuiTableItemDescription<Item>({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  colSpan,
  onRowClick,
  items,
  ref,
}: UseAwsuiTableItemDescriptionProps<Item>): ComponentType<
  Record<string, never>
> {
  // States
  const descriptionCells: HTMLTableCellElement[] =
    useMemo((): HTMLTableCellElement[] => {
      const newDescriptionCells: HTMLTableCellElement[] = [];
      const itemsCount: number = items.length;
      for (let i = 0; i < itemsCount; i++) {
        newDescriptionCells.push(document.createElement('td'));
      }
      return newDescriptionCells;
      // Even though we only need `items.length`, we want to regenerate these
      //   `<td>`s every time `items` changes, because it means the table has
      //   removed the previous elements and appended new `<tr>`s.
    }, [items]);

  // Effects
  useLayoutEffect((): VoidFunction | undefined => {
    if (typeof Component === 'undefined') {
      return;
    }

    const tbody: HTMLTableSectionElement | null = mapRefToTbody(ref);
    if (tbody === null) {
      return;
    }

    const rows: HTMLCollectionOf<HTMLTableRowElement> =
      tbody.getElementsByTagName('tr');

    const cellBorderBottomWidth: string | null =
      mapRowsToCellBorderBottomWidth(rows);
    if (cellBorderBottomWidth === null) {
      return;
    }

    const descriptionRows: HTMLTableRowElement[] = [];
    const itemCells: HTMLTableCellElement[] = [];

    for (
      let itemIndex = 0, itemRow: HTMLTableRowElement | null, rowIndex = 0;
      (itemRow = rows.item(rowIndex));
      itemIndex++
    ) {
      const cellClassName: string | null = mapRowToCellClassName(itemRow);

      // We ignore this line, because it should never happen, and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (cellClassName === null) {
        continue;
      }

      const descriptionCell: HTMLTableCellElement = descriptionCells[itemIndex];
      const descriptionRow: HTMLTableRowElement = document.createElement('tr');
      const item: Item = items[itemIndex];
      const itemRowClassName: string = itemRow.className;
      const itemRowNextSibling: ChildNode | null = itemRow.nextSibling;
      const itemRowCells: HTMLTableCellElement[] = Array.from(
        itemRow.getElementsByTagName('td'),
      );

      descriptionCell.className = cellClassName;
      descriptionCell.setAttribute('colspan', colSpan.toString());
      descriptionCell.style.setProperty('border-top-width', '0');
      descriptionCell.style.setProperty('padding-top', '0');
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

      // +1 to move to the next row, +1 for the row that we're about to
      //   append.
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      rowIndex += 2;
      if (itemRowNextSibling === null) {
        tbody.appendChild(descriptionRow);
      } else {
        tbody.insertBefore(descriptionRow, itemRowNextSibling);
      }
      descriptionRows.push(descriptionRow);

      for (const itemCell of itemRowCells) {
        itemCells.push(itemCell);
        itemCell.style.setProperty('border-bottom-width', '0');
      }
    }

    return (): void => {
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
  }, [Component, colSpan, descriptionCells, items, onRowClick, ref]);

  return useCallback(
    function AwsuiTableItemDescriptionPortal(): ReactElement | null {
      if (typeof Component === 'undefined') {
        return null;
      }
      return (
        <>
          {items.map((item: Item, index: number): ReactElement => {
            const descriptionCell: HTMLTableCellElement =
              descriptionCells[index];
            return createPortal(<Component {...item} />, descriptionCell);
          })}
        </>
      );
    },
    [Component, descriptionCells, items],
  );
}
