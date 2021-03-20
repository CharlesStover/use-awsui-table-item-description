import { renderHook } from '@testing-library/react-hooks';
import useAwsuiTableItemDescription from '..';
import mapElementToRenderHookOptions from '../test-map/map-element-to-render-hook-options';

describe('useAwsuiTableItemDescription', (): void => {
  it('should no-op when the table has not mounted yet', (): void => {
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(null),
    );
  });

  it('should no-op when the ref does not contain a table', (): void => {
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(document.createElement('div')),
    );
  });

  it('should no-op when the ref does not contain a tbody', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    div.appendChild(document.createElement('table'));
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should no-op when the ref does not contain a tr', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should no-op when the ref does not contain a td', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    tbody.appendChild(document.createElement('tr'));
    table.appendChild(tbody);
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should no-op when the ref does not contain a border-bottom-width', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should no-op when the ref does not contain a cell class name', (): void => {
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
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });
});
