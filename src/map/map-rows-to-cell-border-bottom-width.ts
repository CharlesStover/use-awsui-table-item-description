import mapRowToCellBorderBottomWidth from '../map/map-row-to-cell-border-bottom-width';

const FIRST = 0;

export default function mapRowsToCellBorderBottomWidth(
  rows: Readonly<HTMLCollectionOf<HTMLTableRowElement>>,
): string | null {
  const firstRow: HTMLTableRowElement | null = rows.item(FIRST);
  if (firstRow === null) {
    return null;
  }

  return mapRowToCellBorderBottomWidth(firstRow);
}
