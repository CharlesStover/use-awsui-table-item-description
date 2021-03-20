import DESCRIPTION_CELL_ERROR from '../test-constants/description-cell-error';
import mapContainerToTbody from '../test-map/map-container-to-tbody';

export default function mapContainerToDescriptionCell(
  container: HTMLElement,
): HTMLTableCellElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const td: HTMLTableCellElement | null = tbody
    .getElementsByTagName('td')
    .item(1);
  if (td === null) {
    throw DESCRIPTION_CELL_ERROR;
  }

  return td;
}
