import { TableProps } from '@awsui/components-react/table';
import {
  ComponentType,
  MutableRefObject,
  useLayoutEffect,
  useRef,
} from 'react';
import { unmountComponentAtNode } from 'react-dom';
import mapRefToTbody from '../map/map-ref-to-tbody';
import mapRowToCellClassName from '../map/map-row-to-cell-class-name';
import mapRowsToCellBorderBottomWidth from '../map/map-rows-to-cell-border-bottom-width';
import promisifiedRender from '../utils/promisified-render';

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
}: UseAwsuiTableItemDescriptionProps<Item>): MutableRefObject<
  Promise<unknown> | undefined
> {
  const asyncEffectRef: MutableRefObject<
    Promise<unknown> | undefined
  > = useRef();
  const isMounted: MutableRefObject<boolean> = useRef(true);

  useLayoutEffect((): VoidFunction => {
    return (): void => {
      isMounted.current = false;
    };
  }, []);

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

    asyncEffectRef.current = (async (): Promise<void> => {
      for (
        let itemIndex = 0, itemRow: HTMLTableRowElement | null, rowIndex = 0;
        (itemRow = rows.item(rowIndex));
        itemIndex++
      ) {
        const cellClassName: null | string = mapRowToCellClassName(itemRow);

        // We ignore this line, because it should never happen, and it's
        //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
        //   ever changes their implementation details.
        // istanbul ignore next
        if (cellClassName === null) {
          continue;
        }

        const item: Item = items[itemIndex];

        const descriptionCell: HTMLTableCellElement = document.createElement(
          'td',
        );
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

        /*
        Possible TODO: Use a mutable object reference to track unmount. If the
          component already unmounted before this callback fired, bail.
        */

        // If this component didn't render anything, don't append a row.
        if (descriptionCell.firstChild === null) {
          rowIndex++;
          continue;
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
