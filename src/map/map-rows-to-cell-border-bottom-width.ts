import mapRowToCellBorderBottomWidth from '../map/map-row-to-cell-border-bottom-width';

export default function mapRowsToCellBorderBottomWidth(
  rows: HTMLCollectionOf<HTMLTableRowElement>,
): null | string {
  const firstRow: HTMLTableRowElement | null = rows.item(0);
  if (firstRow === null) {
    return null;
  }

  return mapRowToCellBorderBottomWidth(firstRow);
}
