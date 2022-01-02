import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TableProps } from '@awsui/components-react/table';
import type { ComponentType, MutableRefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import mapRefToTbody from '../map/map-ref-to-tbody';
import mapRowToCellClassName from '../map/map-row-to-cell-class-name';
import mapRowsToCellBorderBottomWidth from '../map/map-rows-to-cell-border-bottom-width';
import promisifiedRender from '../utils/promisified-render';

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
}: UseAwsuiTableItemDescriptionProps<Item>): MutableRefObject<
  Promise<unknown> | undefined
> {
  const asyncEffectRef: MutableRefObject<Promise<unknown> | undefined> =
    useRef();
  const isMounted: MutableRefObject<boolean> = useRef(true);

  useLayoutEffect((): VoidFunction => {
    return (): void => {
      isMounted.current = false;
    };
  }, []);

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

    const descriptionCells: HTMLTableCellElement[] = [];
    const descriptionRows: HTMLTableRowElement[] = [];
    const itemCells: HTMLTableCellElement[] = [];

    asyncEffectRef.current = (async (): Promise<void> => {
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

        const item: Item = items[itemIndex];

        const descriptionCell: HTMLTableCellElement =
          document.createElement('td');
        descriptionCells.push(descriptionCell);

        const itemRowClassName: string = itemRow.className;
        const itemRowNextSibling: ChildNode | null = itemRow.nextSibling;
        const itemRowCells: HTMLTableDataCellElement[] = Array.from(
          itemRow.getElementsByTagName('td'),
        );

        /*
        TODO: The render for each description cell can be parallelized. We only
          need to await in order to decide whether or not we should append the
          description row. The performance can be improved here by not awaiting
          the render of each previous cell, queue all description cells to be
          rendered simultaneously, then only await when deciding whether to
          append the description row.
        */

        await promisifiedRender(Component, item, descriptionCell);

        // We ignore this line, because ReactDOM's render callback appears to
        //   fire synchronously, making it impossible to unmount before
        //   rendering is finished. A test exists for this in the `noop` suite
        //   in case render ever becomes asynchronous.
        // istanbul ignore next
        if (!isMounted.current) {
          break;
        }

        // If this component didn't render anything, don't append a row.
        if (descriptionCell.firstChild === null) {
          rowIndex++;
          continue;
        }

        descriptionCell.className = cellClassName;
        descriptionCell.setAttribute('colspan', colSpan.toString());
        descriptionCell.style.setProperty('border-top-width', '0');
        descriptionCell.style.setProperty('padding-top', '0');

        const descriptionRow: HTMLTableRowElement =
          document.createElement('tr');
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
    })();

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

  return asyncEffectRef;
}
