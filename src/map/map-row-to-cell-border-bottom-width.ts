export default function mapRowToCellBorderBottomWidth(
  row: HTMLTableRowElement,
): null | string {
  const cells: HTMLCollectionOf<HTMLTableCellElement> = row.getElementsByTagName(
    'td',
  );
  const lastCell: HTMLTableCellElement | null = cells.item(cells.length - 1);
  if (lastCell === null) {
    return null;
  }

  return lastCell.style.getPropertyValue('border-bottom-width');
}
