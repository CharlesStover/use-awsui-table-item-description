import { renderHook } from '@testing-library/react-hooks';
import useAwsuiTableItemDescription from '..';
import mapElementToProps from '../test-map/map-element-to-props';
import mapElementToRenderHookOptions from '../test-map/map-element-to-render-hook-options';

describe('useAwsuiTableItemDescription', (): void => {
  it('should not throw when there is no component', async (): Promise<void> => {
    const { result } = renderHook(useAwsuiTableItemDescription, {
      initialProps: {
        ...mapElementToProps(null),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Component: undefined,
      },
    });
    await result.current.current;
  });

  it('should not throw when the table has not mounted yet', async (): Promise<void> => {
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(null),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a table', async (): Promise<void> => {
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(document.createElement('div')),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a tbody', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    div.appendChild(document.createElement('table'));
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a tr', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    div.appendChild(table);
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a td', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    tbody.appendChild(document.createElement('tr'));
    table.appendChild(tbody);
    div.appendChild(table);
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a border-bottom-width', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
    await result.current.current;
  });

  it('should not throw when the ref does not contain a cell class name', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.style.setProperty('border-bottom-width', '1px');
    tr.appendChild(cell);
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    const { result } = renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
    await result.current.current;
  });

  // This should trigger `if (!isMounted.current)`, but does not. This implies
  //   that ReactDOM's render callback is actually synchronous, meaning there is
  //   no way to test it. The code will remain in case ReactDOM ever pushes an
  //   asynchronous change, so as to be non-breaking.
  it('should not throw when unmounting before rendering', async (): Promise<void> => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.className = 'test-cell-class-name';
    cell.style.setProperty('border-bottom-width', '1px');
    tr.appendChild(cell);
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    const { result, unmount } = renderHook(useAwsuiTableItemDescription, {
      initialProps: {
        ...mapElementToProps(div),
        items: [
          { description: 'description', value: 'value' },
          { description: 'description', value: 'value' },
          { description: 'description', value: 'value' },
        ],
      },
    });
    unmount();
    await result.current.current;
  });
});
